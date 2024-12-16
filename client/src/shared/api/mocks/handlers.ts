import { http, HttpResponse } from 'msw';

export const handlers = [
  http.get('/api/example', () => {
    return HttpResponse.json({ message: 'Hello from MSW!' });
  }),
];
