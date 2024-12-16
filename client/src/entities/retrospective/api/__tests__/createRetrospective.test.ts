import { createRetrospective } from '../createRetrospective';

describe('createRetrospective', () => {
  const mockRetrospective = {
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
  };

  const mockResponse = {
    id: 1,
    ...mockRetrospective,
    createdAt: '2024-01-01T00:00:00.000Z',
    updatedAt: '2024-01-01T00:00:00.000Z',
    summary: null,
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

  it('회고를 성공적으로 등록해야 한다', async () => {
    const response = await createRetrospective(mockRetrospective);

    expect(response).toEqual(mockResponse);
    expect(fetch).toHaveBeenCalledWith('/api/retrospectives', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(mockRetrospective),
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

    await expect(createRetrospective(mockRetrospective)).rejects.toThrow(
      'Failed to create retrospective'
    );
  });
}); 