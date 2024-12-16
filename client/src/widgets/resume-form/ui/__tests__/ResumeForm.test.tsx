import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ChakraProvider } from '@chakra-ui/react';
import ResumeForm from '../ResumeForm';
import { createResume } from '@/entities/resume/api/createResume';
import { getIntroductions } from '@/entities/introduction/api/getIntroductions';
import { getRetrospectives } from '@/entities/retrospective/api/getRetrospectives';

// Mocks
jest.mock('@/entities/resume/api/createResume');
jest.mock('@/entities/introduction/api/getIntroductions');
jest.mock('@/entities/retrospective/api/getRetrospectives');

const mockRouter = { push: jest.fn() };
jest.mock('next/router', () => ({
  useRouter: () => mockRouter,
}));

describe('ResumeForm', () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

  beforeEach(() => {
    jest.clearAllMocks();
    (getIntroductions as jest.Mock).mockResolvedValue({
      introductions: [
        {
          id: 1,
          title: '프론트엔드 개발자 자기소개',
          content: '자기소개 내용',
        },
      ],
    });
    (getRetrospectives as jest.Mock).mockResolvedValue({
      retrospectives: [
        {
          id: 1,
          title: '프로젝트 A',
          summary: '프로젝트 A 요약',
          startDate: '2024-01-01',
          endDate: '2024-02-01',
        },
        {
          id: 2,
          title: '프로젝트 B',
          summary: null,
          startDate: '2024-02-01',
          endDate: '2024-03-01',
        },
      ],
    });
    (createResume as jest.Mock).mockResolvedValue({
      id: 1,
      title: '신입 프론트엔드 개발자 이력서',
      content: '이력서 내용',
      selfIntroductionId: 1,
      projects: [1],
      isPublic: false,
    });
  });

  const renderForm = () => {
    return render(
      <QueryClientProvider client={queryClient}>
        <ChakraProvider>
          <ResumeForm mode="create" />
        </ChakraProvider>
      </QueryClientProvider>
    );
  };

  describe('생성 모드', () => {
    it('모든 필수 필드가 렌더링되어야 한다', () => {
      renderForm();

      expect(screen.getByLabelText(/제목/)).toBeInTheDocument();
      expect(screen.getByPlaceholderText('이력서 내용을 입력하세요')).toBeInTheDocument();
      expect(screen.getByText(/자기소개서 선택/)).toBeInTheDocument();
      expect(screen.getByText(/프로젝트 회고 선택/)).toBeInTheDocument();
      expect(screen.getByLabelText(/공개 여부/)).toBeInTheDocument();
      expect(screen.getByRole('button', { name: '등록하기' })).toBeInTheDocument();
    });

    it('필수 필드가 비어있을 때 유효성 검사 에러를 표시해야 한다', async () => {
      renderForm();

      fireEvent.submit(screen.getByRole('button', { name: '등록하기' }));

      expect(await screen.findByText('제목을 입력해주세요.')).toBeInTheDocument();
      expect(await screen.findByText('내용을 입력해주세요.')).toBeInTheDocument();
    });

    it('요약이 있는 회고만 선택 목록에 표시되어야 한다', async () => {
      renderForm();

      await waitFor(() => {
        expect(screen.getByText('프로젝트 A')).toBeInTheDocument();
        expect(screen.queryByText('프로젝트 B')).not.toBeInTheDocument();
      });
    });

    it('폼 제출이 성공하면 목록 페이지로 이동해야 한다', async () => {
      renderForm();
      const user = userEvent.setup();

      await user.type(screen.getByLabelText(/제목/), '신입 프론트엔드 개발자 이력서');
      await user.type(screen.getByPlaceholderText('이력서 내용을 입력하세요'), '이력서 내용');
      
      // 자기소개서 선택
      await waitFor(() => {
        expect(screen.getByRole('radio', { name: /프론트엔드 개발자 자기소개/ })).toBeInTheDocument();
      });
      await user.click(screen.getByRole('radio', { name: /프론트엔드 개발자 자기소개/ }));

      // 회고 선택
      await waitFor(() => {
        expect(screen.getByRole('checkbox', { name: /프로젝트 A/ })).toBeInTheDocument();
      });
      await user.click(screen.getByRole('checkbox', { name: /프로젝트 A/ }));

      await user.click(screen.getByRole('button', { name: '등록하기' }));

      await waitFor(() => {
        expect(createResume).toHaveBeenCalledWith({
          title: '신입 프론트엔드 개발자 이력서',
          content: '이력서 내용',
          selfIntroductionId: 1,
          projects: [1],
          isPublic: false,
        });
        expect(mockRouter.push).toHaveBeenCalledWith('/resumes');
      });
    });
  });
}); 