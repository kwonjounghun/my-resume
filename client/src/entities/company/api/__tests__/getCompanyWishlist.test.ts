import { getCompanyWishlist } from '../getCompanyWishlist';

describe('getCompanyWishlist', () => {
  const mockCompanyWishlist = {
    id: 1,
    userid: 1,
    company: '토스',
    link: 'https://toss.im/careers',
    resumeId: 1,
    isJobApplied: false,
    status: 'DOCUMENT_SUBMITTED' as const,
    description: '토스 프론트엔드 개발자 채용',
    createdAt: '2024-01-01T00:00:00.000Z',
    updatedAt: '2024-01-01T00:00:00.000Z',
  };

  beforeEach(() => {
    global.fetch = jest.fn();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('관심기업 목록을 성공적으로 조회해야 한다', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ companyWishlist: [mockCompanyWishlist] }),
    });

    const result = await getCompanyWishlist();

    expect(global.fetch).toHaveBeenCalledWith('/api/company-wishlist');
    expect(result).toEqual({ companyWishlist: [mockCompanyWishlist] });
  });

  it('API 호출이 실패하면 에러를 던져야 한다', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
    });

    await expect(getCompanyWishlist()).rejects.toThrow('관심기업 목록을 조회하는데 실패했습니다.');
  });
}); 