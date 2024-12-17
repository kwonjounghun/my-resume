import { http, HttpResponse } from 'msw';
import { Storage } from './storage';

const storage = new Storage();

// Company wishlist handlers
export const companyWishlistHandlers = [
  http.get('/api/company-wishlist', () => {
    const companyWishlists = storage.getCompanyWishlists();
    return HttpResponse.json({
      companyWishlists,
      total: companyWishlists.length,
    });
  }),

  http.get('/api/company-wishlist/:id', ({ params }) => {
    const { id } = params;
    const companyWishlist = storage.getCompanyWishlist(Number(id));
    if (!companyWishlist) {
      return new HttpResponse(null, { status: 404 });
    }
    return HttpResponse.json(companyWishlist);
  }),

  http.put('/api/company-wishlist/:id', async ({ params, request }) => {
    const { id } = params;
    const data = await request.json();
    const companyWishlist = storage.updateCompanyWishlist(Number(id), {
      ...data,
      updatedAt: new Date().toISOString(),
    });
    if (!companyWishlist) {
      return new HttpResponse(null, { status: 404 });
    }
    return HttpResponse.json(companyWishlist);
  }),

  http.delete('/api/company-wishlist/:id', ({ params }) => {
    const { id } = params;
    const success = storage.deleteCompanyWishlist(Number(id));
    if (!success) {
      return new HttpResponse(null, { status: 404 });
    }
    return new HttpResponse(null, { status: 204 });
  }),

  http.post('/api/company-wishlist', async ({ request }) => {
    const data = await request.json();
    const companyWishlist = storage.addCompanyWishlist({
      ...data,
      id: Date.now(),
      isJobApplied: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
    return HttpResponse.json(companyWishlist);
  }),
];

// Resume handlers
export const resumeHandlers = [
  http.get('/api/resumes', ({ request }) => {
    const resumes = storage.getResumes();
    return Response.json({ resumes });
  }),

  http.get('/api/resumes/:id', ({ params }) => {
    const { id } = params;
    const resume = storage.getResume(Number(id));

    if (!resume) {
      return new Response(
        JSON.stringify({ message: '이력서를 찾을 수 없습니다.' }),
        { status: 404 }
      );
    }

    return Response.json(resume);
  }),

  http.post('/api/resumes', async ({ request }) => {
    const body = await request.json();
    const resume = storage.addResume(body);
    return Response.json(resume);
  }),

  http.put('/api/resumes/:id', async ({ params, request }) => {
    const { id } = params;
    const body = await request.json();
    const resume = storage.updateResume(Number(id), body);

    if (!resume) {
      return new Response(
        JSON.stringify({ message: '이력서를 찾을 수 없습니다.' }),
        { status: 404 }
      );
    }

    return Response.json(resume);
  }),
];

// Introduction handlers
export const introductionHandlers = [
  http.get('/api/introductions', ({ request }) => {
    const introductions = storage.getIntroductions();
    return Response.json({ introductions });
  }),

  http.get('/api/introductions/:id', ({ params }) => {
    const { id } = params;
    const introduction = storage.getIntroduction(Number(id));

    if (!introduction) {
      return new Response(
        JSON.stringify({ message: '자기소개서를 찾을 수 없습니다.' }),
        { status: 404 }
      );
    }

    return Response.json(introduction);
  }),

  http.post('/api/introductions', async ({ request }) => {
    const body = await request.json();
    const introduction = storage.addIntroduction(body);
    return Response.json(introduction);
  }),

  http.put('/api/introductions/:id', async ({ params, request }) => {
    const { id } = params;
    const body = await request.json();
    const introduction = storage.updateIntroduction(Number(id), body);
    return Response.json(introduction);
  }),
];

// Retrospective handlers
export const retrospectiveHandlers = [
  http.get('/api/retrospectives', ({ request }) => {
    const retrospectives = storage.getRetrospectives();
    return Response.json({ retrospectives });
  }),

  http.get('/api/retrospectives/:id', ({ params }) => {
    const { id } = params;
    const retrospective = storage.getRetrospective(Number(id));

    if (!retrospective) {
      return new Response(
        JSON.stringify({ message: '회고를 찾을 수 없습니다.' }),
        { status: 404 }
      );
    }

    return Response.json(retrospective);
  }),

  http.post('/api/retrospectives', async ({ request }) => {
    const body = await request.json();
    const retrospective = storage.addRetrospective(body);
    return Response.json(retrospective);
  }),

  http.put('/api/retrospectives/:id', async ({ params, request }) => {
    const { id } = params;
    const body = await request.json();
    const retrospective = storage.updateRetrospective(Number(id), body);
    return Response.json(retrospective);
  }),

  http.delete('/api/retrospectives/:id', ({ params }) => {
    const { id } = params;
    storage.deleteRetrospective(Number(id));
    return Response.json({ message: '회고가 삭제되었습니다.' });
  }),

  http.post('/api/retrospectives/:id/summarize', async ({ params }) => {
    const { id } = params;
    const retrospective = storage.getRetrospective(Number(id));

    if (!retrospective) {
      return new Response(
        JSON.stringify({ message: '회고를 찾을 수 없습니다.' }),
        { status: 404 }
      );
    }

    // 실제로는 OpenAI API를 호출하여 요약을 생성하지만,
    // 여기서는 간단한 요약을 생성합니다.
    const summary = `${retrospective.situation} 황에서 ${retrospective.task}라는 과제를 받아 ${retrospective.action}을 수행하여 ${retrospective.result}를 달성했습니다.`;

    const updatedRetrospective = storage.updateRetrospective(Number(id), {
      ...retrospective,
      summary,
    });

    return Response.json(updatedRetrospective);
  }),
];

export const handlers = [
  ...resumeHandlers,
  ...introductionHandlers,
  ...retrospectiveHandlers,
  ...companyWishlistHandlers,
];
