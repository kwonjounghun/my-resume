import { summarizeRetrospective } from '../summarizeRetrospective';

describe('summarizeRetrospective', () => {
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
    summary: '회고 요약',
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

  it('회고를 성공적으로 요약해야 한다', async () => {
    const response = await summarizeRetrospective(1);

    expect(response).toEqual(mockRetrospective);
    expect(fetch).toHaveBeenCalledWith('/api/retrospectives/1/summarize', {
      method: 'POST',
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

    await expect(summarizeRetrospective(1)).rejects.toThrow(
      'Failed to summarize retrospective'
    );
  });
}); 