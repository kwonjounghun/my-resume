profile model(프로필 모델)
- id: string
- userid: string
- name: string
- email: string
- phone: string
- links: Link[]
- educations: Education[]
- skills: Skill[]
- awards: Award[]
- certifications: Certification[]
- createdAt: Date
- updatedAt: Date

link model(링크 모델)
- type: string (LINK | GITHUB | INSTAGRAM | TWITTER | FACEBOOK | YOUTUBE | LINKEDIN | OTHER)
- url: string
- description: string

education model(학력 모델)
- schoolName: string
- major: string
- startDate: string (YYYY-MM)
- endDate: string (YYYY-MM)
- isAttending: boolean

skill model(기술 모델)
- name: string
- level: string (BEGINNER | INTERMEDIATE | ADVANCED | EXPERT)
- description: string

award model(수상 모델)
- name: string
- date: string (YYYY-MM)
- description: string

certification model(자격증 모델)
- name: string
- date: string (YYYY-MM)
- description: string