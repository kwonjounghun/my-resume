import { render, screen } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import CompanyWishlistEditPage from '../../[id]/edit';
import { getCompanyWishlistDetail } from '@/entities/company/api/getCompanyWishlistDetail';

jest.mock('@/entities/company/api/getCompanyWishlistDetail');
jest.mock('next/router', () => ({
  useRouter: () => ({
    query: { id: '1' },
    push: jest.fn(),
    back: jest.fn(),
  }),
}));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

const mockCompanyWishlist = {
  id: 1,
  company: '토스',
  link: 'https://toss.im/career/jobs',
  status: 'DOCUMENT_SUBMITTED' as const,
  description: '토스에서 프론트엔드 개발자를 찾습니다.',
  isJobApplied: false,
  createdAt: new Date('2024-01-01').toISOString(),
  updatedAt: new Date('2024-01-01').toISOString(),
};

const renderPage = () => {
  return render(
    <QueryClientProvider client={queryClient}>
      <CompanyWishlistEditPage />
    </QueryClientProvider>
  );
};

describe('CompanyWishlistEditPage', () => {
  beforeEach(() => {
    queryClient.clear();
    jest.clearAllMocks();
  });

  it('should render edit form with company wishlist data', async () => {
    (getCompanyWishlistDetail as jest.Mock).mockResolvedValue(mockCompanyWishlist);

    renderPage();

    expect(await screen.findByText('관심기업 수정')).toBeInTheDocument();
    expect(screen.getByLabelText('회사명')).toHaveValue('토스');
    expect(screen.getByLabelText('채용공고 링크')).toHaveValue(
      'https://toss.im/career/jobs'
    );
    expect(screen.getByLabelText('지원 상태')).toHaveValue('DOCUMENT_SUBMITTED');
    expect(screen.getByLabelText('설명')).toHaveValue(
      '토스에서 프론트엔드 개발자를 찾습니다.'
    );
  });

  it('should show error message when company wishlist not found', async () => {
    (getCompanyWishlistDetail as jest.Mock).mockResolvedValue(null);

    renderPage();

    expect(
      await screen.findByText('관심기업을 찾을 수 없습니다.')
    ).toBeInTheDocument();
  });
}); 