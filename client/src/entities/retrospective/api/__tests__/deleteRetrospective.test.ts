import { deleteRetrospective } from '../deleteRetrospective';

describe('deleteRetrospective', () => {
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

  it('API 호출이 실패하면 에러를 throw 해야 한다', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: false,
        status: 404,
        statusText: 'Not Found',
      })
    ) as jest.Mock;

    await expect(deleteRetrospective(1)).rejects.toThrow(
      'Failed to delete retrospective'
    );
  });
}); 