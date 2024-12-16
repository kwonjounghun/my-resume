import { rest } from 'msw';
import { storage } from './storage';

// Resume handlers
export const resumeHandlers = [
  rest.get('/api/resumes', (req, res, ctx) => {
    const resumes = storage.getResumes();
    return res(ctx.json({ resumes }));
  }),

  rest.get('/api/resumes/:id', (req, res, ctx) => {
    const { id } = req.params;
    const resume = storage.getResume(Number(id));

    if (!resume) {
      return res(
        ctx.status(404),
        ctx.json({ message: '이력서를 찾을 수 없습니다.' })
      );
    }

    return res(ctx.json(resume));
  }),

  rest.post('/api/resumes', (req, res, ctx) => {
    const resume = storage.createResume(req.body);
    return res(ctx.json(resume));
  }),
];

// Introduction handlers
export const introductionHandlers = [
  rest.get('/api/introductions', (req, res, ctx) => {
    const introductions = storage.getIntroductions();
    return res(ctx.json({ introductions }));
  }),

  rest.get('/api/introductions/:id', (req, res, ctx) => {
    const { id } = req.params;
    const introduction = storage.getIntroduction(Number(id));

    if (!introduction) {
      return res(
        ctx.status(404),
        ctx.json({ message: '자기소개서를 찾을 수 없습니다.' })
      );
    }

    return res(ctx.json(introduction));
  }),

  rest.post('/api/introductions', (req, res, ctx) => {
    const introduction = storage.createIntroduction(req.body);
    return res(ctx.json(introduction));
  }),

  rest.put('/api/introductions/:id', (req, res, ctx) => {
    const { id } = req.params;
    const introduction = storage.updateIntroduction(Number(id), req.body);
    return res(ctx.json(introduction));
  }),
];

// Retrospective handlers
export const retrospectiveHandlers = [
  rest.get('/api/retrospectives', (req, res, ctx) => {
    const retrospectives = storage.getRetrospectives();
    return res(ctx.json({ retrospectives }));
  }),

  rest.get('/api/retrospectives/:id', (req, res, ctx) => {
    const { id } = req.params;
    const retrospective = storage.getRetrospective(Number(id));

    if (!retrospective) {
      return res(
        ctx.status(404),
        ctx.json({ message: '회고를 찾을 수 없습니다.' })
      );
    }

    return res(ctx.json(retrospective));
  }),

  rest.post('/api/retrospectives', (req, res, ctx) => {
    const retrospective = storage.createRetrospective(req.body);
    return res(ctx.json(retrospective));
  }),

  rest.put('/api/retrospectives/:id', (req, res, ctx) => {
    const { id } = req.params;
    const retrospective = storage.updateRetrospective(Number(id), req.body);
    return res(ctx.json(retrospective));
  }),

  rest.delete('/api/retrospectives/:id', (req, res, ctx) => {
    const { id } = req.params;
    storage.deleteRetrospective(Number(id));
    return res(ctx.json({ message: '회고가 삭제되었습니다.' }));
  }),

  rest.post('/api/retrospectives/:id/summarize', (req, res, ctx) => {
    const { id } = req.params;
    const retrospective = storage.getRetrospective(Number(id));

    if (!retrospective) {
      return res(
        ctx.status(404),
        ctx.json({ message: '회고를 찾을 수 없습니다.' })
      );
    }

    // 실제로는 OpenAI API를 호출하여 요약을 생성하지만,
    // 여기서는 간단한 요약을 생성합니다.
    const summary = `${retrospective.situation} 상황에서 ${retrospective.task}라는 과제를 받아 ${retrospective.action}을 수행하여 ${retrospective.result}를 달성했습니다.`;

    const updatedRetrospective = storage.updateRetrospective(Number(id), {
      ...retrospective,
      summary,
    });

    return res(ctx.json(updatedRetrospective));
  }),
];

export const handlers = [
  ...resumeHandlers,
  ...introductionHandlers,
  ...retrospectiveHandlers,
];
