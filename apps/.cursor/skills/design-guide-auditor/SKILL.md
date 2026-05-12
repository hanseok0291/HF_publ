---
name: design-guide-auditor
description: Audit specific HTML/CSS files against workspace design guide rules (00-core, 10-a11y-semantic, 20-style-convention, 30-design-guide series, 35-design-guide-page-implementation, 90-figma-web-raster-export). Workspace hook `[check]` / `[check-quick]` / `[check-strict]` / `[check-raw]` (A/B용 스킬 미적용·HTML 시 연결 CSS 포함) with no path after the prefix fills target_file from the editor active file (prefix_router). Use when the user asks to review/check/design QA a page, component, or publishing output against the design guide.
---

# Design Guide Auditor

## 목적

HTML을 점검할 때는 **같은 파일의 `<style>`와 `<link rel="stylesheet">`로 직접 연결된 스타일시트**를 항상 함께 읽고, 디자인 가이드 기준으로 위반 사항을 우선순위대로 보고한다. (단독으로 연 `.css`/`.scss`만 지정한 경우에는 해당 파일만 읽는다.)

## 일반 “검수해줘” 요청과의 차이 (예: `pub-guide/pages/test4_new_v2.html`)

- **일반 대화만** 쓰면 점검 순서·깊이·출력 형식이 응답마다 달라질 수 있고, `strict`/`quick|full`이 **명시되지 않아** 엄격도·점검 깊이가 암묵적으로만 결정될 수 있다. 링크 CSS를 빼먹고 HTML만 보는 식으로 끝나기도 쉽다.
- **이 스킬을 따르면** `00-core` → … → `90-figma-web-raster-export` 순서와 출력 템플릿이 **고정**되고, HTML 대상일 때 **연결 스타일시트까지 읽는 절차**가 명시되어 재현성과 공유(노션·PR)에 유리하다.
- 상세 비교 문단: `apps/.cursor/skills/design-guide-auditor/notion-week7-design-guide-audit.md` 의 「예시: test4_new_v2.html」절.

## 입력

- `target_file`: 점검할 HTML 파일 경로. **일반 대화에서는 경로를 명시하는 것이 원칙**이다.
- **경로 생략 시(현재 파일 기준)**: 워크스페이스에서 프롬프트를 **`[check]`**, **`[check-quick]`**, **`[check-strict]`**, **`[check-raw]`** 접두사로 시작하고, 접두사 **뒤에 파일 경로를 쓰지 않으면** Cursor 훅이 페이로드의 **현재 포커스(에디터에서 연) 파일**을 `target_file`로 채운다. 대상 확장자는 `.html` / `.css` / `.scss`이며, 열린 파일을 찾지 못하면 훅이 안내 메시지를 띄운다. (구현: `apps/.cursor/hooks/prefix_router.py`, `beforeSubmitPrompt`)
- `mode`: `quick` | `full` (기본 `full`)
- `strict`: `true` | `false` (기본 `false`)

### A/B 테스트 `[check-raw]` (스킬 미적용 검수)

- **`[check-raw]`** 는 훅이 **이 스킬을 따르지 말라**고 명시한 프롬프트로 바꾼다. 근거는 **`.cursor/rules`만** 쓰고, 보고는 **`[NO-SKILL AUDIT]`** 제목 + 자유 형식이다.
- HTML 대상이면 **읽기 범위**는 스킬과 같게: 같은 파일의 `<style>` + `<link rel="stylesheet">`로 직접 연결된 CSS를 **모두** 열어 점검에 포함한다. **`[check]`와의 차이**는 출력 템플릿·스킬 절차(체크리스트 순서·PASS/FAIL 블록 등)를 쓰지 않는 쪽에 있다.
- 같은 파일에 대해 **`[check]`** 와 **`[check-raw]`** 를 순서대로 실행하면 A/B 비교가 가능하다.

## 점검 순서 (고정)

1. `00-core`
2. `10-a11y-semantic`
3. `20-style-convention`
4. `30-design-guide` + `30-design-guide-*`
5. `35-design-guide-page-implementation` (HTML 대상·CSS 스택·조합)
6. `90-figma-web-raster-export` (정적 에셋/export 흐름이 보일 때)

## 실행 절차

1. `target_file`을 확정한다(사용자 입력·훅에 의한 현재 파일·명시 경로). 확정 후 파일을 읽고 문서 구조를 파악한다.
2. 대상이 **HTML**이면 아래 범위를 **항상** 함께 읽는다.
   - 같은 파일 내부 `<style>` 블록
   - `<link rel="stylesheet">`로 직접 연결된 파일  
   대상이 **CSS/SCSS 단일 파일**이면 해당 파일만 읽는다.
3. 항목별 위반을 수집하고, `High > Medium > Low`로 정렬한다.
4. 결과를 아래 출력 템플릿으로만 보고한다.

## 핵심 체크리스트

### 00-core

- 상태바 구현 금지(`.os-status-bar`, `.status-bar-content` 등)
- 클래스 kebab-case
- 임의 spacing/size 값 남용 여부
- 코멘트/구조 가독성, 기본 품질

### 10-a11y-semantic

- 문서 `lang`, heading 계층, landmark(`header/main/section/nav/footer`)
- 의미 이미지 `alt`, 장식 이미지 `alt=""`
- 아이콘 버튼 `aria-label`
- 폼 요소 `label`/`aria-labelledby` 연결
- 포커스 가능 요소의 키보드 접근성

### 20-style-convention

- `display: grid` 사용 금지
- flex 컨테이너의 `gap` 사용 금지
- 형제 선택자 간격 규칙 충돌 여부
- 텍스트 넘침 처리(`min-width: 0` 등) 누락 여부

### 30-design-guide series

- layout/spacing 토큰 정합
- parent inset + child 100% 패턴 위반 여부
- radius/typography/icon 스펙 위반 여부
- 컴포넌트(Button/Chip/Dropdown/Textfield 등) 상태/사이즈 정합

### 90-figma-web-raster-export

- 원본 에셋 직다운로드 사용 여부
- Figma export 기준 파일 수집 여부
- 포맷/배율 규칙 준수 여부

## 판정 기준

- `High`: 접근성/정책 위반, 금지 규칙 위반(grid, flex gap, 상태바 등)
- `Medium`: 디자인 정합 훼손 가능성이 큰 항목(토큰 불일치, 컴포넌트 스펙 이탈)
- `Low`: 문서화/가독성/일관성 개선 항목

## 출력 템플릿

```markdown
**[적용 룰]** 전사 공통 (00-core) + 30-design-guide

[CHECK RESULT]
- Status: PASS | FAIL
- Target: <path>
- Mode: <quick|full>, strict=<true|false>
- Summary: High <n> / Medium <n> / Low <n>

[Findings]
1. [High] <rule-id>
   - File: `<path>`
   - Snippet: `<문제 코드 또는 패턴>`
   - Why: <왜 위반인지>
   - Fix: <수정 가이드>
```

## 보고 규칙

- 발견 사항이 있으면 반드시 심각도 순으로 나열한다.
- PASS라도 잔여 리스크(미검증 항목)가 있으면 마지막에 명시한다.
- 확실하지 않은 항목은 추측하지 말고 `확인 필요`로 분리한다.
