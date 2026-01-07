# 전용통장 프로젝트 페이지 목록

## 📁 프로젝트 경로
`html/dedicatedSavings/`

---

## 📄 페이지 목록

### 1. 사전알림 페이지
- **파일명**: `index.html`
- **경로**: `html/dedicatedSavings/index.html`
- **제목**: RROUND - 사전알림
- **설명**: 전용통장 오픈 사전 알림 신청 페이지
- **주요 기능**:
  - 히어로 섹션 (캐릭터 소개)
  - 혜택 안내 (3가지)
  - 캐릭터 성장 그래프
  - 알림 신청 혜택
  - 하단 고정 버튼

---

### 2. 캐릭터 만들기 페이지
- **파일명**: `createCharacter.html`
- **경로**: `html/dedicatedSavings/createCharacter.html`
- **제목**: RROUND - 내 캐릭터 만들기
- **설명**: 사진을 업로드하여 나만의 캐릭터를 만드는 페이지
- **주요 기능**:
  - 사진 업로드 영역
  - 바텀시트 모달 (사진 선택 옵션)
  - 이미지 미리보기
  - 안내 메시지
  - 버튼 상태 관리 (disabled/enabled)

---

### 3. 캐릭터 만드는 중 페이지
- **파일명**: `creatingCharacter.html`
- **경로**: `html/dedicatedSavings/creatingCharacter.html`
- **제목**: RROUND - 캐릭터 만드는 중
- **설명**: 캐릭터 생성 중 로딩 페이지
- **주요 기능**:
  - 텍스트 회전 인터랙션 (3초마다 변경)
  - 로딩 애니메이션 영역 (Lottie 예정)
  - 자동 페이지 이동 (5초 후)

---

### 4. 캐릭터 완성 페이지
- **파일명**: `characterComplete.html`
- **경로**: `html/dedicatedSavings/characterComplete.html`
- **제목**: RROUND - 캐릭터 완성
- **설명**: 캐릭터 생성 완료 페이지
- **주요 기능**:
  - 완성된 캐릭터 이미지 표시
  - 다시 만들기 버튼
  - 공유하기 버튼
  - 캐릭터 저장하기 버튼

---

## 🔗 페이지 확인용 URL

### 1. 사전알림 페이지
```
https://ux.sbsvc.online/010pay/010pay-payment/html/dedicatedSavings/index.html
```

### 2. 캐릭터 만들기 페이지
```
https://ux.sbsvc.online/010pay/010pay-payment/html/dedicatedSavings/createCharacter.html
```

### 3. 캐릭터 만드는 중 페이지
```
https://ux.sbsvc.online/010pay/010pay-payment/html/dedicatedSavings/creatingCharacter.html
```

### 4. 캐릭터 완성 페이지
```
https://ux.sbsvc.online/010pay/010pay-payment/html/dedicatedSavings/characterComplete.html
```

---

## 📂 관련 파일

### CSS 파일
- `css/dedicatedSavings/index.css`
- `css/dedicatedSavings/createCharacter.css`
- `css/dedicatedSavings/creatingCharacter.css`
- `css/dedicatedSavings/characterComplete.css`

### 이미지 파일
- `images/dedicatedSavings/` 폴더 내 이미지들

---

## 🎯 페이지 플로우

```
1. index.html (사전알림)
   ↓ [통장 오픈 알림 받기 버튼 클릭]
   
2. createCharacter.html (캐릭터 만들기)
   ↓ [사진 업로드 후 다음 버튼 클릭]
   
3. creatingCharacter.html (만들기 중)
   ↓ [5초 후 자동 이동]
   
4. characterComplete.html (캐릭터 완성)
```

---

**작성일**: 2024년
**프로젝트**: 전용통장 (dedicatedSavings)

