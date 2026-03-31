# 아이콘 규격 (Icon Specification)

## 목적

이 문서는 프로젝트에서 사용하는 아이콘의 구현 규칙과 사용 가능한 아이콘 목록을 정의한다.

모든 UI 구현 시 반드시 이 규칙을 따른다.

---

# 기본 규칙

1. 모든 아이콘은 `ico` 기본 클래스를 포함해야 한다.
2. 아이콘은 `<i>` 태그를 사용하여 구현한다.
3. 아이콘 클래스는 `ico-{name}` 형식을 따른다.
4. 프로젝트에 존재하지 않는 아이콘 이름을 임의로 생성하지 않는다.
5. 외부 아이콘 라이브러리를 사용하지 않는다.
6. 장식용 아이콘은 `aria-hidden="true"` 속성을 사용한다.

예시

```html
<i class="ico ico-search" aria-hidden="true"></i>
```

---

# 아이콘 크기

기본 아이콘 크기는 **24px**이다.

허용된 크기 modifier

- `ico--12`
- `ico--16`
- `ico--20`
- `ico--24`
- `ico--32`
- `ico--40`

예시

```html
<i class="ico ico-search ico--16"></i>
<i class="ico ico-chevron-up ico--32"></i>
```

규칙

- 허용된 크기 외의 사이즈를 만들지 않는다.
- 가능하면 기본 크기(24px)를 사용한다.

---

# 아이콘 색상

아이콘 색상은 CSS `color` 속성으로 제어한다.

권장 방법

```html
<span style="color:#f85100;">
  <i class="ico ico-search"></i>
</span>
```

또는

```html
<i class="ico ico-search" style="color:#151515;"></i>
```

아이콘은 부모 요소의 `color` 값을 상속받는다.

---

# 접근성 규칙

장식용 아이콘

```html
<i class="ico ico-search" aria-hidden="true"></i>
```

버튼 내부 아이콘

```html
<button aria-label="검색">
  <i class="ico ico-search" aria-hidden="true"></i>
</button>
```

규칙

- 아이콘 자체에 클릭 이벤트를 직접 추가하지 않는다.
- 인터랙션은 부모 요소가 담당한다.

---

# 네이밍 규칙

아이콘 클래스 형식

```
ico-{name}
```

예시

- `ico-search`
- `ico-upload`
- `ico-close`
- `ico-chevron-right`

규칙

- kebab-case 사용
- 아이콘 이름을 변경하지 않는다
- 별칭(alias)을 만들지 않는다

---

# 사용 가능한 아이콘 목록

아래 목록에 정의된 아이콘만 사용할 수 있다.

- ico-credit-card-edit
- ico-credit-card-minus
- ico-credit-card-add
- ico-credit-card-check
- ico-credit-card
- ico-percent
- ico-coins-stacked
- ico-cashback
- ico-money-deposit
- ico-money-withdrawal
- ico-money-refund
- ico-money
- ico-share
- ico-paperclip
- ico-upload
- ico-download
- ico-question-circle-fill
- ico-question-circle
- ico-logout
- ico-siren
- ico-info-circle-fill
- ico-info-circle
- ico-exclamation-circle-fill
- ico-exclamation-circle
- ico-choice
- ico-folder-fill
- ico-folder
- ico-copy-fill
- ico-copy
- ico-image-fill
- ico-image
- ico-camera-fill
- ico-camera
- ico-place-fill
- ico-place
- ico-time-fill
- ico-time
- ico-outlink
- ico-comment-fill
- ico-comment
- ico-chat-fill
- ico-chat
- ico-email-fill
- ico-email
- ico-calendat-fill
- ico-calendar
- ico-memo
- ico-receipt
- ico-discount-circle
- ico-gift
- ico-graph-line
- ico-graph-bar
- ico-marker-fill
- ico-pin-fill
- ico-pin
- ico-close-circle-fill
- ico-close-circle
- ico-close
- ico-minus
- ico-plus
- ico-plus-circle-fill
- ico-plus-circle
- ico-show-off
- ico-show-on
- ico-hashtag
- ico-history
- ico-star-on
- ico-star-off
- ico-bookmark-on
- ico-bookmark-off
- ico-bell-delete-fill
- ico-bell-delete
- ico-bell-normal-fill
- ico-bell-normal
- ico-setting
- ico-sort-vertical
- ico-filter
- ico-bento
- ico-kebab
- ico-meatball
- ico-hamburger
- ico-chevron-circle-left
- ico-chevron-circle-right
- ico-chevron-circle-down
- ico-chevron-circle-up
- ico-radio-on
- ico-radio-disabled
- ico-radio-off
- ico-check-circle-on
- ico-check-circle-disabled
- ico-check-circle-off
- ico-check-white
- ico-check-off
- ico-check-on
- ico-refresh-setting
- ico-refresh-time
- ico-refresh
- ico-ratio
- ico-my-shopping-fill
- ico-my-shopping
- ico-my-like-fill
- ico-my-like
- ico-search-fill
- ico-sample
- ico-handle
- ico-arrow-minimise
- ico-arrow-maximise
- ico-arrow-exchange
- ico-arrow-insert
- ico-arrow-left
- ico-arrow-right
- ico-arrow-down
- ico-arrow-up
- ico-layer-close
- ico-chevron-left
- ico-chevron-right
- ico-chevron-down
- ico-chevron-up
- ico-battery
- ico-wifi
- ico-signal
- ico-search
- ico-grid

---

# AI 구현 규칙

Cursor 또는 AI가 UI를 생성할 때 다음 규칙을 따른다.

1. 항상 `<i class="ico ico-{name}">` 형식을 사용한다.
2. 존재하지 않는 아이콘 이름을 생성하지 않는다.
3. 기본 크기(24px)를 우선 사용한다.
4. 필요할 경우에만 허용된 크기 modifier를 사용한다.
5. 색상은 CSS `color`로 제어한다.
6. 아이콘에 직접 이벤트를 추가하지 않는다.
7. 반드시 이 문서에 정의된 아이콘만 사용한다.