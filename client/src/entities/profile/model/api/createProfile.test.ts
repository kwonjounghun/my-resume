import { createProfile } from './createProfile';
import { server } from '@/shared/api/mocks/server';
import { rest } from 'msw';

describe('createProfile', () => {
  const mockProfile = {
    id: 1,
    name: '홍길동',
    email: 'hong@example.com',
    phone: '010-1234-5678',
    education: [],
    skills: [],
    awards: [],
    languages: [],
    links: [],
  };

  const mockRequest = {
    name: '홍길동',
    email: 'hong@example.com',
    phone: '010-1234-5678',
    education: [],
    skills: [],
    awards: [],
    languages: [],
    links: [],
  };

  it('creates profile when API call is successful', async () => {
    server.use(
      rest.post('/api/profile', async (req, res, ctx) => {
        const body = await req.json();
        expect(body).toEqual(mockRequest);
        return res(ctx.status(201), ctx.json(mockProfile));
      }),
    );

    const profile = await createProfile(mockRequest);
    expect(profile).toEqual(mockProfile);
  });

  it('throws error when API call fails', async () => {
    server.use(
      rest.post('/api/profile', (req, res, ctx) => {
        return res(ctx.status(500));
      }),
    );

    await expect(createProfile(mockRequest)).rejects.toThrow();
  });
}); 