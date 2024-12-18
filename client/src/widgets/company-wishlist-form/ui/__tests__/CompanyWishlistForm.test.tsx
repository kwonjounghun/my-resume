import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ChakraProvider } from '@chakra-ui/react';
import { CompanyWishlistForm } from '../CompanyWishlistForm';
import { createCompanyWishlist } from '@/entities/company/api/createCompanyWishlist';
import { getResumes } from '@/entities/resume/api/getResumes';

// Mock next/router
jest.mock('next/router', () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

// Mock API functions
jest.mock('@/entities/company/api/createCompanyWishlist');
jest.mock('@/entities/resume/api/getResumes');

describe('관심기업 등록 폼', () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

  beforeEach(() => {
    jest.clearAllMocks();
    (getResumes as jest.Mock).mockResolvedValue({
      resumes: [
        {
          id: 1,
          title: '프론트엔드 개발자 이력서',
          content: '이력서 내용',
          selfIntroductionId: 1,
          projects: [1],
          isPublic: true,
        },
      ],
    });
    (createCompanyWishlist as jest.Mock).mockResolvedValue({
      id: 1,
      company: '테스트 회사',
      link: 'https://test.com',
      resumeId: 1,
      description: '테스트 설명',
      isJobApplied: false,
      status: 'DOCUMENT_SUBMITTED',
    });
  });

  const renderForm = () => {
    return render(
      <QueryClientProvider client={queryClient}>
        <ChakraProvider>
          <CompanyWishlistForm onSuccess={() => { }} />
        </ChakraProvider>
      </QueryClientProvider>
    );
  };

  it('폼이 올바르게 렌더링되어야 한다', async () => {
    renderForm();

    await waitFor(() => {
      expect(screen.getByLabelText('회사명')).toBeInTheDocument();
      expect(screen.getByLabelText('채용공고 링크')).toBeInTheDocument();
      expect(screen.getByLabelText('설명')).toBeInTheDocument();
      expect(screen.getByLabelText('이력서 선택')).toBeInTheDocument();
      expect(screen.getByLabelText('지원 상태')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: '등록' })).toBeInTheDocument();
    });
  });

  it('필수 필드를 입력하지 않으면 에러 메시지를 표시해야 한다', async () => {
    renderForm();
    const submitButton = screen.getByRole('button', { name: '등록' });

    fireEvent.click(submitButton);

    expect(await screen.findByText('회사명을 입력해주세요')).toBeInTheDocument();
    expect(await screen.findByText('채용공고 링크를 입력해주세요')).toBeInTheDocument();
    expect(await screen.findByText('이력서를 선택하세요')).toBeInTheDocument();
  });

  it('폼을 올바르게 제출해야 한다', async () => {
    renderForm();
    const user = userEvent.setup();

    await user.type(screen.getByLabelText('회사명'), '테스트 회사');
    await user.type(screen.getByLabelText('채용공고 링크'), 'https://test.com');
    await user.type(screen.getByLabelText('설명'), '테스트 설명');
    await user.selectOptions(await screen.getByLabelText('이력서 선택'), '1');
    await user.selectOptions(screen.getByLabelText('지원 상태'), 'DOCUMENT_SUBMITTED');

    await user.click(screen.getByRole('button', { name: '등록' }));

    await waitFor(() => {
      expect(createCompanyWishlist).toHaveBeenCalledWith({
        company: '테스트 회사',
        link: 'https://test.com',
        description: '테스트 설명',
        resumeId: '1',
        status: 'DOCUMENT_SUBMITTED',
      });
    });
  });
}); 