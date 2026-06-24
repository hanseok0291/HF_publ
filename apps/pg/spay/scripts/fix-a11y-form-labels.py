#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""KWCAG 29-1: input/textarea/select에 label(for/id) 또는 title 보완.

주의: 전체 HTML에 Prettier 등 포매터를 적용하지 말 것.
      접근성 추가 구간만 scripts/format-a11y-label-indent.py 로 들여쓰기 정리.
"""

import re
from pathlib import Path

HTML_ROOT = Path(__file__).resolve().parent.parent / "resources" / "html"

SKIP_INPUT_TYPES = frozenset(
    {"hidden", "submit", "button", "reset", "image", "file"}
)


def has_label_for(content: str, control_id: str) -> bool:
    return bool(re.search(rf'<label\b[^>]*\bfor="{re.escape(control_id)}"', content))


def fix_email_inputs(content: str) -> str:
    """id=email input에 sr-only label + title 추가."""
    if has_label_for(content, "email"):
        return content

    pattern = re.compile(
        r'(<input\b[^>]*\btype="text"[^>]*\bid="email"[^>]*>)',
        re.IGNORECASE,
    )

    def repl(m):
        tag = m.group(1)
        is_en = "Email Address" in tag or 'placeholder="Email' in tag
        label_text = "Email" if is_en else "이메일"
        if "title=" not in tag.lower():
            tag = tag.rstrip(">/") + f' title="{label_text}">'
        line_start = content.rfind("\n", 0, m.start()) + 1
        indent = re.match(r"(\s*)", content[line_start:m.start()]).group(1)
        if len(indent) < 2:
            indent = reference_indent_from_content(content, m.start())
        return f'{indent}<label for="email" class="sr-only">{label_text}</label>\n{indent}{tag}'

    return pattern.sub(repl, content)


def fix_installment_select(content: str) -> str:
    """할부 select: sr-only label + id/name."""
    if 'title="할부 개월 수 선택"' not in content:
        return content
    if has_label_for(content, "cardInstallment"):
        return content

    pattern = re.compile(
        r'(\s*)<select\b([^>]*)\btitle="할부 개월 수 선택"([^>]*)>',
        re.IGNORECASE,
    )

    def repl(m):
        indent, before, after = m.group(1), m.group(2), m.group(3)
        attrs = before + after
        if "id=" in attrs:
            return m.group(0)
        return (
            f'{indent}<label for="cardInstallment" class="sr-only">할부 개월 수</label>\n'
            f'{indent}<select id="cardInstallment" name="cardInstallment"{before}title="할부 개월 수 선택"{after}>'
        )

    return pattern.sub(repl, content)


def fix_select_sm(content: str) -> str:
    """약관 모달 select-sm: id/title/label (페이지 내 순번 부여)."""
    pattern = re.compile(r'<select\b([^>]*)\bclass="select-sm"([^>]*)>', re.IGNORECASE)
    counter = [0]

    def repl(m):
        full_attrs = m.group(1) + m.group(2)
        if "title=" in full_attrs.lower() and re.search(r'\bid="[^"]+"', full_attrs):
            return m.group(0)
        counter[0] += 1
        sid = "termsVer" if counter[0] == 1 else f"termsVer_{counter[0]}"
        if re.search(r'\bid="([^"]+)"', full_attrs):
            sid = re.search(r'\bid="([^"]+)"', full_attrs).group(1)
        line_start = content.rfind("\n", 0, m.start()) + 1
        indent = re.match(r"(\s*)", content[line_start:m.start()]).group(1)
        if len(indent) < 2:
            indent = reference_indent_from_content(content, m.start())
        if has_label_for(content, sid):
            new_tag = f'<select id="{sid}" class="select-sm" title="약관 시행일 선택">'
            if re.search(r'\bid="', full_attrs):
                return m.group(0)
            return f'{indent}{new_tag}'
        inner = full_attrs.strip()
        if inner:
            return (
                f'{indent}<label for="{sid}" class="sr-only">약관 시행일 선택</label>\n'
                f'{indent}<select id="{sid}" class="select-sm" title="약관 시행일 선택"{inner}>'
            )
        return (
            f'{indent}<label for="{sid}" class="sr-only">약관 시행일 선택</label>\n'
            f'{indent}<select id="{sid}" class="select-sm" title="약관 시행일 선택">'
        )

    return pattern.sub(repl, content)


def fix_bare_installment_select(content: str) -> str:
    """`<select>` 단독 + 할부 option 패턴."""
    if has_label_for(content, "cardInstallment"):
        return content
    pattern = re.compile(
        r'(\s*)<select>\s*\n\s*<option value="">일시불</option>',
        re.IGNORECASE,
    )
    if not pattern.search(content):
        return content

    def repl(m):
        indent = m.group(1)
        return (
            f'{indent}<label for="cardInstallment" class="sr-only">할부 개월 수</label>\n'
            f'{indent}<select id="cardInstallment" name="cardInstallment" title="할부 개월 수 선택">\n'
            f'{indent}\t<option value="">일시불</option>'
        )

    return pattern.sub(repl, content)


def fix_input_by_placeholder(content: str) -> str:
    """id 없는 text/tel/password input — placeholder 기반 label/title/id 부여."""
    placeholder_labels = {
        "휴대폰번호": "phoneNo",
        "휴대폰 번호": "phoneNo",
        "주민번호앞 7자리": "birthFront",
        "생년월일(6자리)": "birthDate",
        "생년월일(6자리)": "birthDate",
        "인증번호": "authNum",
        "인증번호 입력": "authNum",
        "휴대폰결제 비밀번호 입력": "payPassword",
        "안심결제 비밀번호 입력": "safePayPassword",
        "이메일 주소 입력": "emailAddress",
        "비밀번호(앞 2자리)": "cardPassword",
        "1234 5678": "phoneNoSuffix",
        "010 1234 5678": "phoneNoFull",
        "123456": "authNum6",
    }

    def repl_input(m):
        tag = m.group(0)
        type_m = re.search(r'\btype="([^"]+)"', tag, re.I)
        if not type_m or type_m.group(1).lower() in SKIP_INPUT_TYPES:
            return tag
        if re.search(r'\bid="[^"]+"', tag):
            inp_id = re.search(r'\bid="([^"]+)"', tag).group(1)
            if has_label_for(content, inp_id):
                return tag
            ph_m = re.search(r'\bplaceholder="([^"]+)"', tag)
            label_text = ph_m.group(1) if ph_m else inp_id
            if "title=" in tag.lower():
                line_start = content.rfind("\n", 0, m.start()) + 1
                indent = re.match(r"(\s*)", content[line_start:m.start()]).group(1)
                return f'{indent}<label for="{inp_id}" class="sr-only">{label_text}</label>\n{indent}{tag}'
            line_start = content.rfind("\n", 0, m.start()) + 1
            indent = re.match(r"(\s*)", content[line_start:m.start()]).group(1)
            new_tag = tag.rstrip(">/") + f' title="{label_text}">'
            return f'{indent}<label for="{inp_id}" class="sr-only">{label_text}</label>\n{indent}{new_tag}'

        ph_m = re.search(r'\bplaceholder="([^"]+)"', tag)
        if not ph_m:
            return tag
        ph = ph_m.group(1)
        if ph not in placeholder_labels and ph != "＊":
            return tag
        if ph == "＊":
            inp_id = "regNumLast"
            label_text = "주민등록번호 뒤 첫째 자리"
        else:
            inp_id = placeholder_labels[ph]
            label_text = ph

        if has_label_for(content, inp_id):
            return tag

        line_start = content.rfind("\n", 0, m.start()) + 1
        indent = re.match(r"(\s*)", content[line_start:m.start()]).group(1)
        if len(indent) < 2:
            indent = reference_indent_from_content(content, m.start())
        new_tag = re.sub(r"\bid=\"[^\"]*\"\s*", "", tag)
        new_tag = new_tag.replace("<input", f'<input id="{inp_id}"', 1)
        if "title=" not in new_tag.lower():
            new_tag = new_tag.rstrip(">/") + f' title="{label_text}">'
        return f'{indent}<label for="{inp_id}" class="sr-only">{label_text}</label>\n{indent}{new_tag}'

    pattern = re.compile(
        r"<input\b(?:(?!</input>).)*?>",
        re.IGNORECASE | re.DOTALL,
    )
    return pattern.sub(repl_input, content)


def fix_cphone_no_mismatch(content: str) -> str:
    """label for=cphoneNo 인데 input id 누락."""
    if 'for="cphoneNo"' not in content:
        return content
    pattern = re.compile(
        r'(<input\b[^>]*\btype="tel"[^>]*\bplaceholder="1234 5678"[^>]*)(>)',
        re.IGNORECASE,
    )

    def repl(m):
        tag = m.group(1)
        if 'id="cphoneNo"' in tag:
            return m.group(0)
        if "title=" not in tag.lower():
            tag += ' id="cphoneNo" name="cphoneNo" title="휴대폰 번호"'
        else:
            tag += ' id="cphoneNo" name="cphoneNo"'
        return tag + m.group(2)

    return pattern.sub(repl, content)


def fix_pull_selects(content: str) -> str:
    """pay_01_multi 등 pull-left select에 title/label."""
    pattern = re.compile(
        r'(\s*)<select class="pull-con pull-left">\s*\n\s*<option value="">할부를 선택해 주세요</option>',
        re.IGNORECASE,
    )
    idx = [0]

    def repl(m):
        idx[0] += 1
        sid = f"cardInstallment_{idx[0]}"
        indent = m.group(1)
        return (
            f'{indent}<label for="{sid}" class="sr-only">할부 개월 수</label>\n'
            f'{indent}<select id="{sid}" name="{sid}" class="pull-con pull-left" title="할부 개월 수 선택">\n'
            f'{indent}\t<option value="">할부를 선택해 주세요</option>'
        )

    return pattern.sub(repl, content)


def get_line_indent(content: str, pos: int) -> str:
    line_start = content.rfind("\n", 0, pos) + 1
    return re.match(r"(\s*)", content[line_start:pos]).group(1)


def insert_label_before(content: str, pos: int, control_id: str, label_text: str) -> str:
    indent = get_line_indent(content, pos)
    if not indent or len(indent) < 2:
        indent = reference_indent_from_content(content, pos)
    label_line = f'{indent}<label for="{control_id}" class="sr-only">{label_text}</label>\n'
    return content[:pos] + label_line + content[pos:]


def reference_indent_from_content(content: str, pos: int) -> str:
    lines = content[:pos].split("\n")
    idx = len(lines) - 1
    for j in range(idx + 1, min(idx + 8, len(lines))):
        line = lines[j] if j < len(lines) else ""
        if not line.strip():
            continue
        m = re.match(r"(\s+)", line)
        if m and not line.lstrip().startswith("<label"):
            return m.group(1)
    for j in range(idx, max(-1, idx - 8), -1):
        line = lines[j]
        if not line.strip():
            continue
        m = re.match(r"(\s+)(<(?:span|div|li|td|p)\b)", line)
        if m:
            extra = "    " if "    " in m.group(1) or not m.group(1).startswith("\t") else "\t"
            return m.group(1) + extra
    return "    "


def add_attr(tag: str, name: str, value: str) -> str:
    if re.search(rf'\b{name}=', tag, re.I):
        return tag
    return tag.rstrip(">/") + f' {name}="{value}">'


def fix_card_credit_wrap(content: str) -> str:
    """카드번호 4분할 input-credit / input-wrap 내부."""
    wrap_counter = [0]

    def fix_wrap(m):
        inner = m.group(2)
        wrap_counter[0] += 1
        suffix = "" if wrap_counter[0] == 1 else f"_{wrap_counter[0]}"
        labels = [
            (f"cardNo1{suffix}", "카드번호 앞 4자리"),
            (f"cardNo2{suffix}", "카드번호 5~8자리"),
            (f"cardNo3{suffix}", "카드번호 9~12자리"),
            (f"cardNo4{suffix}", "카드번호 뒤 4자리"),
        ]
        idx = [0]

        def repl_input(im):
            tag = im.group(0)
            if idx[0] >= len(labels):
                return tag
            cid, ltext = labels[idx[0]]
            idx[0] += 1
            idm = re.search(r'\bid="([^"]+)"', tag)
            if idm and idm.group(1):
                cid = idm.group(1)
            else:
                tag = tag.replace("<input", f'<input id="{cid}"', 1)
            tag = add_attr(tag, "title", ltext)
            before = inner[: im.start()]
            line_start = before.rfind("\n") + 1
            indent = re.match(r"(\s*)", inner[line_start : im.start() + 1]).group(1)
            if len(indent) < 2:
                for line in inner.split("\n"):
                    if line.strip().startswith("<span") or line.strip().startswith("<input"):
                        indent = re.match(r"(\s*)", line).group(1)
                        break
            tag = indent + tag.lstrip()
            return f'{indent}<label for="{cid}" class="sr-only">{ltext}</label>\n{tag}'

        new_inner = re.sub(r"<input\b[^>]*>", repl_input, inner, flags=re.I)
        return m.group(1) + new_inner + m.group(3)

    pattern = re.compile(
        r'(<div class="input input-credit">\s*<div class="">)(.*?)(</div>\s*</div>)',
        re.DOTALL | re.IGNORECASE,
    )
    content = pattern.sub(fix_wrap, content)
    pattern2 = re.compile(
        r'(<div class="input-wrap">)(.*?)(</div>)',
        re.DOTALL | re.IGNORECASE,
    )
    return pattern2.sub(fix_wrap, content)


def fix_expiry_selects(content: str) -> str:
    """유효기간 MM/YY select."""
    counters = {"mm": 0, "yy": 0}

    def fix_mm(m):
        counters["mm"] += 1
        sid = "cardExpiryMonth" if counters["mm"] == 1 else f"cardExpiryMonth_{counters['mm']}"
        if has_label_for(content, sid):
            return m.group(0)
        indent = m.group(1)
        return (
            f'{indent}<label for="{sid}" class="sr-only">유효기간(월)</label>\n'
            f'{indent}<select id="{sid}" name="{sid}" class="pull-left" title="유효기간(월)">'
        )

    def fix_yy(m):
        counters["yy"] += 1
        sid = "cardExpiryYear" if counters["yy"] == 1 else f"cardExpiryYear_{counters['yy']}"
        if has_label_for(content, sid):
            return m.group(0)
        indent = m.group(1)
        return (
            f'{indent}<label for="{sid}" class="sr-only">유효기간(년)</label>\n'
            f'{indent}<select id="{sid}" name="{sid}" class="pull-right" title="유효기간(년)">'
        )

    content = re.sub(
        r'(\s*)<select class="pull-left">\s*\n\s*<option value="default">유효 기간 \(MM\)</option>',
        fix_mm,
        content,
        flags=re.I,
    )
    content = re.sub(
        r'(\s*)<select class="pull-right">\s*\n\s*<option value="default">유효 기간 \(YY\)</option>',
        fix_yy,
        content,
        flags=re.I,
    )
    return content


def fix_known_id_controls(content: str) -> str:
    """id는 있으나 label/title 없는 컨트롤."""
    id_labels = {
        "rcptIdGb_01": "현금영수증 번호 구분",
        "rcptIdGb_02": "현금영수증 번호 구분",
        "pageSelect": "페이지 선택",
    }

    for cid, ltext in id_labels.items():
        if has_label_for(content, cid):
            continue
        pattern = re.compile(rf'(<(?:input|select|textarea)\b[^>]*\bid="{re.escape(cid)}"[^>]*>)', re.I)

        def repl(m, ltext=ltext, cid=cid):
            tag = m.group(1)
            tag = add_attr(tag, "title", ltext)
            pos = m.start()
            indent = get_line_indent(content, pos)
            return f'{indent}<label for="{cid}" class="sr-only">{ltext}</label>\n{indent}{tag}'

        content = pattern.sub(repl, content)
    return content


def fix_email_name_only(content: str) -> str:
    """name=email 이지만 id 없는 input."""
    pattern = re.compile(
        r'(<input\b[^>]*\bname="email"[^>]*>)',
        re.IGNORECASE,
    )

    def repl(m):
        tag = m.group(1)
        if re.search(r'\bid="email"', tag, re.I):
            return tag
        tag = tag.replace("<input", '<input id="email"', 1)
        tag = add_attr(tag, "title", "이메일")
        if has_label_for(content, "email"):
            return tag
        indent = get_line_indent(content, m.start())
        return f'{indent}<label for="email" class="sr-only">이메일</label>\n{indent}{tag}'

    return pattern.sub(repl, content)


def fix_unlabeled_controls_pass(content: str) -> str:
    """placeholder/aria-label 기반 범용 보완."""
    extra_map = {
        "카드번호": ("cardNo1", "카드번호 앞 4자리"),
        "생년월일(6자리) 또는 사업자등록번호": ("birthOrBizNo", "생년월일(6자리) 또는 사업자등록번호"),
        "생년월일(6자리) 또는 사업자등록번호": ("birthOrBizNo", "생년월일(6자리) 또는 사업자등록번호"),
        "비밀번호": ("password", "비밀번호"),
        "비밀번호 입력": ("password", "비밀번호"),
        "비밀번호(앞 2자리)": ("cardPassword", "비밀번호(앞 2자리)"),
        "환불 계좌 예금주": ("refundAccountName", "환불 계좌 예금주"),
        "환불계좌 예금주 입력": ("refundAccountName", "환불 계좌 예금주"),
        "이메일": ("userEmail", "이메일"),
        "이메일 입력": ("userEmail", "이메일"),
        "이메일 주소 입력 (선택)": ("emailOptional", "이메일 주소 입력"),
        "이름 입력": ("userName", "이름"),
        "주민등록번호 입력": ("regNumFront", "주민등록번호"),
        "주민번호앞 6자리": ("regNumFront", "주민등록번호 앞 6자리"),
        "주민번호앞 7자리": ("birthFront", "주민번호 앞 7자리"),
        "휴대폰번호('-' 없이 입력)": ("phoneNoDash", "휴대폰번호"),
        "휴대폰번호('-' 없이 입력)": ("phoneNoDash", "휴대폰번호"),
        "휴대폰번호": ("phoneNo", "휴대폰번호"),
        "인증번호": ("authNum", "인증번호"),
        "인증 번호 입력": ("authNum", "인증번호"),
        "휴대폰결제 비밀번호(6자리)": ("payPassword6", "휴대폰결제 비밀번호"),
        "휴대폰결제 비밀번호(6자리)": ("payPassword6", "휴대폰결제 비밀번호"),
        "휴대폰결제 비밀번호 입력": ("payPassword", "휴대폰결제 비밀번호"),
        "안심결제 비밀번호 입력": ("safePayPassword", "안심결제 비밀번호"),
        "안심결제 비밀번호 입력(선택)": ("safePayPasswordOpt", "안심결제 비밀번호"),
        "상품권 핀번호 ('-' 없이 입력)": ("giftPin", "상품권 핀번호"),
        "사용할 포인트를 입력해주세요.": ("pointAmount", "사용할 포인트"),
        "M": ("hyundaiPointM", "현대 포인트"),
        "홍길동": ("userNameSample", "이름"),
        "input text": ("inputText", "텍스트 입력"),
        "input number": ("inputNumber", "숫자 입력"),
        "input tel": ("inputTel", "전화번호 입력"),
        "input tel + button": ("inputTelBtn", "전화번호 입력"),
        "input tel + button type2": ("inputTelBtn2", "전화번호 입력"),
        "input tel + switch": ("inputTelSwitch", "전화번호 입력"),
        "textraea": ("textareaSample", "내용 입력"),
        "주민번호앞 6자리": ("regNumFront6", "주민번호 앞 6자리"),
        "비밀번호 입력": ("pwdInput", "비밀번호"),
        "1234-5678": ("phoneSuffix", "휴대폰 번호"),
        "1234 5678 1234 5678": ("accountNo", "계좌번호"),
        "123 45 67890": ("bizNo", "사업자등록번호"),
    }

    seq = [0]

    def next_id(base: str) -> str:
        seq[0] += 1
        return base if seq[0] == 1 else f"{base}_{seq[0]}"

    # 역순 처리로 insert 시 offset 유지
    matches = list(
        re.finditer(r"<(input|textarea|select)\b([^>]*)>", content, re.I)
    )
    for m in reversed(matches):
        tag_name = m.group(1).lower()
        attrs = m.group(2)
        if tag_name == "input":
            tm = re.search(r'type="([^"]+)"', attrs, re.I)
            if tm and tm.group(1).lower() in SKIP_INPUT_TYPES:
                continue
        has_title = bool(re.search(r'title="[^"]+"', attrs, re.I))
        idm = re.search(r'id="([^"]*)"', attrs, re.I)
        cid = idm.group(1) if idm and idm.group(1) else None
        if cid and has_label_for(content, cid):
            continue
        aria = re.search(r'aria-label="([^"]+)"', attrs, re.I)
        phm = re.search(r'placeholder="([^"]+)"', attrs, re.I)
        label_text = None
        new_id = cid

        if aria and not has_title:
            label_text = aria.group(1)
        elif phm and phm.group(1) in extra_map:
            new_id, label_text = extra_map[phm.group(1)]
            if cid:
                new_id = cid
        elif phm and phm.group(1):
            label_text = phm.group(1)
            new_id = new_id or re.sub(r"[^a-zA-Z0-9]", "", label_text)[:20] or next_id("field")
        elif cid and cid in {"rcptIdGb_01", "rcptIdGb_02", "pageSelect"}:
            continue  # handled elsewhere

        if not label_text:
            if tag_name == "select" and not has_title:
                label_text = "선택"
                new_id = new_id or next_id("selectField")
            elif tag_name == "textarea" and phm:
                label_text = phm.group(1)
                new_id = new_id or next_id("textareaField")
            else:
                continue

        if has_title and cid and has_label_for(content, cid):
            continue
        if has_title and not cid:
            continue

        tag = m.group(0)
        if not cid and new_id:
            tag = tag.replace(f"<{tag_name}", f'<{tag_name} id="{new_id}"', 1)
            cid = new_id
        if not has_title:
            tag = add_attr(tag, "title", label_text)
        if not has_label_for(content, cid):
            indent = get_line_indent(content, m.start())
            label_line = f'{indent}<label for="{cid}" class="sr-only">{label_text}</label>\n'
            content = content[: m.start()] + label_line + tag + content[m.end() :]

    return content


def fix_reg_num_last_digit(content: str) -> str:
    """주민번호 뒤 1자리 (maxlength=1, placeholder 없음)."""
    pattern = re.compile(
        r'(<input\b[^>]*\btype="tel"[^>]*\bmaxlength="1"[^>]*)(/?>)',
        re.I,
    )
    idx = [0]

    def repl(m):
        tag = m.group(1) + m.group(2)
        if 'id="' in tag and tag.split('id="')[1].split('"')[0]:
            cid = re.search(r'id="([^"]+)"', tag).group(1)
            if cid and has_label_for(content, cid):
                return tag
            if re.search(r'aria-label="', tag, re.I):
                ltext = re.search(r'aria-label="([^"]+)"', tag).group(1)
                tag = add_attr(tag.rstrip(">/") + ">", "title", ltext)
                if not has_label_for(content, cid):
                    indent = get_line_indent(content, m.start())
                    return f'{indent}<label for="{cid}" class="sr-only">{ltext}</label>\n{indent}{tag}'
            return tag
        idx[0] += 1
        cid = "regNumLast" if idx[0] == 1 else f"regNumLast_{idx[0]}"
        ltext = "주민등록번호 뒤 첫째 자리"
        tag = tag.replace("<input", f'<input id="{cid}"', 1)
        tag = add_attr(tag.rstrip(">/") + ">", "title", ltext)
        indent = get_line_indent(content, m.start())
        return f'{indent}<label for="{cid}" class="sr-only">{ltext}</label>\n{indent}{tag}'

    return pattern.sub(repl, content)


def fix_ebpp_selects(content: str) -> str:
    """ebpp disabled select."""
    idx = [0]

    def repl(m):
        idx[0] += 1
        sid = "paymentMethod" if idx[0] == 1 else f"paymentMethod_{idx[0]}"
        if has_label_for(content, sid):
            return m.group(0)
        indent = m.group(1)
        return (
            f'{indent}<label for="{sid}" class="sr-only">결제 수단</label>\n'
            f'{indent}<select id="{sid}" class="" disabled title="결제 수단">'
        )

    return re.sub(
        r'(\s*)<select class="" disabled>',
        repl,
        content,
        flags=re.I,
    )


def fix_birth_or_biz_input(content: str) -> str:
    """생년월일/사업자등록번호 input."""
    idx = [0]
    pattern = re.compile(
        r'(<input\b[^>]*\bplaceholder="생년월일\(6자리\) 또는 사업자등록번호"[^>]*>)',
        re.I,
    )

    def repl(m):
        idx[0] += 1
        sid = "birthOrBizNo" if idx[0] == 1 else f"birthOrBizNo_{idx[0]}"
        tag = m.group(1)
        ltext = "생년월일(6자리) 또는 사업자등록번호"
        if not re.search(r'\bid="[^"]+"', tag):
            tag = tag.replace("<input", f'<input id="{sid}"', 1)
        else:
            sid = re.search(r'id="([^"]+)"', tag).group(1)
        tag = add_attr(tag, "title", ltext)
        if has_label_for(content, sid):
            return tag
        indent = get_line_indent(content, m.start())
        return f'{indent}<label for="{sid}" class="sr-only">{ltext}</label>\n{indent}{tag}'

    return pattern.sub(repl, content)


def fix_point_inputs(content: str) -> str:
    """포인트 입력 필드."""
    idx = [0]
    pattern = re.compile(
        r'(<input\b[^>]*\bclass="point-input"[^>]*\bplaceholder="사용할 포인트를 입력해주세요\."[^>]*/?>)',
        re.I,
    )

    def repl(m):
        idx[0] += 1
        sid = "pointAmount" if idx[0] == 1 else f"pointAmount_{idx[0]}"
        tag = m.group(1)
        ltext = "사용할 포인트"
        if not re.search(r'\bid="[^"]+"', tag):
            tag = tag.replace("<input", f'<input id="{sid}"', 1)
        else:
            sid = re.search(r'id="([^"]+)"', tag).group(1)
        tag = add_attr(tag, "title", ltext)
        if has_label_for(content, sid):
            return tag
        indent = get_line_indent(content, m.start())
        return f'{indent}<label for="{sid}" class="sr-only">{ltext}</label>\n{indent}{tag}'

    return pattern.sub(repl, content)


def fix_template_demo_inputs(path: Path, content: str) -> str:
    """ui/template 등 데모 input."""
    name = path.name
    if name not in {"template.html", "joongna-template.html"}:
        return content
    demos = [
        (r'placeholder="input text"(?![^>]*disabled)(?![^>]*readonly)', "demoInputText", "텍스트 입력"),
        (r'value="input text readonly"\s+readonly', "demoInputReadonly", "텍스트 입력(읽기 전용)"),
        (r'value="input text disabled"\s+disabled', "demoInputDisabled", "텍스트 입력(비활성)"),
    ]
    for pat, sid, ltext in demos:
        pattern = re.compile(rf'(<input\b[^>]*{pat}[^>]*>)', re.I)

        def repl(m, sid=sid, ltext=ltext):
            tag = m.group(1)
            if has_label_for(content, sid):
                return tag
            if not re.search(r'\bid="[^"]+"', tag):
                tag = tag.replace("<input", f'<input id="{sid}"', 1)
            tag = add_attr(tag, "title", ltext)
            indent = get_line_indent(content, m.start())
            return f'{indent}<label for="{sid}" class="sr-only">{ltext}</label>\n{indent}{tag}'

        content = pattern.sub(repl, content)
    return content


def normalize_label_indent(content: str) -> str:
    """삽입 label 과도한 들여쓰기 정리."""
    def repl(m):
        control_id = m.group(1)
        label_text = m.group(2)
        control_tag = m.group(3)
        input_indent = re.match(r"(\s*)", control_tag).group(1)
        label = f'<label for="{control_id}" class="sr-only">{label_text}</label>'
        return f"\n{input_indent}{label}\n{control_tag}"

    return re.sub(
        r"\n\s+<label for=\"([^\"]+)\" class=\"sr-only\">([^<]+)</label>\n(\s*<(?:input|select|textarea)\b[^>]*>)",
        repl,
        content,
    )


def process_file(path: Path) -> bool:
    original = path.read_text(encoding="utf-8")
    content = original
    content = fix_email_inputs(content)
    content = fix_email_name_only(content)
    content = fix_installment_select(content)
    content = fix_bare_installment_select(content)
    content = fix_select_sm(content)
    content = fix_cphone_no_mismatch(content)
    content = fix_pull_selects(content)
    content = fix_card_credit_wrap(content)
    content = fix_expiry_selects(content)
    content = fix_known_id_controls(content)
    content = fix_ebpp_selects(content)
    content = fix_birth_or_biz_input(content)
    content = fix_point_inputs(content)
    content = fix_input_by_placeholder(content)
    content = fix_reg_num_last_digit(content)
    content = fix_unlabeled_controls_pass(content)
    content = fix_template_demo_inputs(path, content)
    content = normalize_label_indent(content)

    if content != original:
        path.write_text(content, encoding="utf-8", newline="\n")
        return True
    return False


def main():
    changed = []
    for path in sorted(HTML_ROOT.rglob("*.html")):
        if process_file(path):
            changed.append(path.relative_to(HTML_ROOT))
    print(f"Updated {len(changed)} file(s):")
    for p in changed:
        print(f"  - {p}")


if __name__ == "__main__":
    main()
