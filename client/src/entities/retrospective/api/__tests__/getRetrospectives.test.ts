import { getRetrospectives } from '../getRetrospectives';

describe('회고 목록 조회', () => {
  const mockResponse = {
    retrospectives: [
      {
        id: 1,
        title: '프로젝트 A',
        situation: '상황',
        task: '과제',
        action: '행동',
        result: '결과',
        createdAt: '2024-01-01T00:00:00.000Z',
        updatedAt: '2024-01-01T00:00:00.000Z',
        isPublic: true,
        keywords: ['React', 'TypeScript'],
        summary: '프로젝트 요약',
        company: '회사 A',
        startDate: '2024-01-01',
        endDate: '2024-02-01',
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

  it('회고 목록을 성공적으로 조회해야 한다', async () => {
    const response = await getRetrospectives();
    expect(response).toEqual(mockResponse);
    expect(fetch).toHaveBeenCalledWith('/api/retrospectives', {
      method: 'GET',
    });
  });

  it('필터를 적용하여 회고 목록을 조회해야 한다', async () => {
    const filters = {
      page: 1,
      limit: 10,
      keyword: 'React',
      company: '회사 A',
      startDate: '2024-01-01',
      endDate: '2024-02-01',
      isPublic: true,
    };

    await getRetrospectives(filters);
    const expectedUrl = new URL('/api/retrospectives', window.location.origin);
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

    await expect(getRetrospectives()).rejects.toThrow('Failed to fetch retrospectives');
  });
}); 