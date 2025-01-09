import { updateProfile } from './updateProfile';
import { server } from '@/shared/api/mocks/server';
import { rest } from 'msw';

describe('updateProfile', () => {
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

  it('updates profile when API call is successful', async () => {
    server.use(
      rest.put('/api/profile', async (req, res, ctx) => {
        const body = await req.json();
        expect(body).toEqual(mockRequest);
        return res(ctx.status(200), ctx.json(mockProfile));
      }),
    );

    const profile = await updateProfile(mockRequest);
    expect(profile).toEqual(mockProfile);
  });

  it('throws error when API call fails', async () => {
    server.use(
      rest.put('/api/profile', (req, res, ctx) => {
        return res(ctx.status(500));
      }),
    );

    await expect(updateProfile(mockRequest)).rejects.toThrow();
  });
}); 