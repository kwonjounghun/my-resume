import { render, screen } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import CompanyWishlistDetailPage from '../../[id]';
import { getCompanyWishlistDetail } from '@/entities/company/api/getCompanyWishlistDetail';

jest.mock('next/router', () => ({
  useRouter: () => ({
    query: { id: '1' },
    push: jest.fn(),
    back: jest.fn(),
  }),
}));
jest.mock('@/entities/company/api/getCompanyWishlistDetail');

const queryClient = new QueryClient();

const renderPage = () => {
  return render(
    <QueryClientProvider client={queryClient}>
      <CompanyWishlistDetailPage />
    </QueryClientProvider>
  );
};

describe('CompanyWishlistDetailPage', () => {
  beforeEach(() => {
    queryClient.clear();
  });

  it('should render company wishlist detail page', async () => {
    const mockCompanyWishlist = {
      id: 1,
      company: '토스',
      link: 'https://toss.im/career/jobs',
      status: 'DOCUMENT_SUBMITTED',
      description: '토스에서 프론트엔드 개발자를 찾습니다.',
      isJobApplied: false,
      createdAt: new Date('2024-01-01').toISOString(),
      updatedAt: new Date('2024-01-01').toISOString(),
    };


    (getCompanyWishlistDetail as jest.Mock).mockResolvedValue(mockCompanyWishlist);
    renderPage();

    expect(await screen.findByText('토스')).toBeInTheDocument();
    expect(screen.getByText('채용공고 링크')).toBeInTheDocument();
    expect(screen.getByText('지원 상태')).toBeInTheDocument();
    expect(screen.getByText('설명')).toBeInTheDocument();
    expect(screen.getByText('등록일')).toBeInTheDocument();
    expect(screen.getByText('최종 수정일')).toBeInTheDocument();
  });
}); 