import { updateIntroduction } from '../updateIntroduction';

describe('updateIntroduction', () => {
  const mockIntroduction = {
    id: 1,
    title: '수정된 자기소개',
    content: '수정된 내용입니다.',
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

  it('자기소개를 성공적으로 수정해야 한다', async () => {
    const updatedData = {
      title: '수정된 자기소개',
      content: '수정된 내용입니다.',
    };

    const response = await updateIntroduction(1, updatedData);

    expect(response).toEqual(mockIntroduction);
    expect(fetch).toHaveBeenCalledWith('/api/introductions/1', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedData),
    });
  });

  it('API 호출이 실패하면 에러를 throw 해야 한다', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: false,
        status: 404,
        statusText: 'Not Found',
      })
    ) as jest.Mock;

    const updatedData = {
      title: '수정된 자기소개',
      content: '수정된 내용입니다.',
    };

    await expect(updateIntroduction(1, updatedData)).rejects.toThrow('Failed to update introduction');
  });
}); 