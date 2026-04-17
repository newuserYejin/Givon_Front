# 프로젝트 요약

## 개요

- 프로젝트명: Givon_front
- 기술 스택: Node.js, React, TypeScript, Vite
- 자동 생성 여부: UCS CLI에 의해 자동 생성됨
- 구조 정보: 51 파일 / 11 디렉토리
- 경로: D:\codex_test\Givon_front


## 빌드 및 실행

- 의존성 설치: npm install
- 개발 서버 실행: npm run dev
- 프로덕션 빌드: npm run build


## 프로젝트 구조

- 디렉토리 구조: `src/` 폴더 사용
- 포함 파일 개수: 총 35개 파일 존재


## 애플리케이션 아키텍처

*   **Goal:** Summarize key technical details from the provided "Starting Process," "Architecture Layers," and "Key Components" sections.
*   **Constraints Check:**
    *   No greetings/preambles.
    *   Use only bullet points and concise phrases (no full sentences).
    *   Extract core info: Stack, build commands, main files/classes, architecture patterns.
    *   No Markdown headers (use bullets instead).
    *   No code blocks.
    *   Must be in Korean.
    *   Max 10 lines.

*   **Extraction & Structuring:**
    *   Process: npm install -> Vite Dev Server Start -> index.html → main.tsx/js -> Router Initialization.
    *   Architecture: Component-Based (React).
    *   Layers: Pages (Routing/Data Fetching), Components (Reusable UI, Props), Services/Hooks (API Logic, Custom Hooks).
    *   Key Files: pages/, components/, hooks/, api/, routes/, types/.

*   **Refining and Condensing (Self-Correction during drafting):** Need to ensure the flow is highly concise. Grouping layers and file counts into general points will save space while retaining depth.

*   **Final Polish:** Check against all constraints one last time. (Korean, bullets only, technical focus).- 시작 순서: npm install → Vite Dev Server 구동 → index.html/main.tsx 진입
- 아키텍처 패턴: React 기반 컴포넌트 지향 구조
- 레이어 구성:
    - 페이지 계층: 라우팅 및 데이터 패칭 담당
    - 컴포넌트 계층: 재사용 가능한 UI 요소 정의
    - 서비스/훅 계층: API 통신 및 비즈니스 로직 캡슐화
- 핵심 모듈별 역할 분리:
    - pages/: 페이지 단위 컴포넌트 (라우팅)
    - components/: 공통 UI 라이브러리
    - hooks/: 재사용 가능한 상태/로직 처리
    - api/: API 클라이언트 및 엔드포인트 관리


## 상세 소스 파일 분석

*   **API 계층:** 인증, 클라이언트 통신(`client.ts`), 조직 관리(`orgs.ts`), 사용자 API 정의 및 구현 포함.
*   **컴포넌트:** UI 구성 요소 (`DonationItemSelector`, `OrganizationCard`, `PageShell`, `StatusTimeline`) 사용.
*   **훅스 (Hooks):** 인증, 기부 로직, 조직/사용자 상태 관리(`useAuth`, `useDonateToOrganization`, `useUsers` 등) 담당.
*   **페이지:** 라우팅에 따른 주요 뷰 구성 (`Home`, `Login`, `MyPage`, Admin 대시보드 등).
*   **라우터:** 애플리케이션 전역 라우팅 및 보호 로직(`AppRouter`, `RouteGuards`) 구현.
*   **타입/상수:** 인증, 기부, 사용자 데이터 구조 정의 (`types/`), 유효성 검사 규칙 포함 (`constants/`).
*   **루트:** 애플리케이션 진입점 (`main.tsx`, `App.tsx`) 설정.API 계층: 인증(`auth.ts`), 클라이언트 통신, 조직 및 사용자 API 관리.
컴포넌트: 재사용 가능한 UI 요소 (예: `OrganizationCard`, `StatusTimeline`).
훅스: 상태 로직 캡슐화 (`useAuth`, `useOrganizations` 등).
페이지: 주요 화면 컴포넌트 구조 정의 (e.g., Home, Login, Admin 대시보드).
라우터: 전역 경로 설정 및 접근 제어(`AppRouter`, `RouteGuards`).
타입/상수: 데이터 모델링 및 비즈니스 규칙 (`user.ts`, `authValidation.ts`).
진입점: 애플리케이션 초기화 파일 (`main.tsx`, `App.tsx`).


## 작업 및 기능 분류

*   UI/컴포넌트: React 컴포넌트 트리 렌더링, 이벤트 처리, 상태 관리 (로컬/전역), 클라이언트 라우팅.
*   데이터 통신: REST API 연동, Promise/async-await 기반 비동기 데이터 패칭, 서버 응답 캐싱 및 동기화.
*   빌드/배포: HMR 지원 개발 서버, 코드 분할 및 트리 쉐이킹 번들링, 정적 자산 압축, CDN/서버 배포.
*   테스트/품질: 컴포넌트/훅 단위 테스트, 사용자 시나리오 기반 E2E 통합 테스트, ARIA 속성 검증을 통한 접근성 확보.- UI/컴포넌트: React 렌더링, 이벤트 처리, 상태 관리(전역 포함), 클라이언트 사이드 라우팅
- 데이터 통신: REST API 연동, Promise/async-await 비동기 패칭, 서버 응답 캐싱 및 동기화
- 빌드/배포: HMR 개발 서버, 코드 분할/트리 쉐이킹 번들링, 정적 자산 압축, CDN/서버 배포 프로세스
- 테스트/품질: 컴포넌트/훅 단위 테스트, 사용자 시나리오 E2E 통합 테스트, ARIA 속성 검증 기반 접근성 확보


## 기술 스택

*   **Goal:** Summarize the core content of the provided project documentation section (Framework/Build Tools, Dependencies).
*   **Constraints Checklist & Confidence Score:**
    1.  No introductory phrases: Yes
    2.  No narrative sentences: Yes
    3.  Use bullet points and concise phrasing: Yes
    4.  Extract core info (tech stack, build commands, key files/classes, architecture): Yes (Focus on tech stack/dependencies here)
    5.  No markdown headers (use bullets): Yes
    6.  No code blocks: Yes
    7.  Must be in Korean: Yes
    8.  Max 10 lines: Yes

*   **Execution Plan:** Extract listed technologies and key libraries into a bulleted, concise list format.- 프레임워크/도구: Node.js, React, TypeScript, Vite
- 주요 라이브러리: antd (UI 컴포넌트), react-query (데이터 상태 관리), axios (HTTP 클라이언트)
- 라우팅: react-router-dom
- 스타일링/유틸리티: tailwindcss, autoprefixer, postcss
- 개발 환경 의존성: typescript, vite 플러그인 포함


## 코딩 표준 및 모범 사례

요약할 내용의 핵심 요소를 식별하고, 주어진 규칙에 맞춰 재구성한다.

**규칙 검토:**
1. 인사말/전제 문장 제거: O
2. 서술형 문장 금지 (불릿 포인트/간결 구문만): O
3. 핵심 정보 추출 (스택, 빌드명령, 파일/클래스, 아키텍처 패턴 등): O
4. 헤더 사용 금지 (불릿 포인트로 대체): O
5. 코드 블록 사용 금지: O
6. 한국어 작성: O
7. 최대 10줄 이내: O

**핵심 내용 추출 및 구조화:**
*   컴포넌트 구조: 단일 책임 원칙 준수 (pages/, components/)
*   로직 분리: 커스텀 훅/서비스 사용
*   문서화: JSDoc, Props 명세화, README 예시 필수
*   명명 규칙: PascalCase(컴포넌트), usePrefix(훅), camelCase(변수/함수), UPPER_SNAKE_CASE(상수)
*   스타일링: 2 스페이스 들여쓰기, 일관된 따옴표 사용, import 순서 준수
*   모범 사례: useMemo/useCallback 활용, useEffect로 사이드 이펙트 관리, 환경변수로 API 키 관리, Testing Library 기반 테스트 작성

**최종 요약 (10줄 제한 고려):**- 컴포넌트 구조화: 단일 책임 원칙 준수. pages/, components/ 분리 배치
- 로직 분리: 비즈니스 로직은 커스텀 훅 또는 서비스 레이어로 분리
- 문서화: Props에 JSDoc 주석 필수; README에 사용 예시 포함
- 명명 규칙: 컴포넌트는 PascalCase, 훅은 usePrefix, 상수는 UPPER_SNAKE_CASE 준수
- 코드 스타일: 들여쓰기 2 스페이스. import 순서(외부→내부→스타일) 일관 유지
- 모범 사례: 불필요 리렌더링 방지 (useMemo/useCallback). 사이드 이펙트는 useEffect 사용
- 보안: API 키는 환경변수(.env) 관리 필수
- 테스트/배포: Testing Library 기반 단위 테스트 작성. 커밋 메시지 명확화


