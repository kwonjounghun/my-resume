import { deleteRetrospective } from '../deleteRetrospective';

describe('회고 삭제', () => {
  beforeEach(() => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
      })
    ) as jest.Mock;
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('회고를 성공적으로 삭제해야 한다', async () => {
    await deleteRetrospective(1);
    expect(fetch).toHaveBeenCalledWith('/api/retrospectives/1', {
      method: 'DELETE',
    });
  });

  it('API 호출이 실패하면 에러를 반환해야 한다', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: false,
        status: 404,
        statusText: '찾을 수 없음',
      })
    ) as jest.Mock;

    await expect(deleteRetrospective(1)).rejects.toThrow(
      'Failed to delete retrospective'
    );
  });
}); 