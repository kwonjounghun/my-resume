import { http, HttpResponse } from 'msw';
import { Storage } from '../storage';
import { Introduction } from '@/entities/introduction/model/types';

const storage = new Storage();

export const introductionHandlers = [
  http.get('/api/introductions', () => {
    const introductions = storage.getIntroductions();
    return HttpResponse.json({ introductions });
  }),

  http.get('/api/introductions/:id', ({ params }) => {
    const { id } = params;

    if (typeof id !== 'string') {
      return new HttpResponse(null, { status: 400 });
    }

    const introduction = storage.getIntroduction(id);

    if (!introduction) {
      return new HttpResponse(
        JSON.stringify({ message: '자기소개서를 찾을 수 없습니다.' }),
        { status: 404 }
      );
    }

    return HttpResponse.json(introduction);
  }),

  http.post('/api/introductions', async ({ request }) => {
    const body = await request.json() as Introduction;
    const introduction = storage.addIntroduction(body);
    return HttpResponse.json(introduction);
  }),

  http.put('/api/introductions/:id', async ({ params, request }) => {
    const { id } = params;
    const body = await request.json() as Introduction;
    if (typeof id !== 'string') {
      return new HttpResponse(null, { status: 400 });
    }
    const introduction = storage.updateIntroduction(id, body);
    return HttpResponse.json(introduction);
  }),
]; 