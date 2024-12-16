import { http, HttpResponse } from 'msw';

export const handlers = [
  // Add your handlers here
  http.get('/api/example', () => {
    return HttpResponse.json({ message: 'Hello from MSW!' });
  }),
];
