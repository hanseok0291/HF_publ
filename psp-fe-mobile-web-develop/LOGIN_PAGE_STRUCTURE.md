# 로그인 페이지 구조 문서

## 📄 페이지 파일

### 1. 로그인 페이지
**파일 경로:** `src/app/(beforeLogin)/[service]/login/page.tsx`

**역할:**
- 로그인 폼 페이지 진입점
- 서비스 타입 검증 및 PageClient 컴포넌트 렌더링

**연결된 파일:**
- `src/components/login/PageClient.tsx` - 메인 로그인 컨테이너 컴포넌트

---

### 2. 2차 인증 페이지 (OTP)
**파일 경로:** `src/app/(beforeLogin)/[service]/login/verify/page.tsx`

**역할:**
- 2차 인증 코드 입력 페이지
- OTP 5자리 숫자 입력
- 인증 코드 재발송 기능

**연결된 파일:**
- `src/components/login/VerifyInput.tsx` - 인증 코드 입력 컴포넌트
- `src/components/common/ErrorText.tsx` - 에러 메시지 표시
- `src/apis/common/authApis.ts` - `sendCode`, `verificationLogin` API
- `src/stores/useSaveUserInfo.ts` - 사용자 정보 조회
- `src/schema/common/Auth.schema.ts` - `PhoneVerifyValues` 스키마
- `src/hooks/useVerifyUtil.ts` - 인증 처리 훅

---

### 3. 계정 정보 찾기 페이지
**파일 경로:** `src/app/(beforeLogin)/[service]/login/find/page.tsx`

**역할:**
- 계정 정보 찾기 폼 페이지
- 이름과 휴대폰 번호 입력
- 계정 정보 확인 API 호출

**연결된 파일:**
- `src/components/common/Input.tsx` - 입력 필드
- `src/components/common/Button.tsx` - 버튼
- `src/components/common/ErrorText.tsx` - 에러 메시지 표시
- `src/apis/common/authApis.ts` - `findUserInfo` API
- `src/stores/useSaveUserInfo.ts` - 사용자 정보 저장
- `src/schema/common/Auth.schema.ts` - `FindInfoSchema` 스키마
- `src/utils/formatUtils.ts` - 휴대폰 번호 포맷팅

---

### 4. 계정 정보 찾기 성공 페이지
**파일 경로:** `src/app/(beforeLogin)/[service]/login/find/success/page.tsx`

**역할:**
- 계정 정보 찾기 성공 후 임시 비밀번호 발급 안내
- 로그인 화면으로 이동

**연결된 파일:**
- `src/components/common/Button.tsx` - 버튼
- `src/stores/useSaveUserInfo.ts` - 사용자 정보 조회 및 초기화

---

## 🧩 컴포넌트

### 1. PageClient
**파일 경로:** `src/components/login/PageClient.tsx`

**역할:**
- 메인 로그인 컨테이너 컴포넌트
- 로그인 폼 관리 및 제출 처리
- 계정 정보 저장 기능
- 서비스 타입별 탭 UI (수거업체/판매소)
- 자동 로그아웃 모달 처리

**주요 기능:**
- `requestFirstLogin` API 호출
- 계정 정보 localStorage 저장/삭제
- 로그인 성공 시 2차 인증 페이지로 이동
- 앱 버전 체크 및 서비스 타입 리다이렉트

**사용 위치:**
- `src/app/(beforeLogin)/[service]/login/page.tsx`

---

### 2. PageClientInput
**파일 경로:** `src/components/login/_components/PageClientInput.tsx`

**역할:**
- 로그인 입력 필드 컴포넌트
- 아이디(이메일) 및 비밀번호 입력
- 계정 정보 저장 체크박스
- 로그인 버튼

**Props:**
- `isSaveAccount: boolean` - 계정 정보 저장 체크 상태
- `onSaveAccountChange: (checked: boolean) => void` - 체크박스 변경 핸들러

**사용 위치:**
- `src/components/login/PageClient.tsx`

---

### 3. VerifyInput
**파일 경로:** `src/components/login/VerifyInput.tsx`

**역할:**
- 5자리 인증 코드 입력 컴포넌트
- OTP 입력 필드 (InputOTP 사용)

**Props:**
- `control: Control<PhoneVerifyValues>` - react-hook-form control
- `name: "verificationCode"` - 필드 이름

**사용 위치:**
- `src/app/(beforeLogin)/[service]/login/verify/page.tsx`

---

### 4. ErrorText
**파일 경로:** `src/components/common/ErrorText.tsx`

**역할:**
- 에러 메시지 표시 컴포넌트
- 공통 에러 텍스트 스타일

**사용 위치:**
- `src/components/login/PageClient.tsx`
- `src/app/(beforeLogin)/[service]/login/verify/page.tsx`
- `src/app/(beforeLogin)/[service]/login/find/page.tsx`

---

## 📋 스키마 & Validation

### Auth.schema.ts
**파일 경로:** `src/schema/common/Auth.schema.ts`

**내용:**
```typescript
// 로그인 스키마
export const LoginSchema = z.object({
  loginId: z.string().min(1, { message: "아이디를 입력해 주세요." })
    .email({ message: "올바른 이메일 형식이 아닙니다." }),
  password: z.string().min(8, { message: "비밀번호는 8자리여야 합니다." })
});

// 계정 정보 찾기 스키마
export const FindInfoSchema = z.object({
  name: z.string().min(1, { message: "이름을 입력해 주세요." }),
  cellPhoneNumber: z.string().min(1, { message: "전화번호는 최소한 13자리여야 합니다." })
});

// 2차 인증 스키마
const phoneVerifySchema = z.object({
  adminId: z.string(),
  verificationCode: z.string().min(1, { message: "인증번호를 입력해주세요." })
});

// 타입 정의
export type LoginValues = z.infer<typeof LoginSchema>;
export type FindInfoValues = z.infer<typeof FindInfoSchema>;
export type PhoneVerifyValues = z.infer<typeof phoneVerifySchema>;
```

**사용 위치:**
- `LoginSchema`: `src/components/login/PageClient.tsx`
- `FindInfoSchema`: `src/app/(beforeLogin)/[service]/login/find/page.tsx`
- `phoneVerifySchema`: `src/app/(beforeLogin)/[service]/login/verify/page.tsx`

---

## 🌐 API

### authApis.ts
**파일 경로:** `src/apis/common/authApis.ts`

**함수:**

#### 1. requestFirstLogin
```typescript
export const requestFirstLogin: ApiFunction<
  { loginId: string; password: string },
  {
    adminId: string;
    secondAuthType: string;
    secondAuthValue: string;
    expiredDate: string;
  }
> = (params) => postRequest({ url: `/v1/login`, params });
```
- **용도:** 로그인 요청
- **사용 위치:** `src/components/login/PageClient.tsx`

#### 2. verificationLogin
```typescript
export const verificationLogin: ApiFunction<
  { adminId: string; verificationCode: string; osType: string },
  VerificationLoginType
> = (params) => postRequest({ url: `/v1/login/verification`, params });
```
- **용도:** 2차 인증 코드 검증
- **사용 위치:** `src/hooks/useVerifyUtil.ts`

#### 3. findUserInfo
```typescript
export const findUserInfo: ApiFunction<
  { name: string; cellPhoneNumber: string },
  {}
> = (params) => postRequest({ url: `/v1/find-account`, params });
```
- **용도:** 계정 정보 찾기
- **사용 위치:** `src/app/(beforeLogin)/[service]/login/find/page.tsx`

#### 4. sendCode
```typescript
export const sendCode: ApiFunction<{ adminId: string }, number> = (params) =>
  postRequest({ url: `/v1/login/code-send`, params });
```
- **용도:** 인증 코드 재발송
- **사용 위치:** `src/app/(beforeLogin)/[service]/login/verify/page.tsx`

#### 5. temporaryPasswordLogin
```typescript
export const temporaryPasswordLogin: ApiFunction<
  { adminId: string },
  boolean
> = (params) => postRequest({ url: `/v1/temporary-password`, params });
```
- **용도:** 임시 비밀번호 발급
- **사용 위치:** 계정 찾기 플로우에서 사용 (현재 코드에서는 직접 호출하지 않음)

---

## 💾 상태 관리

### useSaveUserInfo
**파일 경로:** `src/stores/useSaveUserInfo.ts`

**역할:**
- 사용자 정보 상태 관리 (Zustand)
- sessionStorage에 persist

**상태 구조:**
```typescript
type UserType = Partial<
  ExtractContent<typeof requestFirstLogin> & {
    secondAuthType: string;
    nextStep: "prev" | "otp";
    content: any; // 비밀번호 찾기 계정 정보
  }
>;
```

**메서드:**
- `setUser(user)` - 사용자 정보 설정
- `resetUser()` - 사용자 정보 초기화

**사용 위치:**
- `src/components/login/PageClient.tsx`
- `src/app/(beforeLogin)/[service]/login/verify/page.tsx`
- `src/app/(beforeLogin)/[service]/login/find/page.tsx`
- `src/app/(beforeLogin)/[service]/login/find/success/page.tsx`

---

## 🔧 유틸리티

### formatUtils.ts
**파일 경로:** `src/utils/formatUtils.ts` 또는 `src/lib/formatUtils.ts`

**함수:**
- `formatPhoneNumber(value: string)` - 휴대폰 번호 포맷팅 (010-1234-5678)

**사용 위치:**
- `src/app/(beforeLogin)/[service]/login/find/page.tsx`

---

## 📊 파일 연결 다이어그램

```
로그인 페이지 (login/page.tsx)
└── PageClient (로그인 컨테이너)
    ├── PageClientInput (입력 필드, 체크박스, 버튼)
    ├── ErrorText (에러 메시지)
    ├── Modal (자동 로그아웃 알림)
    ├── 스키마: LoginSchema
    ├── API: requestFirstLogin
    ├── 상태 관리: useSaveUserInfo
    └── localStorage: savedLoginId (계정 정보 저장)
            │
            └── 성공 시 이동
                    │
                    └── 2차 인증 페이지 (login/verify/page.tsx)
                            ├── VerifyInput (5자리 인증 코드 입력)
                            ├── ErrorText (에러 메시지)
                            ├── 스키마: phoneVerifySchema
                            ├── API: verificationLogin, sendCode
                            ├── 상태 관리: useSaveUserInfo
                            └── 훅: useVerifyUtil

로그인 페이지 (login/page.tsx)
    │
    └── 링크 클릭
            │
            └── 계정 정보 찾기 페이지 (login/find/page.tsx)
                    ├── Input (이름, 휴대폰 번호)
                    ├── Button (계정 정보 확인)
                    ├── ErrorText (에러 메시지)
                    ├── 스키마: FindInfoSchema
                    ├── API: findUserInfo
                    ├── 상태 관리: useSaveUserInfo
                    ├── 유틸리티: formatPhoneNumber
                    │
                    └── 성공 시 이동
                            │
                            └── 계정 정보 찾기 성공 페이지 (login/find/success/page.tsx)
                                    ├── Button (로그인 화면으로 이동)
                                    └── 상태 관리: useSaveUserInfo (초기화)
```

---

## 🎨 주요 기능 흐름

### 로그인 플로우

1. **로그인 페이지 진입**
   - 서비스 타입 검증 (`store` 또는 `collector`)
   - 저장된 계정 정보 로드 (localStorage)
   - 앱 버전 체크 및 서비스 타입 리다이렉트

2. **로그인 폼 제출**
   - `requestFirstLogin` API 호출
   - 성공 시:
     - 계정 정보 저장 처리 (localStorage)
     - `adminId` 쿠키 설정
     - `useSaveUserInfo`에 사용자 정보 저장
     - `/login/verify` 페이지로 이동

3. **2차 인증 페이지**
   - `useSaveUserInfo`에서 인증 정보 조회 (`secondAuthType`, `secondAuthValue`)
   - 5자리 인증 코드 입력
   - 코드 입력 완료 시 자동 제출 (`useVerifyUtil` 사용)
   - `verificationLogin` API 호출
   - 재발송 기능: `sendCode` API 호출

### 계정 정보 찾기 플로우

1. **계정 정보 찾기 페이지**
   - 이름과 휴대폰 번호 입력
   - 휴대폰 번호 자동 포맷팅 (`formatPhoneNumber`)
   - `findUserInfo` API 호출
   - 성공 시 `useSaveUserInfo`에 사용자 정보 저장
   - `/login/find/success` 페이지로 이동

2. **계정 정보 찾기 성공 페이지**
   - `useSaveUserInfo`에서 계정 정보 조회
   - 임시 비밀번호 발급 안내
   - "로그인 화면으로 이동" 버튼 클릭
   - `useSaveUserInfo` 초기화
   - 로그인 페이지로 이동

---

## 🔗 관련 파일

### 공통 컴포넌트
- `src/components/common/Input.tsx` - 입력 필드
- `src/components/common/Button.tsx` - 버튼
- `src/components/common/Checkbox.tsx` - 체크박스
- `src/components/common/ErrorText.tsx` - 에러 메시지
- `src/components/common/Modal.tsx` - 모달

### UI 컴포넌트
- `src/components/ui/input-otp.tsx` - OTP 입력 컴포넌트

### 훅
- `src/hooks/useVerifyUtil.ts` - 2차 인증 처리 훅

### 유틸리티
- `src/utils/compareVersion.ts` - 앱 버전 비교
- `src/utils/WebViewHandler.ts` - 웹뷰 체크

---

## 📝 변경 이력

### 2024-XX-XX (문서 작성)
- 현재 코드 기준으로 로그인 페이지 구조 문서 작성
- 페이지, 컴포넌트, API, 상태 관리, 스키마 정리
- 파일 연결 다이어그램 및 주요 기능 흐름 문서화

