import { updateRetrospective } from '../updateRetrospective';

describe('updateRetrospective', () => {
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

  it('회고를 성공적으로 수정해야 한다', async () => {
    const updateData = {
      title: '수정된 프로젝트 A',
      situation: '수정된 상황',
    };

    const response = await updateRetrospective(1, updateData);

    expect(response).toEqual(mockRetrospective);
    expect(fetch).toHaveBeenCalledWith('/api/retrospectives/1', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updateData),
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

    await expect(
      updateRetrospective(1, { title: '수정된 프로젝트 A' })
    ).rejects.toThrow('Failed to update retrospective');
  });
}); 