import { getRetrospective } from '../getRetrospective';

describe('getRetrospective', () => {
  const mockRetrospective = {
    id: 1,
    title: '프로젝트 A',
    situation: '상황',
    task: '과제',
    action: '행동',
    result: '결과',
    isPublic: true,
    keywords: ['React', 'TypeScript'],
    company: '회사 A',
    startDate: '2024-01-01',
    endDate: '2024-02-01',
    createdAt: '2024-01-01T00:00:00.000Z',
    updatedAt: '2024-01-01T00:00:00.000Z',
    summary: null,
  };

  beforeEach(() => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockRetrospective),
      })
    ) as jest.Mock;
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('회고를 성공적으로 조회해야 한다', async () => {
    const response = await getRetrospective(1);

    expect(response).toEqual(mockRetrospective);
    expect(fetch).toHaveBeenCalledWith('/api/retrospectives/1');
  });

  it('API 호출이 실패하면 에러를 throw 해야 한다', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: false,
        status: 404,
        statusText: 'Not Found',
      })
    ) as jest.Mock;

    await expect(getRetrospective(1)).rejects.toThrow('Failed to fetch retrospective');
  });
}); 