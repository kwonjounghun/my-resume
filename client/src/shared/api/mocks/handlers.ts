import { http, HttpResponse } from 'msw';
import { storage } from './storage';
import { Retrospective } from '@/entities/retrospective/model/types';

export const handlers = [
  http.get('/api/retrospectives', ({ request }) => {
    const url = new URL(request.url);
    const page = Number(url.searchParams.get('page')) || 1;
    const limit = Number(url.searchParams.get('limit')) || 10;
    const keyword = url.searchParams.get('keyword');
    const company = url.searchParams.get('company');
    const startDate = url.searchParams.get('startDate');
    const endDate = url.searchParams.get('endDate');
    const isPublic = url.searchParams.get('isPublic');

    let retrospectives = storage.getRetrospectives();

    // 필터 적용
    if (keyword) {
      retrospectives = retrospectives.filter(
        (retro) =>
          retro.title.includes(keyword) ||
          retro.keywords.some((k) => k.includes(keyword))
      );
    }

    if (company) {
      retrospectives = retrospectives.filter((retro) =>
        retro.company.includes(company)
      );
    }

    if (startDate) {
      retrospectives = retrospectives.filter(
        (retro) => retro.startDate >= startDate
      );
    }

    if (endDate) {
      retrospectives = retrospectives.filter(
        (retro) => retro.endDate <= endDate
      );
    }

    if (isPublic !== null) {
      retrospectives = retrospectives.filter(
        (retro) => retro.isPublic === (isPublic === 'true')
      );
    }

    // 페이지네이션 적용
    const start = (page - 1) * limit;
    const end = start + limit;
    const paginatedRetrospectives = retrospectives.slice(start, end);

    return HttpResponse.json({
      retrospectives: paginatedRetrospectives,
      total: retrospectives.length,
    });
  }),

  http.get('/api/retrospectives/:id', ({ params }) => {
    const { id } = params;
    const retrospectives = storage.getRetrospectives();
    const retrospective = retrospectives.find((r) => r.id === Number(id));

    if (!retrospective) {
      return new HttpResponse(null, { status: 404 });
    }

    return HttpResponse.json(retrospective);
  }),

  http.post('/api/retrospectives', async ({ request }) => {
    const retrospective = (await request.json()) as Omit<
      Retrospective,
      'id' | 'createdAt' | 'updatedAt'
    >;

    const newRetrospective = storage.addRetrospective(retrospective);

    return HttpResponse.json(newRetrospective, { status: 201 });
  }),

  http.put('/api/retrospectives/:id', async ({ params, request }) => {
    const { id } = params;
    const data = (await request.json()) as Partial<Retrospective>;

    const updatedRetrospective = storage.updateRetrospective(Number(id), data);

    if (!updatedRetrospective) {
      return new HttpResponse(null, { status: 404 });
    }

    return HttpResponse.json(updatedRetrospective);
  }),

  http.delete('/api/retrospectives/:id', ({ params }) => {
    const { id } = params;
    const success = storage.deleteRetrospective(Number(id));

    if (!success) {
      return new HttpResponse(null, { status: 404 });
    }

    return new HttpResponse(null, { status: 204 });
  }),
];
