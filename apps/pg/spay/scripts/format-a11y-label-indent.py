#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""접근성 sr-only label / 연결 control 들여쓰기 정리."""

import re
from pathlib import Path

HTML_ROOT = Path(__file__).resolve().parent.parent / "resources" / "html"

LABEL_RE = re.compile(r'^(\s*)<label for="([^"]+)" class="sr-only">([^<]+)</label>\s*$')
CONTROL_RE = re.compile(r'^(\s*)<(input|select|textarea)\b', re.I)
SR_ONLY_BLOCK = re.compile(
    r'(\n\s*)<label for="([^"]+)" class="sr-only">([^<]+)</label>\n\s*\n(\s*)<(input|select|textarea)\b',
    re.I,
)


def reference_indent(lines: list[str], idx: int) -> str:
    """주변 형제 요소 기준 들여쓰기."""
    for j in range(idx + 1, min(idx + 8, len(lines))):
        line = lines[j]
        if not line.strip():
            continue
        m = re.match(r"(\s+)", line)
        if m and not line.lstrip().startswith("<label"):
            return m.group(1)
    for j in range(idx - 1, max(-1, idx - 8), -1):
        line = lines[j]
        if not line.strip():
            continue
        m = re.match(r"(\s+)(<(?:span|div|li|td|p)\b)", line)
        if m:
            extra = "    " if "    " in m.group(1) or not m.group(1).startswith("\t") else "\t"
            return m.group(1) + extra
    return "    "


def fix_file(content: str) -> str:
    # label 과 control 사이 불필요한 빈 줄 제거
    content = SR_ONLY_BLOCK.sub(
        r'\1<label for="\2" class="sr-only">\3</label>\n\4<\5',
        content,
    )

    lines = content.split("\n")
    out = []

    for i, line in enumerate(lines):
        lm = LABEL_RE.match(line)
        if lm and (not lm.group(1) or len(lm.group(1)) < 2):
            indent = reference_indent(lines, i)
            out.append(f'{indent}<label for="{lm.group(2)}" class="sr-only">{lm.group(3)}</label>')
            continue

        cm = CONTROL_RE.match(line)
        if cm and (not cm.group(1) or len(cm.group(1)) < 2):
            prev = out[-1] if out else ""
            if prev.strip().startswith("<label for="):
                indent = re.match(r"(\s*)", prev).group(1)
                out.append(indent + line.lstrip())
                continue
            indent = reference_indent(lines, i)
            out.append(indent + line.lstrip())
            continue

        out.append(line)

    return "\n".join(out)


def main():
    changed = []
    for path in sorted(HTML_ROOT.rglob("*.html")):
        original = path.read_text(encoding="utf-8")
        updated = fix_file(original)
        if updated != original:
            path.write_text(updated, encoding="utf-8", newline="\n")
            changed.append(path.relative_to(HTML_ROOT))
    print(f"Formatted {len(changed)} file(s)")
    for p in changed:
        print(f"  - {p}")


if __name__ == "__main__":
    main()
