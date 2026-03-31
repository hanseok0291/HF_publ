# Design System

## 목적

이 문서는 프로젝트에서 사용하는 **디자인 토큰과 UI 기본 규칙**을 정의한다.

Cursor 및 개발자는 UI 구현 시 이 문서를 참고하여 **일관된 디자인 규칙을 유지해야 한다.**

실제 값은 프로젝트의 기존 스타일 코드와 Figma 디자인 가이드를 기준으로 적용한다.

---

# Design Principles

1. UI는 가능한 한 **기존 컴포넌트를 재사용**한다.
2. 디자인 값은 **design token 기반으로 사용**한다.
3. 임의의 spacing, radius, color 값을 생성하지 않는다.
4. 디자인 가이드와 다른 스타일을 추가하지 않는다.
5. 새로운 UI 구현 시 기존 스타일 패턴을 우선 참고한다.

---

# Color

## 규칙

- 색상은 **CSS Design Token(`:root` 변수)** 을 우선 사용한다.
- hex 값을 직접 사용하는 경우 **기 정의된 토큰에 매핑 가능한지 먼저 확인**한다.
- 텍스트 색상, 배경 색상, border 색상은 아래 토큰 체계를 기준으로 사용한다.
- 컴포넌트/페이지별 추가 색상은 `color-semantic` 가이드에 정의한다.

## 기본 토큰 (`:root`)

`base.css` 의 `:root` 기준:

- `--color-bg`: 전체 배경 컬러 (예: 페이지 바탕)  
  - 값: `#f8f9fa`
- `--color-surface`: 카드/섹션 등 표면 컬러  
  - 값: `#ffffff`
- `--color-text`: 기본 텍스트 컬러  
  - 값: `#212529`
- `--color-text-muted`: 보조/설명 텍스트 컬러  
  - 값: `#6c757d`
- `--color-border`: 기본 보더 컬러  
  - 값: `#dee2e6`

이 값들은 **기본 레벨의 디자인 토큰**이며, 실제 화면에서는 아래의 **Semantic Color Token** 을 통해 사용된다.

## Semantic Color Token (`color-semantic.html`)

`pages/color-semantic.html` 에 정의된 토큰과 역할:

- **배경 / 라인**
  - `background-01`: 기본 밝은 배경 색상 – `#ffffff` (`Common-0`)
  - `background-02`: 그레이 배경 색상 – `#F6F6F9` (`Neutral-5`)
  - `line-01`: 어두운 배경에 사용하는 라인 색상 – `#ffffff`
  - `line-02`: 밝은 배경에 사용하는 기본 라인 색상 – `#F6F6F9`
  - `line-03`: `line-02` 보다 한 단계 어두운 라인 색상 – `#E5E5E8`

- **Primary / 버튼**
  - `primary-01`: 강조된 UI 요소에 사용하는 메인 색상 – `#FF6114` (`Hecto Orange-50`)
  - `primary-02`: `primary-01` 보다 더 강한 메인 색상 – `#D54000` (`Hecto Orange-70`)
  - `primary-text-01`: 강조 텍스트에 사용하는 메인 색상 – `#F85100` (`Hecto Orange-60`)
  - `button-primary`: 주요 행동 유도 버튼 배경 – `#FF6114`
  - `button-secondary`: 보조 버튼 – `#F6F6F9`
  - `button-tertiary`: 부가적인 행동 버튼 – `#ffffff` (필요 시 `#E5E5E8` 보더)

- **상태 / 기타**
  - `status-danger`: 오류/위험/삭제 상태 및 danger 버튼 – `#FF4242`
  - `disabled`: 비활성화 상태 인풋 등 – `#D1D1D5`

- **아이콘**
  - `icon-01`: 어두운 배경에서 사용하는 아이콘 – `#ffffff`
  - `icon-02`: 밝은 배경에서 사용하는 기본 아이콘 – `#151515`
  - `icon-03`: 서브 본문 / 덜 강조된 아이콘 – `#454545`
  - `icon-04`: 비강조 아이콘 – `#888888`
  - `icon-05`: 더 옅은 비강조 아이콘 – `#B0B0B3`

- **텍스트**
  - `text-01`: 어두운 배경의 제목/본문 텍스트 – `#ffffff`
  - `text-02`: 밝은 배경의 제목/본문 텍스트 – `#151515`
  - `text-03`: 서브 본문 텍스트 – `#454545`
  - `text-04`: 비강조 텍스트 – `#888888`

> **원칙**: 컴포넌트 구현 시에는 가능한 한 **Semantic Token 이름(예: `text-02`, `button-primary`)을 먼저 기준으로 삼고**, 필요 시에만 직접 hex 값을 사용한다.

## 사용 패턴

텍스트 컬러

- 밝은 배경에서의 기본 텍스트: `text-02` (`#151515`)
- 서브/보조 텍스트: `text-03` (`#454545`), `text-04` (`#888888`)
- 어두운 배경에서의 텍스트: `text-01` (`#ffffff`)

배경 컬러

- 페이지/카드 기본: `background-01` (`#ffffff`)
- 구분 섹션/블록 배경: `background-02` (`#F6F6F9`)

보더/라인 컬러

- 기본 라인: `line-02` (`#F6F6F9`)
- 더 진한 라인: `line-03` (`#E5E5E8`)

Primary / 버튼

- 주요 CTA 버튼: `button-primary` (`#FF6114`)
- 보조 버튼 배경: `button-secondary` (`#F6F6F9`)
- 테두리형/서브 액션: `button-tertiary` (`#ffffff` + `line-03` 보더)

## 구현 가이드

- 새로운 색상이 필요할 경우, 먼저 **기존 토큰/semantic 컬러로 표현 가능한지 확인**한다.
- 반드시 `color-guide`, `color-semantic` 페이지와 **값/이름/토큰 구조를 맞춘 후** 사용한다.
- hex를 직접 쓸 때는, 후속 작업에서 **토큰으로 치환**될 수 있도록 주석이나 문서에 용도를 명시한다.
- 디자인/개발 간 커뮤니케이션 시에는 hex 값보다 **semantic 이름**(예: `primary-01`, `text-02`)을 우선 사용한다.

---

# Spacing

## 규칙

UI 레이아웃에서 margin, padding은 **spacing 토큰**을 사용한다.  
가이드: `pages/spacing.html`. 토큰 정의: `base.css` (`:root`).

`base.css` 기준 spacing 토큰 (9단계)

- `--space-02`: `2px`
- `--space-04`: `4px`
- `--space-08`: `8px`
- `--space-12`: `12px`
- `--space-16`: `16px`
- `--space-20`: `20px`
- `--space-24`: `24px`
- `--space-32`: `32px`
- `--space-40`: `40px`

허용 예시 (px 관점)

- 2, 4, 8, 12, 16, 20, 24, 32, 40

실제 사용 예시

```css
/* 페이지/섹션 기본 패딩 */
.guide-main {
  padding: var(--space-32);
}

/* 카드 내부 여백 */
.guide-card {
  padding: var(--space-32);
}

/* 섹션 타이틀 하단 여백 */
.section__title {
  margin-bottom: var(--space-16);
}
```

지양 예시 (임의 값)

```css
/* 토큰에 없는 임의 값 – 지양 */
padding: 13px;
margin: 27px;
```

## 구현 가이드

- 새로운 컴포넌트 구현 시 **기존 페이지(`base.css`, `spacing.css`, 개별 페이지 CSS)의 간격 패턴**을 우선 참고한다.
- 토큰 값이 애매할 경우, **가장 가까운 토큰으로 스냅**하고 Figma 상에서도 동일한 값으로 정리한다.

---

# Border Radius

## 규칙

Radius 는 **토큰 + 제한된 px 값**만 사용한다.

`base.css` 기준 radius 토큰

- `--radius-sm`: `4px`
- `--radius-md`: `8px`
- `--radius-lg`: `12px`

이 값은 CSS 변수 레벨의 **기본 radius 토큰**이며, 실제 컴포넌트에서는 `pages/radius.html` 의 **Semantic Radius Token** 을 따른다.

## Semantic Radius Token (`radius.html`)

`pages/radius.html` 에 정의된 토큰과 역할:

- `radius-04`
  - 값: `4`
  - 설명: 가장 작은 곡률, **배지 등 작은 컴포넌트**에 사용
- `radius-08`
  - 값: `8`
  - 설명: **작은 버튼** 등의 컴포넌트에 사용
- `radius-12`
  - 값: `12`
  - 설명: **중간 사이즈 컴포넌트**에 사용
- `radius-16`
  - 값: `16`
  - 설명: **기본 곡률**, 카드/버튼 등의 컴포넌트에 사용 (Base)
- `radius-24`
  - 값: `24`
  - 설명: **Modal / Sheet / Popup** 등 화면의 50% 이상 크기를 가진 컴포넌트에 사용

> **원칙**: 디자인/개발 커뮤니케이션에서는 px 값보다 **Semantic Radius 이름**(`radius-16`, `radius-24` 등)을 우선 사용하고, CSS 구현 시에는 상황에 맞게 `--radius-*` 토큰 또는 직접 px 값을 선택한다.

예시

```css
/* 카드/블록 기본 */
border-radius: var(--radius-md); /* 8px */

/* 큰 영역 (아이콘 그리드 등) */
border-radius: 16px; /* 필요 시 명시적 사용 */
```

컴포넌트 가이드 (권장 매핑)

- Button: `border-radius: var(--radius-lg);` 또는 `var(--radius-md);`
- Input / Text field: `border-radius: var(--radius-md);`
- Card / Panel: `border-radius: var(--radius-lg);`
- Modal / 대형 컨테이너: `border-radius: 16px` 또는 `24px` (디자인 가이드 기준)

## 구현 가이드

- radius 값은 **4 / 8 / 12 / 16 / 24px 범위 안**에서만 사용한다.
- 새 컴포넌트를 만들 때는 먼저 `radius.css` 예제를 참고하여 **가장 가까운 레벨**을 선택한다.

---

# Typography

## 규칙

텍스트는 `typography.css` 에 정의된 **클래스 스케일**을 사용하고,  
글꼴은 `base.css` 의 `--font-sans` 를 공통으로 사용한다.

기본 폰트 설정

- Font family: `var(--font-sans)` (`"Pretendard", system-ui, ...`)
- 기본 본문: `font-size: 16px`, `line-height: 1.5`

대표 타입 스케일 (`typography.css`)

- Display
  - `.typo-display1`: `48px / 700 / letter-spacing -0.03em`
  - `.typo-display2`: `40px / 700 / letter-spacing -0.03em`
- Heading / Headline
  - `.typo-heading1`: `32px / 700`
  - `.typo-heading2`: `24px / 700`
  - `.typo-headline1`: `20px / 700`
- Body / Caption
  - `.typo-body2`: `14px / 500 / letter-spacing -0.02em`
  - `.typo-caption1`: `12px / 500 / letter-spacing -0.02em`

폰트 굵기 유틸리티

- `.typo-w-regular`: `font-weight: 400`
- `.typo-w-medium`: `font-weight: 500`
- `.typo-w-semibold`: `font-weight: 600`
- `.typo-w-bold`: `font-weight: 700`

사용 예시

```html
<h1 class="typo-display1">Design System</h1>
<p class="typo-body2">본문/설명 텍스트에 사용합니다.</p>
<span class="typo-caption1">캡션/보조 텍스트</span>
```

## 구현 가이드

- 임의의 `font-size`, `font-weight` 를 생성하지 말고, **기존 타입 스케일 클래스**를 우선 사용한다.
- 새로운 타입이 필요한 경우, `typography.css`에만 추가하고 이 문서에 **스케일/역할을 업데이트**한다.

---

# Icon

아이콘 사용 규칙은 별도의 문서를 참고한다.

```
icon-spec.md
```

아이콘은 다음 구조를 사용한다.

```
<i class="ico ico-{name}"></i>
```

---

# Layout

## Container

페이지 레이아웃은 일정한 container 규칙을 따른다.

예시

- max-width container
- padding layout
- section spacing

Cursor는 기존 페이지 구조를 참고하여 레이아웃을 구성한다.

---

# Component Usage

UI 구현 시 가능한 한 다음 규칙을 따른다.

1. 기존 컴포넌트를 우선 사용한다
2. 동일한 UI 패턴을 반복 구현하지 않는다
3. 컴포넌트 스타일은 디자인 시스템 기준을 따른다

예시 컴포넌트

- Button
- Input
- Select
- Card
- Modal
- Tab
- List

컴포넌트 규칙은 별도의 문서를 참고한다.

```
component-spec.md
```

---

# Accessibility

기본 접근성 규칙

- 버튼은 `<button>` 요소 사용
- 링크는 `<a>` 요소 사용
- 아이콘은 `aria-hidden="true"` 사용
- interactive 요소는 keyboard 접근 가능해야 한다

---

# Cursor Implementation Rules

Cursor는 UI를 생성할 때 다음 규칙을 따른다.

1. 기존 스타일 코드와 디자인 가이드를 참고한다.
2. 새로운 디자인 패턴을 임의로 생성하지 않는다.
3. spacing, color, radius, typography는 기존 시스템을 따른다.
4. 컴포넌트 사용 시 component-spec.md 규칙을 따른다.
5. 아이콘 사용 시 icon-spec.md 규칙을 따른다.
6. 기존 코드 스타일을 유지하며 UI를 구현한다.

---

# References

- icon-spec.md
- component-spec.md
- Figma Design Guide
- 기존 프로젝트 스타일 코드