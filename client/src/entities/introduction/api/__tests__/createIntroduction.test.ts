import { createIntroduction } from '../createIntroduction';

describe('createIntroduction', () => {
  const mockIntroduction = {
    title: '프론트엔드 개발자 자기소개',
    content: '안녕하세요. 프론트엔드 개발자입니다.',
  };

  const mockResponse = {
    id: 1,
    ...mockIntroduction,
    createdAt: '2024-01-01T00:00:00.000Z',
    updatedAt: '2024-01-01T00:00:00.000Z',
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

  it('자기소개를 성공적으로 등록해야 한다', async () => {
    const response = await createIntroduction(mockIntroduction);

    expect(response).toEqual(mockResponse);
    expect(fetch).toHaveBeenCalledWith('/api/introductions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(mockIntroduction),
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

    await expect(createIntroduction(mockIntroduction)).rejects.toThrow(
      'Failed to create introduction'
    );
  });
}); 