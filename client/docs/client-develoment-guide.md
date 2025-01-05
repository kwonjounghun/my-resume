# 기술 스택
- 언어: TypeScript
- 프레임워크: Next.js
- 상태 관리: Zustand, react-query
- mocking: msw
- 스타일: Emotion, chakra-ui
- 폼 관리: React Hook Form
- 라우팅: Next.js pages router
- 테스트: React Testing Library, Playwright, jest
- 모듈 관리: pnpm
- 코드 포맷: Prettier
- 코드 규칙: ESLint
- 버전 관리: git
- 문서화: Storybook
- 빌드: Vercel
- 배포: Vercel

# 프로젝트 구조
- 프로젝트는 FSD 구조를 따름
- /client 를 root로 하여 프로젝트를 구성
- /client/pages 에 next.js router 페이지를 구성
- /client/src/pages: 페이지 관련 컴포넌트
- /client/src/widgets: 위젯 관련 컴포넌트
- /client/src/features: 기능 관련 컴포넌트
- /client/src/entities: 엔티티 관련 컴포넌트
- /client/src/shared: 공통 컴포넌트
- /client/src/styles: 스타일 관련 파일

# storybook
- /client/stories: storybook 관련 컴포넌트

# api
- api는 환경에 따라 host를 다르게 사용합니다.
  - 개발 환경(msw): http://localhost:3000
  - 개발 환경(dev server): http://localhost:8080
  - 프로덕션 환경: https://api.jonghun-resume-builder.com
- msw 사용 시 mock 데이터는 LocalStorage에 저장됩니다.

# Test
- component test중 특정 스타일이나 classname을 이용한 테스트인 경우 @emotion/jest를 사용해 snapshot 테스트를 진행합니다.
- 함수나 기능의 test는 jest를 사용해 진행합니다.