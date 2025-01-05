관심기업 기능에 대해서 알려줄게
관심 기업은 특정 회사의 채용공고를 저장하는 기능이다.
관심기업은 여러개의 관심기업을 만들 수 있어.
관심기업은 하나의 관심기업은 하나의 이력서와 연관관계를 가진다.
관심기업은 채용공고 링크를 저장할 수 있어.
관심기업은 지원상태를 관리할 수 있어.
관심기업은 지원상태에 따라 다른 색상으로 표시된다.
추후엔 원티드, blind, 채용공고 사이트 등에서 채용공고 내용을 스크래핑해서 리스트로 제공하고 관심기업 목록에 추가할 수 있어.

wishedCompany model(관심기업 모델)
- id: string
- userid: string
- company: string
- link: string
- resumeId: string
- isJobApplied: boolean
- status: DOCUMENT_SUBMITTED | DOCUMENT_PASSED | DOCUMENT_FAILED | ASSIGNMENT_PASSED | FIRST_INTERVIEW | SECOND_INTERVIEW | FINAL_PASSED | FINAL_FAILED
- description: string
- createdAt: Date
- updatedAt: Date