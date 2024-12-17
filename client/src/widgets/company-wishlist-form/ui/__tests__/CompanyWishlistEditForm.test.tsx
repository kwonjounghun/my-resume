import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import CompanyWishlistEditForm from '../CompanyWishlistEditForm';
import { updateCompanyWishlist } from '@/entities/company/api/updateCompanyWishlist';
import { getResumes } from '@/entities/resume/api/getResumes';

jest.mock('@/entities/company/api/updateCompanyWishlist');
jest.mock('@/entities/resume/api/getResumes');
jest.mock('next/router', () => ({
  useRouter: () => ({
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

const mockInitialData = {
  id: 1,
  company: '토스',
  link: 'https://toss.im/career/jobs',
  status: 'DOCUMENT_SUBMITTED' as const,
  description: '토스에서 프론트엔드 개발자를 찾습니다.',
  isJobApplied: false,
  resumeId: 1,
  createdAt: new Date('2024-01-01').toISOString(),
  updatedAt: new Date('2024-01-01').toISOString(),
};

const mockResumes = [
  {
    id: 1,
    title: '토스 이력서',
    content: '토스 이력서 내용',
    createdAt: new Date('2024-01-01').toISOString(),
    updatedAt: new Date('2024-01-01').toISOString(),
  },
  {
    id: 2,
    title: '네이버 이력서',
    content: '네이버 이력서 내용',
    createdAt: new Date('2024-01-01').toISOString(),
    updatedAt: new Date('2024-01-01').toISOString(),
  },
];

const renderComponent = () => {
  return render(
    <QueryClientProvider client={queryClient}>
      <CompanyWishlistEditForm id={1} initialData={mockInitialData} />
    </QueryClientProvider>
  );
};

describe('CompanyWishlistEditForm', () => {
  beforeEach(() => {
    queryClient.clear();
    jest.clearAllMocks();
    (getResumes as jest.Mock).mockResolvedValue({ resumes: mockResumes });
  });

  it('should render form with initial data', async () => {
    renderComponent();

    expect(screen.getByLabelText('회사명')).toHaveValue('토스');
    expect(screen.getByLabelText('채용공고 링크')).toHaveValue(
      'https://toss.im/career/jobs'
    );
    expect(screen.getByLabelText('지원 상태')).toHaveValue('DOCUMENT_SUBMITTED');
    expect(screen.getByLabelText('설명')).toHaveValue(
      '토스에서 프론트엔드 개발자를 찾습니다.'
    );

    await waitFor(() => {
      expect(screen.getByLabelText('이력서')).toHaveValue('1');
    });
  });

  it('should show validation errors for required fields', async () => {
    renderComponent();

    const companyInput = screen.getByLabelText('회사명');
    const linkInput = screen.getByLabelText('채용공고 링크');
    const descriptionInput = screen.getByLabelText('설명');
    const submitButton = screen.getByText('수정');

    fireEvent.change(companyInput, { target: { value: '' } });
    fireEvent.change(linkInput, { target: { value: '' } });
    fireEvent.change(descriptionInput, { target: { value: '' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText('회사명은 필수입니다.')).toBeInTheDocument();
      expect(screen.getByText('채용공고 링크는 필수입니다.')).toBeInTheDocument();
      expect(screen.getByText('설명은 필수입니다.')).toBeInTheDocument();
    });
  });

  it('should submit form with updated data', async () => {
    (updateCompanyWishlist as jest.Mock).mockResolvedValue({
      description: mockInitialData.description,
      id: mockInitialData.id,
      isJobApplied: mockInitialData.isJobApplied,
      company: '네이버',
      link: mockInitialData.link,
      resumeId: 2,
      status: mockInitialData.status,
    });

    renderComponent();

    const companyInput = screen.getByLabelText('회사명');
    const resumeSelect = await screen.findByLabelText('이력서');
    const submitButton = screen.getByText('수정');

    fireEvent.change(companyInput, { target: { value: '네이버' } });
    fireEvent.change(resumeSelect, { target: { value: '2' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(updateCompanyWishlist).toHaveBeenCalledWith(1, {
        description: mockInitialData.description,
        isJobApplied: mockInitialData.isJobApplied,
        company: '네이버',
        link: mockInitialData.link,
        resumeId: 2,
        status: mockInitialData.status,
      });
    });
  });

  it('should render resume options', async () => {
    renderComponent();

    await waitFor(async () => {
      const resumeSelect = await screen.getByLabelText('이력서');
      expect(resumeSelect).toBeInTheDocument();
      expect(screen.getByText('토스 이력서')).toBeInTheDocument();
      expect(screen.getByText('네이버 이력서')).toBeInTheDocument();
    });
  });
}); 