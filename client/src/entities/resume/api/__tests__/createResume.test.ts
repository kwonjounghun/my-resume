import { createResume } from '../createResume';

describe('createResume', () => {
  const mockResume = {
    title: '신입 프론트엔드 개발자 이력서',
    content: '안녕하세요. 프론트엔드 개발자입니다.',
    selfIntroductionId: 1,
    projects: [1, 2],
    isPublic: true,
  };

  const mockResponse = {
    id: 1,
    ...mockResume,
    createdAt: '2024-01-01T00:00:00.000Z',
    updatedAt: '2024-01-01T00:00:00.000Z',
  };

  beforeEach(() => {
    global.fetch = jest.fn();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('이력서를 성공적으로 등록한다', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    });

    const response = await createResume(mockResume);

    expect(global.fetch).toHaveBeenCalledWith('/api/resumes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(mockResume),
    });
    expect(response).toEqual(mockResponse);
  });

  it('서버 에러가 발생하면 에러를 던진다', async () => {
    const errorMessage = '서버 에러가 발생했습니다.';
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      json: async () => ({ message: errorMessage }),
    });

    await expect(createResume(mockResume)).rejects.toThrow(errorMessage);
  });

  it('네트워크 에러가 발생하면 에러를 던진다', async () => {
    (global.fetch as jest.Mock).mockRejectedValueOnce(new Error('네트워크 에러'));

    await expect(createResume(mockResume)).rejects.toThrow('네트워크 에러');
  });
}); 