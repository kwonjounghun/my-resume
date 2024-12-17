import { render, screen } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import CompanyWishlistDetail from '../CompanyWishlistDetail';
import { getCompanyWishlistDetail } from '@/entities/company/api/getCompanyWishlistDetail';
import { getResumeDetail } from '@/entities/resume/api/getResumeDetail';

jest.mock('next/router', () => ({
  useRouter: () => ({
    push: jest.fn(),
    back: jest.fn(),
  }),
}));

jest.mock('@/entities/company/api/getCompanyWishlistDetail');
jest.mock('@/entities/resume/api/getResumeDetail');

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
  status: 'DOCUMENT_SUBMITTED',
  description: '토스에서 프론트엔드 개발자를 찾습니다.',
  isJobApplied: false,
  resumeId: 1,
  createdAt: new Date('2024-01-01').toISOString(),
  updatedAt: new Date('2024-01-01').toISOString(),
};

const mockResume = {
  id: 1,
  title: '프론트엔드 개발자 이력서',
  content: '이력서 내용',
  createdAt: new Date('2024-01-01').toISOString(),
  updatedAt: new Date('2024-01-01').toISOString(),
};

const renderComponent = (id: number) => {
  return render(
    <QueryClientProvider client={queryClient}>
      <CompanyWishlistDetail id={id} />
    </QueryClientProvider>
  );
};

describe('CompanyWishlistDetail', () => {
  beforeEach(() => {
    queryClient.clear();
    jest.clearAllMocks();
  });

  it('should render company wishlist detail with resume title', async () => {
    (getCompanyWishlistDetail as jest.Mock).mockResolvedValue(mockCompanyWishlist);
    (getResumeDetail as jest.Mock).mockResolvedValue(mockResume);
    renderComponent(1);

    expect(await screen.findByText('토스')).toBeInTheDocument();
    expect(screen.getByText('채용공고 링크')).toBeInTheDocument();
    expect(screen.getByText('지원 상태')).toBeInTheDocument();
    expect(screen.getByText('설명')).toBeInTheDocument();
    expect(screen.getByText('등록일')).toBeInTheDocument();
    expect(screen.getByText('최종 수정일')).toBeInTheDocument();
    expect(screen.getByText('지원 이력서')).toBeInTheDocument();
    expect(await screen.findByText('프론트엔드 개발자 이력서')).toBeInTheDocument();
  });

  it('should show error message when resume cannot be loaded', async () => {
    (getCompanyWishlistDetail as jest.Mock).mockResolvedValue(mockCompanyWishlist);
    (getResumeDetail as jest.Mock).mockResolvedValue(undefined);
    renderComponent(1);

    expect(await screen.findByText('이력서를 불러올 수 없습니다.')).toBeInTheDocument();
  });

  it('should show message when no resume is linked', async () => {
    const mockCompanyWishlistWithoutResume = {
      ...mockCompanyWishlist,
      resumeId: null,
    };
    (getCompanyWishlistDetail as jest.Mock).mockResolvedValue(mockCompanyWishlistWithoutResume);
    renderComponent(1);

    expect(await screen.findByText('연결된 이력서가 없습니다.')).toBeInTheDocument();
  });

  it('should show error message when company wishlist not found', async () => {
    (getCompanyWishlistDetail as jest.Mock).mockResolvedValue(undefined);
    renderComponent(999);

    expect(await screen.findByText('관심기업을 찾을 수 없습니다.')).toBeInTheDocument();
  });
}); 