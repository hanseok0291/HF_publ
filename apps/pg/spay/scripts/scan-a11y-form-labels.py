#!/usr/bin/env python3
# -*- coding: utf-8 -*-
import re
from pathlib import Path

HTML_ROOT = Path(__file__).resolve().parent.parent / "resources" / "html"
SKIP = frozenset({"hidden", "submit", "button", "reset", "image", "file"})


def main():
    issues = []
    for p in sorted(HTML_ROOT.rglob("*.html")):
        c = p.read_text(encoding="utf-8")
        for m in re.finditer(r"<(input|textarea|select)\b([^>]*)>", c, re.I):
            tag, attrs = m.group(1).lower(), m.group(2)
            if tag == "input":
                tm = re.search(r'type="([^"]+)"', attrs, re.I)
                if tm and tm.group(1).lower() in SKIP:
                    continue
            has_title = bool(re.search(r'title="[^"]+"', attrs, re.I))
            idm = re.search(r'id="([^"]+)"', attrs, re.I)
            cid = idm.group(1) if idm else None
            has_label = bool(
                cid and re.search(rf'<label\b[^>]*\bfor="{re.escape(cid)}"', c, re.I)
            )
            if not has_title and not has_label:
                line = c[: m.start()].count("\n") + 1
                issues.append((str(p.relative_to(HTML_ROOT)), line, tag, attrs.strip()[:100]))
    import sys
    sys.stdout.reconfigure(encoding="utf-8")
    print(f"Total issues: {len(issues)}")
    for row in issues:
        print(f"{row[0]}:{row[1]} [{row[2]}] {row[3]}")


if __name__ == "__main__":
    main()
