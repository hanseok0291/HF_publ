# API Contract (Draft)

## `POST /payments/prepare`

- 목적: 결제 세션 생성
- 요청 예시
  - `planId`: string
  - `userId`: string
- 응답 예시
  - `sessionId`: string
  - `amount`: number
  - `currency`: string

## `POST /payments/confirm`

- 목적: 결제 승인
- 요청 예시
  - `sessionId`: string
  - `paymentMethod`: string
- 응답 예시
  - `status`: `success` | `failed`
  - `transactionId`: string
  - `message`: string
