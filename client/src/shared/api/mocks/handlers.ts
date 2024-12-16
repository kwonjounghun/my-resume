import { http, HttpResponse } from 'msw';
import { storage } from './storage';
import { Retrospective } from '@/entities/retrospective/model/types';
import { Introduction } from '@/entities/introduction/model/types';

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

  http.post('/api/retrospectives/:id/summarize', async ({ params }) => {
    const { id } = params;
    const retrospectives = storage.getRetrospectives();
    const retrospective = retrospectives.find((r) => r.id === Number(id));

    if (!retrospective) {
      return new HttpResponse(null, { status: 404 });
    }

    // 실제로는 OpenAI API를 호출하여 요약을 생성하지만,
    // 여기서는 간단한 요약을 생성합니다.
    const summary = `${retrospective.situation} 상황에서 ${retrospective.task}라는 과제를 받아 ${retrospective.action}을 수행하�� ${retrospective.result}를 달성했습니다.`;

    const updatedRetrospective = storage.updateRetrospective(Number(id), {
      ...retrospective,
      summary,
    });

    return HttpResponse.json(updatedRetrospective);
  }),

  http.get('/api/introductions', ({ request }) => {
    const url = new URL(request.url);
    const page = Number(url.searchParams.get('page')) || 1;
    const limit = Number(url.searchParams.get('limit')) || 10;
    const keyword = url.searchParams.get('keyword');

    let introductions = storage.getIntroductions();

    // 필터 적용
    if (keyword) {
      introductions = introductions.filter(
        (intro) =>
          intro.title.includes(keyword) ||
          intro.content.includes(keyword)
      );
    }

    // 페이지네이션 적용
    const start = (page - 1) * limit;
    const end = start + limit;
    const paginatedIntroductions = introductions.slice(start, end);

    return HttpResponse.json({
      introductions: paginatedIntroductions,
      total: introductions.length,
    });
  }),

  http.get('/api/introductions/:id', ({ params }) => {
    const { id } = params;
    const introductions = storage.getIntroductions();
    const introduction = introductions.find((i) => i.id === Number(id));

    if (!introduction) {
      return new HttpResponse(null, { status: 404 });
    }

    return HttpResponse.json(introduction);
  }),

  http.post('/api/introductions', async ({ request }) => {
    const introduction = (await request.json()) as Omit<
      Introduction,
      'id' | 'createdAt' | 'updatedAt'
    >;

    const newIntroduction = storage.addIntroduction(introduction);

    return HttpResponse.json(newIntroduction, { status: 201 });
  }),

  http.put('/api/introductions/:id', async ({ params, request }) => {
    const { id } = params;
    const data = (await request.json()) as Partial<Introduction>;

    const updatedIntroduction = storage.updateIntroduction(Number(id), data);

    if (!updatedIntroduction) {
      return new HttpResponse(null, { status: 404 });
    }

    return HttpResponse.json(updatedIntroduction);
  }),

  http.delete('/api/introductions/:id', ({ params }) => {
    const { id } = params;
    const success = storage.deleteIntroduction(Number(id));

    if (!success) {
      return new HttpResponse(null, { status: 404 });
    }

    return new HttpResponse(null, { status: 204 });
  }),

  http.get('/api/resumes', ({ request }) => {
    const url = new URL(request.url);
    const page = Number(url.searchParams.get('page')) || 1;
    const limit = Number(url.searchParams.get('limit')) || 10;
    const keyword = url.searchParams.get('keyword');
    const isPublic = url.searchParams.get('isPublic');

    let resumes = storage.getResumes();

    // 필터 적용
    if (keyword) {
      resumes = resumes.filter(
        (resume) =>
          resume.title.includes(keyword) ||
          resume.content.includes(keyword)
      );
    }

    if (isPublic !== null) {
      resumes = resumes.filter(
        (resume) => resume.isPublic === (isPublic === 'true')
      );
    }

    // 페이지네이션 적용
    const start = (page - 1) * limit;
    const end = start + limit;
    const paginatedResumes = resumes.slice(start, end);

    return HttpResponse.json({
      resumes: paginatedResumes,
      total: resumes.length,
    });
  }),

  http.get('/api/resumes/:id', ({ params }) => {
    const { id } = params;
    const resumes = storage.getResumes();
    const resume = resumes.find((r) => r.id === Number(id));

    if (!resume) {
      return new HttpResponse(null, { status: 404 });
    }

    return HttpResponse.json(resume);
  }),

  http.post('/api/resumes', async ({ request }) => {
    const resume = await request.json();
    const newResume = storage.addResume(resume);
    return HttpResponse.json(newResume, { status: 201 });
  }),

  http.put('/api/resumes/:id', async ({ params, request }) => {
    const { id } = params;
    const data = await request.json();
    const updatedResume = storage.updateResume(Number(id), data);

    if (!updatedResume) {
      return new HttpResponse(null, { status: 404 });
    }

    return HttpResponse.json(updatedResume);
  }),

  http.delete('/api/resumes/:id', ({ params }) => {
    const { id } = params;
    const success = storage.deleteResume(Number(id));

    if (!success) {
      return new HttpResponse(null, { status: 404 });
    }

    return new HttpResponse(null, { status: 204 });
  }),
];
