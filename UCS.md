# Givon_front - 프로젝트 문서

**UCS CLI에 의해 자동 생성됨**


## 개요

- **프로젝트 유형**: Node.js, React, TypeScript, Vite

### 프로젝트 통계

- **전체 파일 수**: 51
- **전체 디렉토리 수**: 11
- **루트 디렉토리**: `D:\codex_test\Givon_front`


## 빌드 및 실행

### React

```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm run dev

# 프로덕션 빌드
npm run build
```



## 프로젝트 구조

### 디렉토리 구조

- **`src/`** — 35개 파일


## 애플리케이션 아키텍처

### 시작 프로세스

```
npm install (의존성 설치)
  ↓
Vite Dev Server Start
  ↓
Entry Point (index.html → main.tsx/js)
  ↓
Root Component Render
  ↓
Router Initialization
  ↓
Application Ready
```


### 아키텍처 레이어

**Pattern**: Component-Based Architecture - 컴포넌트 기반 프론트엔드 아키텍처

The project follows a **Component-Based Architecture** using React.

**페이지 레이어 (Pages/Routes)**
- 라우트별 페이지 컴포넌트
- 페이지 레벨 데이터 패칭 및 상태 관리
- 레이아웃 및 중첩 라우팅 구성

**컴포넌트 레이어 (Components)**
- 재사용 가능한 UI 컴포넌트
- 공통 레이아웃, 네비게이션, UI 요소
- Props를 통한 컴포넌트 간 데이터 전달

**서비스/훅 레이어 (Services/Hooks)**
- API 통신 및 비즈니스 로직 캡슐화
- 커스텀 훅 및 공통 상태 로직
- 외부 라이브러리 연동(지도, 차트 등)



### 주요 컴포넌트

- **`pages/`** (8개 파일) — 라우트별 페이지 컴포넌트
- **`components/`** (4개 파일) — 공유 재사용 UI 컴포넌트
- **`hooks/`** (6개 파일) — 커스텀 React 훅
- **`api/`** (6개 파일) — API 클라이언트 및 엔드포인트
- **`constants/`** (1개 파일) — 소스 파일
- **`routes/`** (3개 파일) — 소스 파일
- **`types/`** (3개 파일) — 소스 파일



## 상세 소스 파일 분석

### api/

**파일 수**: 6

- `auth.ts`
- `client.ts`
- `mock.ts`
- `orgs.ts`
- `userApi.d.ts`
- `userApi.js`

### components/

**파일 수**: 4

- `DonationItemSelector.tsx`
- `OrganizationCard.tsx`
- `PageShell.tsx`
- `StatusTimeline.tsx`

### constants/

**파일 수**: 1

- `authValidation.ts`

### hooks/

**파일 수**: 6

- `useAuth.tsx`
- `useDonateToOrganization.ts`
- `useOrganization.ts`
- `useOrganizations.ts`
- `useOrganizationStatus.ts`
- `useUsers.ts`

### pages/

**파일 수**: 8

- **admin/** — 2개 파일: `Dashboard.tsx`, `UserList.tsx`
- `Home.tsx`
- `Login.tsx`
- `MyPage.tsx`
- `OrgDetail.tsx`
- `Register.tsx`
- **organization/** — 1개 파일: `Dashboard.tsx`

### routes/

**파일 수**: 3

- `AppRouter.tsx`
- `index.ts`
- `RouteGuards.tsx`

### types/

**파일 수**: 3

- `auth.ts`
- `donation.ts`
- `user.ts`

### src/ (루트 파일)

- `App.tsx`
- `main.tsx`
- `vite-env.d.ts`



## 작업 및 기능 분류

### UI 및 컴포넌트
- **렌더링**: React 컴포넌트 트리 렌더링 및 업데이트
- **이벤트 처리**: 사용자 상호작용 및 폼 입력 처리
- **상태 관리**: 컴포넌트 및 전역 상태 관리
- **라우팅**: 클라이언트 사이드 페이지 네비게이션

### 데이터 통신
- **API 호출**: REST API 및 외부 서비스 연동
- **비동기 처리**: Promise/async-await 기반 데이터 패칭
- **캐싱**: 서버 응답 캐싱 및 상태 동기화

### 빌드 및 배포
- **개발 서버**: HMR(Hot Module Replacement) 지원 로컬 개발
- **번들링**: 코드 분할(Code Splitting) 및 트리 쉐이킹
- **최적화**: 정적 자산 압축 및 캐시 버스팅
- **배포**: 정적 파일 빌드 및 CDN/서버 배포

### 테스트 및 품질
- **단위 테스트**: 컴포넌트 및 훅 단위 테스트
- **통합 테스트**: 사용자 시나리오 기반 E2E 테스트
- **접근성**: ARIA 속성 및 키보드 네비게이션 검증


## 기술 스택

### 프레임워크 및 빌드 도구
- Node.js
- React
- TypeScript
- Vite

### 주요 의존성 (dependencies)
- `@ant-design/icons` (^5.6.1)
- `@tanstack/react-query` (^5.59.20)
- `antd` (^5.20.6)
- `axios` (^1.7.7)
- `react` (^18.3.1)
- `react-dom` (^18.3.1)
- `react-router-dom` (^6.26.2)

### 개발 의존성 (devDependencies)
- `@types/react` (^18.3.8)
- `@types/react-dom` (^18.3.0)
- `@vitejs/plugin-react` (^4.3.1)
- `autoprefixer` (^10.4.20)
- `postcss` (^8.4.47)
- `tailwindcss` (^3.4.13)
- `typescript` (^5.6.3)
- `vite` (^5.4.8)



## 코딩 표준 및 모범 사례

### 컴포넌트 구조화
- 단일 책임 원칙: 컴포넌트는 하나의 역할만 담당
- 재사용 가능한 컴포넌트는 `components/`에, 페이지 컴포넌트는 `pages/`에 배치
- Props 인터페이스를 명확히 정의하고 기본값 제공
- 비즈니스 로직은 커스텀 훅/서비스로 분리

### 문서화
- 복잡한 컴포넌트 Props에 JSDoc 주석 추가
- 커스텀 훅의 입력/반환값 문서화
- README에 컴포넌트 사용 예시 포함

### 명명 규칙
- **컴포넌트**: PascalCase (예: `MapView`, `NavBar`)
- **훅**: `use` 접두사 + camelCase (예: `useMapData`, `useAuth`)
- **변수/함수**: camelCase (예: `mapCenter`, `handleClick`)
- **상수**: UPPER_SNAKE_CASE (예: `DEFAULT_ZOOM`, `API_KEY`)
- **파일**: 컴포넌트와 동일한 PascalCase (예: `MapView.jsx`)

### 코드 스타일
- **들여쓰기**: 2 스페이스
- **세미콜론**: 프로젝트 설정에 따라 일관되게 사용
- **따옴표**: 단일 따옴표(`'`) 또는 JSX의 경우 이중 따옴표(`"`) 일관 사용
- **import 순서**: 외부 라이브러리 → 내부 모듈 → 스타일

### 모범 사례
- 불필요한 리렌더링 방지 (`useMemo`, `useCallback` 적절히 활용)
- 사이드 이펙트는 `useEffect`로 명확히 관리
- 전역 상태는 최소화하고 컴포넌트 지역 상태 우선 사용
- 외부 API 키는 환경변수(`.env`)로 관리
- 테스팅 - Testing Library 기반 컴포넌트 단위 테스트 작성
- 버전 관리 - 명확한 메시지와 함께 자주 커밋


---
*UCS CLI `/init` 명령으로 생성됨 - 2026-04-17 15:27:44*
