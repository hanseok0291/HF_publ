#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""a11y 스크립트 부산물 정리: 빈 id/name, 중복 class."""

import re
from pathlib import Path

HTML_ROOT = Path(__file__).resolve().parent.parent / "resources" / "html"


def cleanup_attrs(content: str) -> str:
    # id="foo" ... id="" 제거
    content = re.sub(
        r'(<(?:input|select|textarea)\b[^>]*\bid="[^"]+")([^>]*)\sid=""',
        r"\1\2",
        content,
        flags=re.I,
    )
    # name="" 제거 (빈 name)
    content = re.sub(
        r'(<(?:input|select|textarea)\b[^>]*)\sname=""',
        r"\1",
        content,
        flags=re.I,
    )
    # class="" 중복/빈 class
    content = re.sub(r'\sclass=""', "", content)
    return content


def main():
    changed = []
    for path in sorted(HTML_ROOT.rglob("*.html")):
        original = path.read_text(encoding="utf-8")
        updated = cleanup_attrs(original)
        if updated != original:
            path.write_text(updated, encoding="utf-8", newline="\n")
            changed.append(path.relative_to(HTML_ROOT))
    print(f"Cleaned {len(changed)} file(s)")


if __name__ == "__main__":
    main()
