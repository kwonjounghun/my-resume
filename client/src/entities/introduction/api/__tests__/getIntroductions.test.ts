import { getIntroductions } from '../getIntroductions';

describe('getIntroductions', () => {
  const mockResponse = {
    introductions: [
      {
        id: 1,
        title: '프론트엔드 개발자 자기소개',
        content: '안녕하세요. 프론트엔드 개발자입니다.',
        createdAt: '2024-01-01T00:00:00.000Z',
        updatedAt: '2024-01-01T00:00:00.000Z',
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

  it('자기소개 목록을 성공적으로 조회해야 한다', async () => {
    const response = await getIntroductions();
    expect(response).toEqual(mockResponse);
    expect(fetch).toHaveBeenCalledWith('/api/introductions', {
      method: 'GET',
    });
  });

  it('필터를 적용하여 자기소개 목록을 조회해야 한다', async () => {
    const filters = {
      page: 1,
      limit: 10,
      keyword: '프론트엔드',
    };

    await getIntroductions(filters);
    const expectedUrl = new URL('/api/introductions', window.location.origin);
    Object.entries(filters).forEach(([key, value]) => {
      expectedUrl.searchParams.append(key, String(value));
    });

    expect(fetch).toHaveBeenCalledWith(expectedUrl.pathname + expectedUrl.search, {
      method: 'GET',
    });
  });

  it('API 호출이 실패하면 에러를 throw 해야 한다', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: false,
        status: 500,
        statusText: 'Internal Server Error',
      })
    ) as jest.Mock;

    await expect(getIntroductions()).rejects.toThrow('Failed to fetch introductions');
  });
}); 