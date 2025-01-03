import { http, HttpResponse } from 'msw';
import { Profile } from '@/entities/profile/model/types';

const STORAGE_KEY = 'mock_profile';

const mockProfile: Profile = {
  id: 1,
  userId: 1,
  name: '홍길동',
  email: 'hong@example.com',
  phone: '010-1234-5678',
  education: [
    {
      schoolName: '서울대학교',
      major: '컴퓨터공학과',
      startDate: '2015.03',
      endDate: '2019.02',
      isAttending: false,
    },
  ],
  skills: [
    {
      name: 'React',
      level: 5,
    },
    {
      name: 'TypeScript',
      level: 4,
    },
  ],
  awards: [
    {
      title: '우수 개발자상',
      date: '2023.12',
      description: '연간 최우수 개발자로 선정',
    },
  ],
  languages: [
    {
      name: '영어',
      level: '상',
      certifications: [
        {
          name: 'TOEIC',
          score: '900',
          date: '2023.01',
        },
      ],
    },
  ],
  links: [
    {
      type: 'Link',
      url: 'https://github.com/hong',
      description: '깃허브',
    },
  ],
  createdAt: '2024-01-01T00:00:00.000Z',
  updatedAt: '2024-01-01T00:00:00.000Z',
};

// 초기 데이터 설정
if (typeof window !== 'undefined' && !localStorage.getItem(STORAGE_KEY)) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(mockProfile));
}

export const profileHandlers = [
  // 프로필 조회
  http.get('/api/profile', () => {
    const profile = localStorage.getItem(STORAGE_KEY);
    if (!profile) {
      return new HttpResponse(null, { status: 404 });
    }
    return HttpResponse.json({ profile: JSON.parse(profile) });
  }),

  // 프로필 생성
  http.post('/api/profile', async ({ request }) => {
    const profile = await request.json() as Partial<Profile>;
    const newProfile = {
      ...mockProfile,
      ...profile,
      id: 1,
      userId: 1,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newProfile));
    return HttpResponse.json({ profile: newProfile }, { status: 201 });
  }),

  // 프로필 수정
  http.put('/api/profile', async ({ request }) => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      return new HttpResponse(null, { status: 404 });
    }

    const updates = await request.json() as Partial<Profile>;
    const existingProfile = JSON.parse(stored) as Profile;
    const updatedProfile = {
      ...existingProfile,
      ...updates,
      updatedAt: new Date().toISOString(),
    };

    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedProfile));
    return HttpResponse.json({ profile: updatedProfile });
  }),

  // 프로필 삭제
  http.delete('/api/profile', () => {
    localStorage.removeItem(STORAGE_KEY);
    return new HttpResponse(null, { status: 204 });
  }),
]; 
