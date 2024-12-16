import { getIntroduction } from '../getIntroduction';

describe('getIntroduction', () => {
  const mockIntroduction = {
    id: 1,
    title: '프론트엔드 개발자 자기소개',
    content: '안녕하세요. 프론트엔드 개발자입니다.',
    createdAt: '2024-01-01T00:00:00.000Z',
    updatedAt: '2024-01-01T00:00:00.000Z',
  };

  beforeEach(() => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockIntroduction),
      })
    ) as jest.Mock;
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('자기소개를 성공적으로 조회해야 한다', async () => {
    const response = await getIntroduction(1);

    expect(response).toEqual(mockIntroduction);
    expect(fetch).toHaveBeenCalledWith('/api/introductions/1');
  });

  it('API 호출이 실패하면 에러를 throw 해야 한다', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: false,
        status: 404,
        statusText: 'Not Found',
      })
    ) as jest.Mock;

    await expect(getIntroduction(1)).rejects.toThrow('Failed to fetch introduction');
  });
}); 