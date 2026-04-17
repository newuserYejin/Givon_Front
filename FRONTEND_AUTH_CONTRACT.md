# 프론트엔드 인증 계약서

이 문서는 Spring Boot 백엔드의 인증 API를 프론트엔드에서 사용할 때 필요한 검증 규칙과 요청 형식을 정리한 문서입니다.

## 공통 정보

- Base URL: `http://localhost:8080`
- 인증 방식: `JWT Bearer Token`
- 세션 사용: 없음
- 공통 응답 형식:

```json
{
  "success": true,
  "data": {},
  "message": ""
}
```

## 로그인 가능한 테스트 계정

- 기부자
  - 이메일: `donor@example.com`
  - 비밀번호: `Donor123!`
  - 역할: `DONOR`

- 기관 관리자
  - 이메일: `org@example.com`
  - 비밀번호: `Org123!`
  - 역할: `ORGANIZATION`

- 플랫폼 관리자
  - 이메일: `admin@example.com`
  - 비밀번호: `Admin123!`
  - 역할: `ADMIN`

## 프론트에서 같이 확인해야 할 입력 검증

### 회원가입

`POST /api/auth/signup`

- `name`
  - 필수
  - 최대 100자
- `email`
  - 필수
  - 이메일 형식
  - 최대 100자
- `password`
  - 필수
  - 최소 8자
  - 최대 100자

### 로그인

`POST /api/auth/login`

- `email`
  - 필수
  - 이메일 형식
  - 최대 100자
- `password`
  - 필수

## 프론트 검증 권장값

회원가입 폼에서 아래 기준으로 즉시 검증하면 됩니다.

```ts
export const authValidation = {
  signup: {
    nameMaxLength: 100,
    emailMaxLength: 100,
    passwordMinLength: 8,
    passwordMaxLength: 100,
  },
  login: {
    emailMaxLength: 100,
  },
} as const
```

## 회원가입 요청 예시

```json
{
  "name": "홍길동",
  "email": "donor@example.com",
  "password": "Donor123!"
}
```

## 로그인 요청 예시

```json
{
  "email": "donor@example.com",
  "password": "Donor123!"
}
```

## 로그인 응답 예시

```json
{
  "success": true,
  "data": {
    "tokenType": "Bearer",
    "accessToken": "eyJhbGciOiJIUzI1NiJ9....",
    "user": {
      "id": 1,
      "name": "홍길동",
      "email": "donor@example.com",
      "role": "DONOR"
    }
  },
  "message": "Login successful"
}
```

## 토큰 사용법

로그인 성공 후 `accessToken`을 저장하고, 이후 인증이 필요한 요청에 아래 헤더를 붙입니다.

```http
Authorization: Bearer {accessToken}
```

## 현재 사용자 조회

`GET /api/auth/me`

### Request Header

```http
Authorization: Bearer {accessToken}
```

### Response 예시

```json
{
  "success": true,
  "data": {
    "id": 1,
    "name": "홍길동",
    "email": "donor@example.com",
    "role": "DONOR"
  },
  "message": "Current user fetched"
}
```

## 프론트 구현 팁

1. 입력값은 프론트에서 먼저 검증하고, 서버 응답도 다시 처리합니다.
2. 로그인 성공 시 `accessToken`만 저장해도 됩니다.
3. 인증이 필요한 API는 `Authorization` 헤더를 반드시 추가합니다.
4. 토큰이 없거나 만료되면 로그인 화면으로 이동시키는 흐름을 권장합니다.
5. 역할별 UI 분기는 `user.role` 값으로 처리하면 됩니다.

## 서버 검증과 맞춰야 하는 이유

서버는 `Bean Validation`으로 다시 검증합니다.
프론트도 동일한 규칙을 적용하면 다음 장점이 있습니다.

- 사용자 경험이 좋아집니다.
- 서버 에러를 줄일 수 있습니다.
- 입력 제한이 한 곳에서 벗어나지 않습니다.

