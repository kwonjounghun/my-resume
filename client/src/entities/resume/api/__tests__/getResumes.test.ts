import { getResumes } from '../getResumes';

describe('이력서 목록 조회', () => {
  const mockResponse = {
    resumes: [
      {
        id: 1,
        userId: 1,
        selfIntroductionId: 1,
        title: '프론트엔드 개발자 이력서',
        content: '이력서 내용',
        createdAt: '2024-01-01T00:00:00.000Z',
        updatedAt: '2024-01-01T00:00:00.000Z',
        isPublic: true,
        projects: [1, 2],
        companyWishlist: [1],
      },
    ],
    total: 1,
  };

  beforeEach(() => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockResponse),
      })
    ) as jest.Mock;
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('이력서 목록을 성공적으로 조회해야 한다', async () => {
    const response = await getResumes();
    expect(response).toEqual(mockResponse);
    expect(fetch).toHaveBeenCalledWith('/api/resumes', {
      method: 'GET',
    });
  });

  it('필터를 적용하여 이력서 목록을 조회해야 한다', async () => {
    const filters = {
      page: 1,
      limit: 10,
      keyword: '프론트엔드',
      isPublic: true,
    };

    await getResumes(filters);
    const expectedUrl = new URL('/api/resumes', window.location.origin);
    Object.entries(filters).forEach(([key, value]) => {
      expectedUrl.searchParams.append(key, String(value));
    });

    expect(fetch).toHaveBeenCalledWith(expectedUrl.pathname + expectedUrl.search, {
      method: 'GET',
    });
  });

  it('API 호출이 실패하면 에러를 반환해야 한다', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: false,
        status: 500,
        statusText: '서버 에러',
      })
    ) as jest.Mock;

    await expect(getResumes()).rejects.toThrow('Failed to fetch resumes');
  });
}); 