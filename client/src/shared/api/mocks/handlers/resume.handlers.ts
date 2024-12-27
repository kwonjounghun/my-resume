import { http, HttpResponse } from 'msw';
import { Storage } from '../storage';
import { Resume } from '@/entities/resume/model/types';

const storage = new Storage();

export const resumeHandlers = [
  http.get('/api/resumes', () => {
    const resumes = storage.getResumes();
    return HttpResponse.json({ resumes });
  }),

  http.get('/api/resumes/:id', ({ params }) => {
    const { id } = params;
    if (typeof id !== 'string') {
      return new HttpResponse(null, { status: 400 });
    }
    const resume = storage.getResume(id);

    if (!resume) {
      return new HttpResponse(
        JSON.stringify({ message: '이력서를 찾을 수 없습니다.' }),
        { status: 404 }
      );
    }

    return HttpResponse.json(resume);
  }),

  http.post('/api/resumes', async ({ request }) => {
    const body = await request.json() as Resume;
    const resume = storage.addResume(body);
    return HttpResponse.json(resume);
  }),

  http.put('/api/resumes/:id', async ({ params, request }) => {
    const { id } = params;
    const body = await request.json() as Resume;
    if (typeof id !== 'string') {
      return new HttpResponse(null, { status: 400 });
    }
    const resume = storage.updateResume(id, body);

    if (!resume) {
      return new HttpResponse(
        JSON.stringify({ message: '이력서를 찾을 수 없습니다.' }),
        { status: 404 }
      );
    }

    return HttpResponse.json(resume);
  }),
]; 