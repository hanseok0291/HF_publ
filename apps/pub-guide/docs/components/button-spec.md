# Button Specification

## 목적

이 문서는 프로젝트에서 사용하는 Box Button 컴포넌트의 종류, 구조, 상태, 크기, 아이콘 규칙, 실제 스타일 스펙, 사용 원칙을 정의한다.

Cursor 및 개발자는 버튼이 포함된 UI를 구현할 때 반드시 이 문서를 참고한다.

버튼 구현 시 다음 원칙을 따른다.

- 기존 버튼 패턴을 우선 재사용한다
- 버튼은 항상 의미에 맞는 HTML 요소를 사용한다
- 버튼의 variant, size, icon, state는 이 문서에 정의된 규칙만 사용한다
- 정의되지 않은 임의 버튼 스타일을 새로 만들지 않는다

---

# 버튼 기본 원칙

## 1. 태그 규칙

- 버튼 동작은 반드시 `<button>` 요소를 사용한다
- 페이지 이동 목적일 경우에만 `<a>` 요소를 사용한다
- 버튼처럼 보이는 `div`, `span`을 사용하지 않는다

기본 예시

```html
<button type="button" class="btn">버튼</button>
```

링크형 예시

```html
<a href="#" class="btn">자세히 보기</a>
```

---

## 2. 버튼 구성 요소

버튼은 다음 요소로 구성될 수 있다.

- 버튼 컨테이너
- 라벨 텍스트
- 좌측 아이콘
- 우측 아이콘

기본 구조

```html
<button type="button" class="btn">
  <span class="btn__label">Label</span>
</button>
```

좌측 아이콘 포함 구조

```html
<button type="button" class="btn">
  <i class="ico ico-plus" aria-hidden="true"></i>
  <span class="btn__label">Label</span>
</button>
```

우측 아이콘 포함 구조

```html
<button type="button" class="btn">
  <span class="btn__label">Label</span>
  <i class="ico ico-chevron-right" aria-hidden="true"></i>
</button>
```

규칙

- 라벨 텍스트는 가능한 한 `<span class="btn__label">`로 감싼다
- 아이콘은 `icon-spec.md` 기준을 따른다
- 아이콘은 보조 요소이며 버튼의 의미와 이벤트는 부모 버튼이 담당한다

---

# 버튼 종류 (Variant)

현재 프로젝트의 Box Button variant는 아래 3가지를 기본으로 사용한다.

- `primary`
- `secondary`
- `tertiary`

---

## Primary Button

### 역할

중요한 행동에 사용한다.

예시

- 로그인
- 확인
- 저장
- 다음
- 제출
- 메인 CTA

### 규칙

- 한 영역에서 가장 중요한 액션에 우선 사용한다
- 동일한 시각 그룹 안에서 과도하게 여러 개를 남용하지 않는다
- 강조 행동이 필요한 경우에 사용한다

### 스타일 (Figma/가이드 기준)

- 배경: `#ff6114` (primary-01 / button-primary)
- 텍스트: white (text-01)
- disabled 시: 배경 `#d1d1d5`, 텍스트 white

예시

```html
<button type="button" class="btn btn--primary">
  <span class="btn__label">Label</span>
</button>
```

---

## Secondary Button

### 역할

대체적인 행동에 사용한다.

예시

- 취소
- 보조 액션
- 부가 기능
- 덜 중요한 CTA

### 규칙

- primary보다 우선순위가 낮은 버튼에 사용한다
- 같은 영역에서 보조 액션일 때 사용한다

### 스타일 (Figma/가이드 기준)

- 배경: `#f6f6f9` (button-secondary)
- 테두리 없음
- 텍스트: `#151515` (text-02)

예시

```html
<button type="button" class="btn btn--secondary">
  <span class="btn__label">Label</span>
</button>
```

---

## Tertiary Button

### 역할

부가적인 행동에 사용한다.

예시

- 더보기
- 자세히
- 부가 액션
- tertiary CTA

### 규칙

- secondary보다 우선순위가 낮은 액션에 사용한다
- 테두리형(ghost/outline) 스타일로, 덜 강조된 선택지에 사용한다

### 스타일 (Figma/가이드 기준)

- 배경: white (button-tertiary)
- 테두리: `1px solid #e5e5e8` (line-03)
- 텍스트: `#151515` (text-02)

예시

```html
<button type="button" class="btn btn--tertiary">
  <span class="btn__label">Label</span>
</button>
```

---

# 버튼 크기 (Size)

현재 프로젝트에서 사용하는 버튼 크기는 아래 5가지다.

- `large`
- `medium`
- `small`
- `xsmall`
- `xxsmall`

규칙

- 버튼 크기는 상하 padding으로 높이를 만드는 방식이 아니라, **height 값으로 고정한다**
- 수직 정렬은 고정 height 기준으로 맞춘다
- padding은 좌우 여백만 사용한다
- 정의되지 않은 임의 크기를 만들지 않는다
- 화면 요구사항에 따라 가장 가까운 크기를 선택한다

---

## Large

### 스펙

- height: `56px`
- border-radius: `12px`
- padding: `0 16px`
- font-size: `16px`

### 역할

가장 기본이 되는 큰 버튼 크기.  
주요 CTA, 제출, 확인 등에 사용한다.

### 예시

```html
<button type="button" class="btn btn--primary btn--large">
  <span class="btn__label">Label</span>
</button>
```

---

## Medium

### 스펙

- height: `48px`
- border-radius: `12px`
- padding: `0 16px`
- font-size: `16px`

### 역할

중간 크기의 기본 버튼.  
일반적인 액션 버튼에 사용한다.

### 예시

```html
<button type="button" class="btn btn--primary btn--medium">
  <span class="btn__label">Label</span>
</button>
```

---

## Small

### 스펙

- height: `44px`
- border-radius: `12px`
- padding: `0 20px`
- font-size: `14px`

### 역할

목록, 카드, 서브 액션 등에 사용하는 작은 버튼.

### 예시

```html
<button type="button" class="btn btn--primary btn--small">
  <span class="btn__label">Label</span>
</button>
```

---

## XSmall

### 스펙

- height: `34px`
- border-radius: `8px`
- padding: `0 12px`
- font-size: `13px`

### 역할

아주 작은 액션 버튼.  
좁은 영역 또는 보조 UI에 사용한다.

### 예시

```html
<button type="button" class="btn btn--primary btn--xsmall">
  <span class="btn__label">Label</span>
</button>
```

---

## XXSmall

### 스펙

- height: `28px`
- border-radius: `8px`
- padding: `0 8px`
- font-size: `13px`

### 역할

가장 작은 액션 버튼.  
매우 제한된 공간에서만 사용한다.

### 예시

```html
<button type="button" class="btn btn--primary btn--xxsmall">
  <span class="btn__label">Label</span>
</button>
```

---

# 버튼 크기 구현 규칙

버튼 size별 스타일은 아래 기준으로 구현한다.

- `large`: `height: 56px; border-radius: 12px; padding: 0 16px; font-size: 16px; font-weight: 700; letter-spacing: -0.32px;`
- `medium`: `height: 48px; border-radius: 12px; padding: 0 16px; font-size: 16px; font-weight: 700; letter-spacing: -0.32px;`
- `small`: `height: 44px; border-radius: 12px; padding: 0 20px; font-size: 14px; font-weight: 700; letter-spacing: -0.28px;`
- `xsmall`: `height: 34px; border-radius: 8px; padding: 0 12px; font-size: 13px; font-weight: 500; letter-spacing: -0.26px;`
- `xxsmall`: `height: 28px; border-radius: 8px; padding: 0 8px; font-size: 13px; font-weight: 500; letter-spacing: -0.26px;`

규칙

- height는 반드시 고정값을 사용한다
- 상하 padding으로 높이를 대체하지 않는다
- 좌우 padding만 사이즈 규칙에 맞게 적용한다
- radius는 size별 지정값을 따른다
- font-size는 size별 지정값을 따른다
- large/medium/small은 font-weight 700(Bold), xsmall/xxsmall은 font-weight 500(Medium)을 사용한다
- letter-spacing은 16px → -0.32px, 14px → -0.28px, 13px → -0.26px를 따른다

---

# 아이콘 규칙

버튼은 아이콘 없이 사용할 수도 있고, 좌측 또는 우측 아이콘과 함께 사용할 수도 있다.

지원 형태

- icon 없음
- left icon
- right icon

---

## Icon 없음

```html
<button type="button" class="btn btn--primary btn--large">
  <span class="btn__label">Label</span>
</button>
```

---

## Left Icon

```html
<button type="button" class="btn btn--primary btn--large">
  <i class="ico ico-plus" aria-hidden="true"></i>
  <span class="btn__label">Label</span>
</button>
```

규칙

- 라벨과 아이콘 사이 간격(gap)은 4px를 사용한다
- 좌측 아이콘은 생성, 추가, 검색 등 라벨 앞 의미 보조에 사용한다
- 아이콘 이름은 `icon-spec.md`에 정의된 것만 사용한다
- size별 아이콘 크기: large/medium 20px, small/xsmall 16px, xxsmall 12px

---

## Right Icon

```html
<button type="button" class="btn btn--primary btn--large">
  <span class="btn__label">Label</span>
  <i class="ico ico-chevron-right" aria-hidden="true"></i>
</button>
```

규칙

- 우측 아이콘은 이동, 진행, 다음 단계 의미 보조에 사용한다
- 화살표형 아이콘이 주로 사용된다

---

# 상태 (State)

현재 프로젝트 버튼 상태는 아래 2가지를 기본으로 사용한다.

- `default`
- `disabled`

---

## Default

기본 활성 상태.

예시

```html
<button type="button" class="btn btn--primary btn--large">
  <span class="btn__label">Label</span>
</button>
```

---

## Disabled

비활성 상태.  
사용 불가 상태를 명확하게 표현한다.

예시

```html
<button type="button" class="btn btn--primary btn--large" disabled>
  <span class="btn__label">Label</span>
</button>
```

규칙

- 비활성 상태는 반드시 `disabled` 속성을 사용한다
- 비활성 버튼에 클릭 이벤트를 기대하지 않는다
- 시각적 비활성 표현은 CSS에서 처리한다

### variant별 disabled 시각 스펙

- **Primary**: 배경 `#d1d1d5` (disabled), 텍스트 white
- **Secondary**: 배경 `#d1d1d5`, 텍스트 white (테두리 없음)
- **Tertiary**: 배경·테두리 유지, 텍스트·아이콘만 `#d1d1d5`

---

# 조합 규칙

버튼은 아래 조합만 사용한다.

- variant × size × icon position × state

허용 예시

- primary + large + default + no icon
- primary + medium + default + left icon
- primary + small + disabled + right icon
- secondary + large + default + no icon
- secondary + xsmall + disabled + left icon
- tertiary + medium + default + right icon

규칙

- variant, size, state, icon 여부를 조합하여 사용한다
- 정의되지 않은 새로운 버튼 스타일명을 만들지 않는다
- `btn--giant` 등 문서에 정의되지 않은 임의 확장 금지
- 필요 시 먼저 디자인 가이드에 추가된 뒤 문서를 갱신한다

---

# 클래스 구조

기본 클래스 구조 예시

```html
<button type="button" class="btn btn--primary btn--large">
  <span class="btn__label">Label</span>
</button>
```

권장 클래스 체계

- `btn`
- `btn--primary`
- `btn--secondary`
- `btn--tertiary`
- `btn--large`
- `btn--medium`
- `btn--small`
- `btn--xsmall`
- `btn--xxsmall`

필요 시 내부 요소

- `btn__label`

규칙

- 버튼 공통 클래스는 `btn`을 기본으로 사용한다
- variant와 size는 modifier class로 구분한다
- 상태는 실제 속성(`disabled`)과 상태 class를 프로젝트 패턴에 맞게 사용한다
- 프로젝트에 이미 다른 클래스 규칙이 있다면 기존 규칙을 우선 따르되, 구조 의미는 동일하게 유지한다

---

# HTML 예시

## Primary Large Default

```html
<button type="button" class="btn btn--primary btn--large">
  <span class="btn__label">Label</span>
</button>
```

## Primary Large Left Icon

```html
<button type="button" class="btn btn--primary btn--large">
  <i class="ico ico-plus" aria-hidden="true"></i>
  <span class="btn__label">Label</span>
</button>
```

## Primary Large Right Icon

```html
<button type="button" class="btn btn--primary btn--large">
  <span class="btn__label">Label</span>
  <i class="ico ico-chevron-right" aria-hidden="true"></i>
</button>
```

## Primary Large Disabled

```html
<button type="button" class="btn btn--primary btn--large" disabled>
  <span class="btn__label">Label</span>
</button>
```

## Secondary Medium Default

```html
<button type="button" class="btn btn--secondary btn--medium">
  <span class="btn__label">Label</span>
</button>
```

## Secondary Small Right Icon

```html
<button type="button" class="btn btn--secondary btn--small">
  <span class="btn__label">Label</span>
  <i class="ico ico-chevron-right" aria-hidden="true"></i>
</button>
```

## Secondary XSmall Disabled

```html
<button type="button" class="btn btn--secondary btn--xsmall" disabled>
  <span class="btn__label">Label</span>
</button>
```

## Tertiary Medium Default

```html
<button type="button" class="btn btn--tertiary btn--medium">
  <span class="btn__label">Label</span>
</button>
```

## Tertiary Small Right Icon

```html
<button type="button" class="btn btn--tertiary btn--small">
  <span class="btn__label">Label</span>
  <i class="ico ico-chevron-right" aria-hidden="true"></i>
</button>
```

---

# CSS 구현 예시

공통 및 variant는 design-system.md·color-semantic 토큰을 사용한다. 실제 구현은 `pages/buttons.html` 및 `css/buttons.css`를 참고한다.

```css
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  border: none;
  font-family: var(--font-sans);
  line-height: 1.4;
  cursor: pointer;
  white-space: nowrap;
}

.btn--primary {
  background-color: var(--color-button-primary);
  color: var(--color-text-01);
}
.btn--primary:disabled {
  background-color: var(--color-disabled);
  color: var(--color-text-01);
}

.btn--secondary {
  background-color: var(--color-button-secondary);
  color: var(--color-text-02);
  /* 테두리 없음 */
}
.btn--secondary:disabled {
  background-color: var(--color-disabled);
  color: var(--color-text-01);
}

.btn--tertiary {
  background-color: var(--color-button-tertiary);
  color: var(--color-text-02);
  border: 1px solid var(--color-line-03);
}
.btn--tertiary:disabled {
  color: var(--color-disabled);
  border-color: var(--color-line-03);
}

.btn--large {
  height: 56px;
  padding: 0 16px;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 700;
  letter-spacing: -0.32px;
}
.btn--medium {
  height: 48px;
  padding: 0 16px;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 700;
  letter-spacing: -0.32px;
}
.btn--small {
  height: 44px;
  padding: 0 20px;
  border-radius: 12px;
  font-size: 14px;
  font-weight: 700;
  letter-spacing: -0.28px;
}
.btn--xsmall {
  height: 34px;
  padding: 0 12px;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 500;
  letter-spacing: -0.26px;
}
.btn--xxsmall {
  height: 28px;
  padding: 0 8px;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 500;
  letter-spacing: -0.26px;
}
```

규칙

- 위 CSS는 예시이며, 실제 프로젝트는 `css/buttons.css` 및 design token을 따른다
- size별 height / radius / padding / font-size / font-weight / letter-spacing 값은 반드시 유지한다
- Secondary는 테두리를 두지 않는다. Tertiary만 1px line-03 테두리를 사용한다

---

# 접근성 규칙

- 버튼은 반드시 `<button>` 또는 목적에 맞는 `<a>`를 사용한다
- 아이콘만 있는 버튼은 반드시 `aria-label`을 제공한다
- 장식용 아이콘은 `aria-hidden="true"`를 사용한다
- 비활성 버튼은 `disabled` 속성을 사용한다

아이콘만 있는 버튼 예시

```html
<button type="button" class="btn-icon" aria-label="닫기">
  <i class="ico ico-close" aria-hidden="true"></i>
</button>
```

---

# 사용 원칙

## Primary 사용 원칙

- 한 영역의 주요 행동에 사용한다
- 사용자 행동을 유도하는 대표 CTA에 사용한다

## Secondary 사용 원칙

- 보조 행동에 사용한다
- 취소, 옵션, 부가 액션에 사용한다

## Tertiary 사용 원칙

- 부가적인 행동에 사용한다
- 더보기, 자세히, 덜 강조된 선택지에 사용한다

## Size 사용 원칙

- large: 메인 액션
- medium: 일반 액션
- small: 카드/리스트/서브 액션
- xsmall / xxsmall: 제한된 영역의 보조 액션

## Icon 사용 원칙

- left icon: 추가, 생성, 검색, 다운로드 등
- right icon: 다음, 이동, 진입, 상세보기 등

---

# 하지 말아야 하는 것

1. 버튼처럼 보이는 `div` 사용
2. 정의되지 않은 새로운 variant 생성
3. 정의되지 않은 새로운 size 생성
4. 아이콘에 직접 클릭 이벤트 연결
5. disabled 상태를 시각적으로만 처리하고 속성은 누락
6. 버튼마다 다른 내부 구조 사용
7. 동일한 역할의 버튼을 페이지마다 다른 HTML 구조로 생성
8. 상하 padding으로 버튼 높이를 조절하는 방식 사용

---

# Cursor 구현 규칙

Cursor는 버튼이 포함된 UI를 생성할 때 반드시 아래 규칙을 따른다.

1. 버튼은 항상 `<button>` 또는 목적에 맞는 `<a>`를 사용한다.
2. 버튼 구조는 이 문서의 기본 구조를 따른다.
3. variant는 `primary`, `secondary`, `tertiary`만 사용한다.
4. size는 `large`, `medium`, `small`, `xsmall`, `xxsmall`만 사용한다.
5. state는 `default`, `disabled`만 사용한다.
6. 아이콘은 left, right, none 세 가지 방식만 사용한다.
7. 아이콘은 `icon-spec.md`에 정의된 클래스만 사용한다.
8. 비활성 상태는 반드시 `disabled` 속성으로 처리한다.
9. 버튼 height는 size별 고정값을 사용한다.
10. 버튼 높이를 상하 padding으로 구현하지 않는다.
11. 정의되지 않은 버튼 스타일을 새로 만들지 않는다.
12. 기존 프로젝트 버튼 패턴이 있다면 그 패턴을 우선 참고하되, 이 문서의 구조 원칙과 size 스펙을 유지한다.

---

# Button Group (그룹 버튼)

## 목적

아래 콘텐츠가 있을 경우 박스 버튼 컴포넌트와 조합하여 사용한다. 스크롤 영역 하단 고정·풀스크린 하단 등 그라데이션 배경 위에 버튼을 올릴 때 사용한다(Figma: Gradation button·Button/Group).

## 패턴 요약

| 패턴 | 설명 |
|------|------|
| Btn=1, Sub-Text=False | 단일 Primary 버튼, 풀 너비 |
| Btn=1, Sub-Text=True | 단일 Primary 버튼 + 하단 캡션(11px, text-04) |
| Btn=2, Vertical | 세로 배치: Primary + Text 링크 |
| Btn=2, Horizontal, Ratio=1:1 | 가로 배치, Tertiary + Primary 동일 비율 |
| Btn=2, Horizontal, Ratio=4:6 | 가로 배치, Tertiary 40% / Primary 60% |
| Btn=2, Horizontal, Sub-Icon_btn=True | Tertiary 아이콘 전용(56×56) + Primary |
| Btn=3, Horizontal, Sub-Icon_btn=True | Btn=2 Sub-Icon_btn과 동일(아이콘 + Primary) |

## Btn=1 (단일 버튼)

- **Sub-Text=False**: Primary 버튼 하나만 표시.
- **Sub-Text=True**: Primary 버튼 하단에 보조 문구(캡션) 표시. 폰트 11px, color text-04, line-height 1.4, letter-spacing -0.22px.

예시 (Sub-Text=True)

```html
<div class="btn-group">
  <button type="button" class="btn btn--primary btn--large">
    <span class="btn__label">동의합니다</span>
  </button>
  <p class="btn-group__subtext">약관 및 정보 제공 등에 동의합니다.</p>
</div>
```

## Btn=2 (버튼 2개)

- **Horizontal=False (세로)**: Primary 풀 너비 + 그 아래 Text 링크. 링크는 `btn-group__text-link`로 스타일(16px, text-04, 정렬).
- **Horizontal=True, Ratio=1:1**: Tertiary + Primary를 가로로 동일 비율.
- **Horizontal=True, Ratio=4:6**: Tertiary 40%, Primary 60%.
- **Sub-Icon_btn=True**: 좌측 Tertiary 아이콘 전용 버튼(56×56) + Primary가 나머지 너비.

예시 (가로, Ratio=1:1)

```html
<div class="btn-group btn-group--horizontal btn-group--ratio-1-1">
  <button type="button" class="btn btn--tertiary btn--large">
    <span class="btn__label">취소</span>
  </button>
  <button type="button" class="btn btn--primary btn--large">
    <span class="btn__label">확인</span>
  </button>
</div>
```

예시 (세로)

```html
<div class="btn-group">
  <button type="button" class="btn btn--primary btn--large">
    <span class="btn__label">Label</span>
  </button>
  <a href="#" class="btn-group__text-link">Label</a>
</div>
```

예시 (Sub-Icon_btn=True)

```html
<div class="btn-group btn-group--horizontal">
  <button type="button" class="btn btn--tertiary btn--large btn-icon-only" aria-label="닫기">
    <i class="ico ico-close" aria-hidden="true"></i>
    <span class="btn__label">닫기</span>
  </button>
  <button type="button" class="btn btn--primary btn--large">
    <span class="btn__label">Label</span>
  </button>
</div>
```

## Btn=3

Horizontal + Sub-Icon_btn=True일 때만 사용. 구성은 Btn=2의 Sub-Icon_btn=True와 동일(아이콘 전용 Tertiary + Primary).

## 클래스 구조 (Button Group)

컨테이너

- `btn-group` — 그룹 래퍼. 세로 flex, gap 8px, 그라데이션 배경·padding 적용.

Modifier

- `btn-group--horizontal` — 가로 배치(flex-direction: row).
- `btn-group--ratio-1-1` — 자식 셀 동일 비율(flex: 1 1 0).
- `btn-group--ratio-4-6` — 첫 번째 셀 40%, 두 번째 셀 60%.

내부 요소

- `btn-group__subtext` — Btn=1 Sub-Text=True일 때 캡션용 문단.
- `btn-group__text-link` — Btn=2 Vertical일 때 하단 텍스트 링크.

아이콘 전용 버튼

- `btn-icon-only` — 56×56 고정, 라벨은 스크린 리더용으로만 노출(시각 숨김). Box Button의 variant·size와 함께 사용.

## 스타일 스펙 (그룹 컨테이너)

- 배경: `linear-gradient(to top, transparent 0%, var(--color-background-01) 50%)`
- padding: 20px 16px (py 20px, px 16px)
- gap: 8px
- 가이드에서 예시 너비: 375px 고정(`.btn-group-demo`)

## 규칙

- Button Group은 Box Button(variant·size·아이콘) 규칙을 그대로 따른다.
- 그룹 컨테이너는 스크롤 영역 하단·풀스크린 하단 등 “아래 콘텐츠가 있을 때”만 사용한다.
- 정의된 패턴(Btn=1/2/3, Horizontal/Vertical, Ratio, Sub-Text, Sub-Icon_btn)만 사용한다.
- 구현·라이브 예시: `pages/buttons.html` Button Group 섹션, `css/buttons.css` `.btn-group` 계열.

---

# References

- design-system.md — Color, Spacing, Radius, Typography 토큰
- icon-spec.md — 아이콘 클래스 및 사용 규칙
- Figma Button Guide — Buttons 레이어 (Primary / Secondary / Tertiary), Button/Group
- 가이드 페이지: `pages/buttons.html` — 케이스 매트릭스, Button Group, 라이브 예시
- 구현 CSS: `css/buttons.css` — Box Button 및 Button Group 스타일
- 기존 프로젝트 Button HTML/CSS 패턴