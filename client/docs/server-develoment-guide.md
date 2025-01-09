# 기술 스택
- 언어: TypeScript
- 프레임워크: Nest.js
- 테스트: jest
- 모듈 관리: pnpm
- 코드 포맷: Prettier
- 코드 규칙: ESLint
- 버전 관리: git
- 문서화: Swagger
- 빌드: github actions
- 배포: github actions
- 서버: AWS EC2
- 데이터베이스: mongodb cloud
- 인증: jwt
- 인증 저장소: redis

# 프로젝트 아키텍처
- /server 를 root로 하여 프로젝트를 구성
- 프로젝트 아키텍쳐는 클린아키텍쳐를 따름

# 데이터베이스
- 데이터베이스는 mongodb cloud를 사용합니다.
- 개발 환경에서는 로컬 데이터베이스를 사용합니다.
- 프로덕션 환경에서는 클라우드 데이터베이스를 사용합니다.
