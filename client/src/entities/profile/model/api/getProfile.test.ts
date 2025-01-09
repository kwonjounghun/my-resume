import { getProfile } from './getProfile';
import { server } from '@/shared/api/mocks/server';
import { rest } from 'msw';

describe('getProfile', () => {
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

  it('returns profile data when API call is successful', async () => {
    server.use(
      rest.get('/api/profile', (req, res, ctx) => {
        return res(ctx.status(200), ctx.json(mockProfile));
      }),
    );

    const profile = await getProfile();
    expect(profile).toEqual(mockProfile);
  });

  it('throws error when API call fails', async () => {
    server.use(
      rest.get('/api/profile', (req, res, ctx) => {
        return res(ctx.status(500));
      }),
    );

    await expect(getProfile()).rejects.toThrow();
  });
}); 