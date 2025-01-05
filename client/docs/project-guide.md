회고 기능에 대해서 알려줄게
회고는 여러개의 회고를 만들 수 있어.
회고는 하나의 회고를 여러개의 이력서에 포함시킬 수 있어.
회고의 프로젝트 시작 날짜는 프로젝트 종료 날짜보다 늦을 수 없어.
회고는 공개여부를 설정할 수 있어.
회고 작성 및 수정 페이지에는 회고 요약하기 기능이 제공돼, 하지만 해당 기능은 회고 작성 기능과 별도의 기능으로 생각해줘.

회고 요약 기능에 대해서 알려줄게
회고 요약은 회고의 STAR 내용을 요약한 문장이다. openai의 gpt-4o 모델을 사용해 자동으로 생성한다. 외부 api를 사용해 회고 요약을 생성한다.
STAR 내용은 회고의 situation, task, action, result 항목이다.
STAR 필들가 하나라도 비어있을 경우 회고 요약하기 버튼은 비활성화 된다.
회고 상세 페이지에서 요약 내용이 없을 경우 요약 필드는 노출되지 않는다.
요약을 생성할 때 STAR 내용의 핵심 키워드를 추출해 keywords에 추가한다.
키워드는 최대 10개까지 추가할 수 있어.

project model(회고 모델)
- id: string
- title: string
- situation: string
- task: string
- action: string
- result: string
- createdAt: Date
- updatedAt: Date
- isPublic: boolean
- keywords: string[]
- summary: string
- workExperienceId: string
- startDate: string (YYYY-MM)
- endDate: string (YYYY-MM)
