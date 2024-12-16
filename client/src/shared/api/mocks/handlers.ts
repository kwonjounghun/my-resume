import { http, HttpResponse } from 'msw';

const mockRetrospectives = [
  {
    id: 1,
    title: '프로젝트 A',
    situation: '상황',
    task: '과제',
    action: '행동',
    result: '결과',
    createdAt: '2024-01-01T00:00:00.000Z',
    updatedAt: '2024-01-01T00:00:00.000Z',
    isPublic: true,
    keywords: ['React', 'TypeScript'],
    summary: '프로젝트 요약',
    company: '회사 A',
    startDate: '2024-01-01',
    endDate: '2024-02-01',
  },
  {
    id: 2,
    title: '프로젝트 B',
    situation: '상황',
    task: '과제',
    action: '행동',
    result: '결과',
    createdAt: '2024-02-01T00:00:00.000Z',
    updatedAt: '2024-02-01T00:00:00.000Z',
    isPublic: true,
    keywords: ['Next.js', 'TypeScript'],
    summary: '프로젝트 요약',
    company: '회사 B',
    startDate: '2024-02-01',
    endDate: '2024-03-01',
  },
];

export const handlers = [
  http.get('/api/example', () => {
    return HttpResponse.json({ message: 'Hello from MSW!' });
  }),

  http.get('/api/retrospectives', ({ request }) => {
    const url = new URL(request.url);
    const page = Number(url.searchParams.get('page')) || 1;
    const limit = Number(url.searchParams.get('limit')) || 10;
    const keyword = url.searchParams.get('keyword');
    const company = url.searchParams.get('company');
    const startDate = url.searchParams.get('startDate');
    const endDate = url.searchParams.get('endDate');
    const isPublic = url.searchParams.get('isPublic');

    let filteredRetrospectives = [...mockRetrospectives];

    if (keyword) {
      filteredRetrospectives = filteredRetrospectives.filter(
        (retro) =>
          retro.title.includes(keyword) ||
          retro.keywords.some((k) => k.includes(keyword))
      );
    }

    if (company) {
      filteredRetrospectives = filteredRetrospectives.filter((retro) =>
        retro.company.includes(company)
      );
    }

    if (startDate) {
      filteredRetrospectives = filteredRetrospectives.filter(
        (retro) => retro.startDate >= startDate
      );
    }

    if (endDate) {
      filteredRetrospectives = filteredRetrospectives.filter(
        (retro) => retro.endDate <= endDate
      );
    }

    if (isPublic !== null) {
      filteredRetrospectives = filteredRetrospectives.filter(
        (retro) => retro.isPublic === (isPublic === 'true')
      );
    }

    const start = (page - 1) * limit;
    const end = start + limit;
    const paginatedRetrospectives = filteredRetrospectives.slice(start, end);

    return HttpResponse.json({
      retrospectives: paginatedRetrospectives,
      total: filteredRetrospectives.length,
    });
  }),
];
