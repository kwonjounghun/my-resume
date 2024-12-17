import { http, HttpResponse } from 'msw';
import { Storage } from '../storage';

const storage = new Storage();

export const resumeHandlers = [
  http.get('/api/resumes', () => {
    const resumes = storage.getResumes();
    return HttpResponse.json({ resumes });
  }),

  http.get('/api/resumes/:id', ({ params }) => {
    const { id } = params;
    const resume = storage.getResume(Number(id));

    if (!resume) {
      return new HttpResponse(
        JSON.stringify({ message: '이력서를 찾을 수 없습니다.' }),
        { status: 404 }
      );
    }

    return HttpResponse.json(resume);
  }),

  http.post('/api/resumes', async ({ request }) => {
    const body = await request.json();
    const resume = storage.addResume(body);
    return HttpResponse.json(resume);
  }),

  http.put('/api/resumes/:id', async ({ params, request }) => {
    const { id } = params;
    const body = await request.json();
    const resume = storage.updateResume(Number(id), body);

    if (!resume) {
      return new HttpResponse(
        JSON.stringify({ message: '이력서를 찾을 수 없습니다.' }),
        { status: 404 }
      );
    }

    return HttpResponse.json(resume);
  }),
]; 