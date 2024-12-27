import { http, HttpResponse } from 'msw';
import { Storage } from '../storage';
import { Retrospective } from '@/entities/retrospective/model/types';

const storage = new Storage();

export const retrospectiveHandlers = [
  http.get('/api/retrospectives', () => {
    const retrospectives = storage.getRetrospectives();
    return HttpResponse.json({ retrospectives });
  }),

  http.get('/api/retrospectives/:id', ({ params }) => {
    const { id } = params;
    if (typeof id !== 'string') {
      return new HttpResponse(null, { status: 400 });
    }
    const retrospective = storage.getRetrospective(id);

    if (!retrospective) {
      return new HttpResponse(
        JSON.stringify({ message: '회고를 찾을 수 없습니다.' }),
        { status: 404 }
      );
    }

    return HttpResponse.json(retrospective);
  }),

  http.post('/api/retrospectives', async ({ request }) => {
    const body = await request.json() as Retrospective;
    const retrospective = storage.addRetrospective(body);
    return HttpResponse.json(retrospective);
  }),

  http.put('/api/retrospectives/:id', async ({ params, request }) => {
    const { id } = params;
    const body = await request.json() as Retrospective;
    if (typeof id !== 'string') {
      return new HttpResponse(null, { status: 400 });
    }
    const retrospective = storage.updateRetrospective(id, body);
    return HttpResponse.json(retrospective);
  }),

  http.delete('/api/retrospectives/:id', ({ params }) => {
    const { id } = params;
    if (typeof id !== 'string') {
      return new HttpResponse(null, { status: 400 });
    }
    storage.deleteRetrospective(id);
    return HttpResponse.json({ message: '회고가 삭제되었습니다.' });
  }),

  http.post('/api/retrospectives/:id/summarize', async ({ params }) => {
    const { id } = params;
    if (typeof id !== 'string') {
      return new HttpResponse(null, { status: 400 });
    }
    const retrospective = storage.getRetrospective(id);

    if (!retrospective) {
      return new HttpResponse(
        JSON.stringify({ message: '회고를 찾을 수 없습니다.' }),
        { status: 404 }
      );
    }

    // 실제로는 OpenAI API를 호출하여 요약을 생성하지만,
    // 여기서는 간단한 요약을 생성합니다.
    const summary = `${retrospective.situation} 황에서 ${retrospective.task}라는 과제를 받아 ${retrospective.action}을 수행하여 ${retrospective.result}를 달성했습니다.`;

    const updatedRetrospective = storage.updateRetrospective(id, {
      ...retrospective,
      summary,
    });

    return HttpResponse.json(updatedRetrospective);
  }),
]; 