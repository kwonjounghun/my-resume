이력서 기능에 대해 알려줄게
이력서는 여러개의 이력서를 만들 수 있어.
이력서는 내회고들중에 몇가지를 선택해서 이력서에 포함시킬 수 있어
회고중에 요약 내용이 없는 회고는 선택 리스트에 노출되지 않아.
이력서는 하나의 자기소개를 포함할 수 있어. 내 자기소개들중 하나를 선택할 수 있어
이력서 상세 페이지에서 해당 이력서를 참조하는 관심기업 목록을 포함할 수 있어. 이력서 수정 페이지에서는 관심 기업 목록은 노출되지 않아.
이력서는 공개여부를 설정할 수 있어

resume model(이력서 모델)
- id: string
- userid: string
- selfIntroductionId: string
- profileId: string
- title: string
- content: string
- createdAt: Date
- updatedAt: Date
- isPublic: boolean
- projects: string[]
- companyWishlist: string[]
