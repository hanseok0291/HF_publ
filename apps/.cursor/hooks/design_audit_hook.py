#!/usr/bin/env python3
"""디자인 가이드 자동 점검 훅.

afterFileEdit 이벤트에서 HTML/CSS 변경을 감지하면 최소 규칙을 점검하고
리포트를 `.cursor/reports/design-audit-latest.md`로 저장한다.
"""

import json
import re
import sys
from pathlib import Path
from typing import Any


ROOT = Path(__file__).resolve().parents[2]
REPORT_DIR = ROOT / ".cursor" / "reports"
REPORT_FILE = REPORT_DIR / "design-audit-latest.md"

TARGET_SUFFIXES = (".html", ".css", ".scss")
WIDTH_BLOCK_SCOPE = ("pub-guide", "pages")


def _collect_strings(node: Any, result: list[str]) -> None:
    """입력 JSON 전체에서 문자열 값을 수집한다."""
    if isinstance(node, str):
        result.append(node)
        return
    if isinstance(node, dict):
        for value in node.values():
            _collect_strings(value, result)
        return
    if isinstance(node, list):
        for value in node:
            _collect_strings(value, result)


def _extract_target_path(payload: dict[str, Any]) -> Path | None:
    """이벤트 페이로드에서 파일 경로로 보이는 값을 찾는다."""
    texts: list[str] = []
    _collect_strings(payload, texts)

    for text in texts:
        if not text:
            continue
        candidate = Path(text)
        # 절대경로/상대경로 모두 지원
        if candidate.suffix.lower() not in TARGET_SUFFIXES:
            continue
        if candidate.is_absolute() and candidate.exists():
            return candidate
        rel = ROOT / candidate
        if rel.exists():
            return rel
    return None


def _audit_basic_rules(content: str, suffix: str) -> list[tuple[str, str, str]]:
    """핵심 룰(금지 패턴)만 빠르게 점검한다."""
    findings: list[tuple[str, str, str]] = []

    # 00-core: 상태바 금지
    if re.search(r"\.os-status-bar|\.status-bar-content", content):
        findings.append(
            (
                "High",
                "00-core",
                "상태바 관련 클래스(.os-status-bar / .status-bar-content) 사용",
            )
        )

    # 20-style: grid, flex gap 금지
    if suffix in (".css", ".scss", ".html"):
        if re.search(r"display\s*:\s*grid", content):
            findings.append(("High", "20-style-convention", "`display: grid` 사용"))
        if re.search(r"\bgap\s*:\s*[^;]+;", content):
            findings.append(("High", "20-style-convention", "flex/grid `gap` 사용"))

    # 10-a11y: 아이콘 버튼 라벨 누락(가벼운 휴리스틱)
    if suffix == ".html":
        button_tags = re.findall(r"<button\b[^>]*>", content, flags=re.IGNORECASE)
        unlabeled = [
            tag
            for tag in button_tags
            if ("aria-label=" not in tag.lower()) and ("aria-labelledby=" not in tag.lower())
        ]
        if unlabeled:
            findings.append(
                (
                    "Medium",
                    "10-a11y-semantic",
                    f"라벨 없는 button 태그 감지: {len(unlabeled)}개",
                )
            )

    return findings


def _is_width_rule_target(target: Path, suffix: str) -> bool:
    """콘텐츠 폭 규칙 적용 대상을 판별한다."""
    if suffix != ".html":
        return False
    lowered = tuple(part.lower() for part in target.parts)
    return all(scope in lowered for scope in WIDTH_BLOCK_SCOPE)


def _audit_width_rules(target: Path, content: str, suffix: str) -> list[tuple[str, str, str]]:
    """30-design-guide-layout: 불필요한 고정 width/max-width를 점검한다."""
    findings: list[tuple[str, str, str]] = []
    if not _is_width_rule_target(target, suffix):
        return findings

    # 허용: max-width: 100% (미디어 넘침 방지)
    width_hits = re.findall(r"(?<!-)width\s*:\s*(\d+(?:\.\d+)?)px", content, flags=re.IGNORECASE)
    max_width_hits = re.findall(r"max-width\s*:\s*(\d+(?:\.\d+)?)px", content, flags=re.IGNORECASE)
    forbidden_max_width_hits = [v for v in max_width_hits if float(v) != 100.0]

    if width_hits:
        findings.append(
            (
                "High",
                "30-design-guide-layout",
                f"고정 width(px) 사용 감지: {len(width_hits)}건 (부모 인셋 + 자식 100% 규칙 확인 필요)",
            )
        )
    if forbidden_max_width_hits:
        findings.append(
            (
                "High",
                "30-design-guide-layout",
                f"max-width(px) 사용 감지: {len(forbidden_max_width_hits)}건 (`max-width:100%` 외)",
            )
        )

    return findings


def _has_width_rule_failure(findings: list[tuple[str, str, str]]) -> bool:
    """폭 규칙 위반 포함 여부를 확인한다."""
    return any(rule_id == "30-design-guide-layout" for _, rule_id, _ in findings)


def _write_report(target: Path, findings: list[tuple[str, str, str]]) -> None:
    """마크다운 리포트를 저장한다."""
    REPORT_DIR.mkdir(parents=True, exist_ok=True)
    status = "PASS" if not findings else "FAIL"

    lines: list[str] = []
    lines.append("**[적용 룰]** 전사 공통 (00-core) + 30-design-guide")
    lines.append("")
    lines.append("[CHECK RESULT]")
    lines.append(f"- Status: {status}")
    lines.append(f"- Target: `{target}`")
    lines.append("- Mode: quick(auto), strict=false")
    lines.append("")
    lines.append("[Findings]")

    if not findings:
        lines.append("- 위반 사항 없음")
    else:
        for idx, (severity, rule_id, message) in enumerate(findings, start=1):
            lines.append(f"{idx}. [{severity}] {rule_id}")
            lines.append(f"   - Why: {message}")
            lines.append("   - Fix: 관련 룰 문서를 열어 동일 패턴 제거/대체")

    REPORT_FILE.write_text("\n".join(lines) + "\n", encoding="utf-8")


def main() -> int:
    """훅 진입점."""
    raw = sys.stdin.read().strip()
    if not raw:
        print("{}")
        return 0

    try:
        payload = json.loads(raw)
    except json.JSONDecodeError:
        # 훅이 워크플로를 막지 않도록 fail-open
        print("{}")
        return 0

    target = _extract_target_path(payload)
    if not target:
        print("{}")
        return 0

    try:
        content = target.read_text(encoding="utf-8")
    except Exception:
        print("{}")
        return 0

    suffix = target.suffix.lower()
    findings = _audit_basic_rules(content, suffix)
    findings.extend(_audit_width_rules(target, content, suffix))
    _write_report(target, findings)

    # 폭 규칙 위반은 실패 코드로 반환해 failClosed 훅 게이트를 트리거한다.
    if _has_width_rule_failure(findings):
        print(
            json.dumps(
                {
                    "permission": "ask",
                    "user_message": (
                        "[RULE BLOCK] 30-design-guide-layout 위반: 고정 width/max-width(px) 감지. "
                        "부모 인셋 + 자식 width:100% 패턴으로 수정 후 다시 시도하세요. "
                        "상세는 .cursor/reports/design-audit-latest.md 확인."
                    ),
                    "agent_message": "design_audit_hook: blocked by width rule",
                },
                ensure_ascii=False,
            )
        )
        return 2

    # 위반이 없으면 통과
    print("{}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
