#!/usr/bin/env python3
"""프롬프트 접두사([check] 등)를 디자인 가이드 점검 요청으로 변환.

- [check] / [check-quick] / [check-strict]: design-guide-auditor 스킬 기준
- [check-raw]: A/B용 — 스킬 절차·출력 템플릿 없이 .cursor/rules만 근거(HTML이면 연결 CSS까지 읽기)
"""

from __future__ import annotations

import json
import re
import sys
from pathlib import Path
from typing import Any


ROOT = Path(__file__).resolve().parents[2]
TARGET_SUFFIXES = (".html", ".css", ".scss")
# check-raw 등 하위 접두사가 `check`에 먼저 매칭되지 않도록 긴 패턴을 앞에 둔다.
PREFIX_PATTERN = re.compile(
    r"^\[(check-raw|check-quick|check-strict|check)\]\s*(.*)$",
    re.IGNORECASE | re.DOTALL,
)


def _collect_strings(node: Any, acc: list[str]) -> None:
    if isinstance(node, str):
        acc.append(node)
        return
    if isinstance(node, dict):
        for value in node.values():
            _collect_strings(value, acc)
        return
    if isinstance(node, list):
        for value in node:
            _collect_strings(value, acc)


def _looks_like_path(text: str) -> bool:
    if not text or " " in text.strip():
        return False
    lowered = text.lower().strip()
    return lowered.endswith(TARGET_SUFFIXES)


def _normalize_existing_path(raw_path: str) -> Path | None:
    candidate = Path(raw_path.strip().strip("\"'"))
    if candidate.suffix.lower() not in TARGET_SUFFIXES:
        return None
    if candidate.is_absolute() and candidate.exists():
        return candidate
    # 프로젝트 루트(D:/publishing/apps) 기준
    rel = ROOT / candidate
    if rel.exists():
        return rel
    # 사용자가 "apps/..."로 넘길 수 있으므로 저장소 루트도 함께 탐색
    repo_rel = ROOT.parent / candidate
    if repo_rel.exists():
        return repo_rel
    return None


def _extract_prompt(payload: dict[str, Any]) -> str | None:
    # beforeSubmitPrompt에서 들어올 수 있는 흔한 키를 우선 확인
    keys = (
        "prompt",
        "input",
        "text",
        "message",
        "userPrompt",
        "user_input",
        "raw_input",
    )
    for key in keys:
        value = payload.get(key)
        if isinstance(value, str) and value.strip():
            return value.strip()

    # 구조를 모르더라도 문자열 중 접두사를 가진 항목을 찾아낸다
    all_strings: list[str] = []
    _collect_strings(payload, all_strings)
    for text in all_strings:
        if PREFIX_PATTERN.match(text.strip()):
            return text.strip()
    return None


def _extract_open_file(payload: dict[str, Any]) -> Path | None:
    """현재 열려 있는 파일 경로 후보를 페이로드에서 탐색."""
    preferred_keys = (
        "activeFilePath",
        "active_file_path",
        "currentFile",
        "current_file",
        "filePath",
        "file_path",
    )
    for key in preferred_keys:
        value = payload.get(key)
        if isinstance(value, str):
            path = _normalize_existing_path(value)
            if path:
                return path

    all_strings: list[str] = []
    _collect_strings(payload, all_strings)
    for text in all_strings:
        path = _normalize_existing_path(text)
        if path:
            return path
    return None


def _build_noskill_audit(target: Path) -> str:
    """A/B용: 스킬 미적용 검수(워크스페이스 룰만, 출력 템플릿 없음). HTML이면 연결 CSS까지 읽는다."""
    if target.suffix.lower() == ".html":
        read_scope = (
            "- 대상이 HTML이면 **반드시** 같은 파일 안의 `<style>` 블록과, "
            "`<link rel=\"stylesheet\">`로 직접 연결된 스타일시트(경로를 해석해 열 수 있는 것은 **모두**)를 "
            "읽고 점검에 포함한다. `target_file`만 보고 연결 CSS를 생략하지 말 것.\n"
        )
    else:
        read_scope = "- 대상이 `.css`/`.scss`이면 해당 파일만 읽는다.\n"

    return (
        "A/B 비교용 ‘스킬 미사용’ 검수다. 아래 제약을 반드시 지킨다.\n"
        "- `design-guide-auditor`의 SKILL.md를 읽거나, 그 스킬의 실행 절차·체크리스트·출력 템플릿을 따르지 말 것.\n"
        "- 근거는 워크스페이스 `.cursor/rules`의 00-core, 10-a11y-semantic, 20-style-convention, "
        "30-design-guide*, 90-figma-web-raster-export(해당 시)만 사용한다.\n"
        "- 보고는 제목을 `[NO-SKILL AUDIT]` 한 줄로 시작한다. 스킬 전용 블록 `[CHECK RESULT]`·`[Findings]` "
        "템플릿은 쓰지 말고 구조·분량은 자유롭게 요약한다.\n"
        + read_scope
        + f"- target_file: {target.as_posix()}\n"
    )


def _build_command(mode: str, target: Path) -> str:
    if mode == "check-quick":
        return (
            "design-guide-auditor 스킬 기준으로 아래 파일을 점검해줘.\n"
            f"- target_file: {target.as_posix()}\n"
            "- mode: quick\n"
            "- strict: false"
        )
    if mode == "check-strict":
        return (
            "design-guide-auditor 스킬 기준으로 아래 파일을 점검해줘.\n"
            f"- target_file: {target.as_posix()}\n"
            "- mode: full\n"
            "- strict: true"
        )
    return (
        "design-guide-auditor 스킬 기준으로 아래 파일을 점검해줘.\n"
        f"- target_file: {target.as_posix()}\n"
        "- mode: full\n"
        "- strict: false"
    )


def main() -> int:
    raw = sys.stdin.read().strip()
    if not raw:
        print("{}")
        return 0

    try:
        payload = json.loads(raw)
    except json.JSONDecodeError:
        print("{}")
        return 0

    prompt = _extract_prompt(payload)
    if not prompt:
        print("{}")
        return 0

    match = PREFIX_PATTERN.match(prompt)
    if not match:
        print("{}")
        return 0

    mode = match.group(1).lower()
    remainder = match.group(2).strip()

    target: Path | None = None
    if remainder and _looks_like_path(remainder):
        target = _normalize_existing_path(remainder)

    # 접두사 뒤 경로를 안 썼으면 현재 열린 파일을 기본 타겟으로 시도
    if target is None:
        target = _extract_open_file(payload)

    if target is None:
        print(
            json.dumps(
                {
                    "permission": "ask",
                    "user_message": (
                        "[check] 계열 접두사에서 대상 파일을 찾지 못했습니다. "
                        "예: [check] apps/pub-guide/pages/test2.html"
                    ),
                    "agent_message": "prefix_router: target_file을 확인할 수 없습니다.",
                },
                ensure_ascii=False,
            )
        )
        return 0

    if mode == "check-raw":
        updated_input = _build_noskill_audit(target)
    else:
        updated_input = _build_command(mode, target)
    print(json.dumps({"permission": "allow", "updated_input": updated_input}, ensure_ascii=False))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
