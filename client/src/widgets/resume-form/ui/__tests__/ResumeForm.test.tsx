import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ChakraProvider } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import userEvent from '@testing-library/user-event';
import ResumeForm from '../ResumeForm';
import { createResume } from '@/entities/resume/api/createResume';
import { getIntroductions } from '@/entities/introduction/api/getIntroductions';
import { getRetrospectives } from '@/entities/retrospective/api/getRetrospectives';

// Mock next/router
jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

// Mock next/link
jest.mock('next/link', () => {
  return ({ children, href }: { children: React.ReactNode; href: string }) => {
    return <a href={href}>{children}</a>;
  };
});

// Mock API functions
jest.mock('@/entities/resume/api/createResume');
jest.mock('@/entities/introduction/api/getIntroductions');
jest.mock('@/entities/retrospective/api/getRetrospectives');

describe('ResumeForm', () => {
  const mockRouter = {
    push: jest.fn(),
  };

  const mockIntroductions = [
    {
      id: 1,
      title: '프론트엔드 개발자 자기소개',
      content: '안녕하세요. 프론트엔드 개발자입니다.',
      createdAt: '2024-01-01T00:00:00.000Z',
      updatedAt: '2024-01-01T00:00:00.000Z',
    },
  ];

  const mockRetrospectives = [
    {
      id: 1,
      title: '프로젝트 A',
      situation: '상황',
      task: '과제',
      action: '행동',
      result: '결과',
      summary: '프로젝트 요약',
      company: '회사 A',
      startDate: '2024-01-01',
      endDate: '2024-02-01',
      isPublic: true,
      keywords: ['React'],
      createdAt: '2024-01-01T00:00:00.000Z',
      updatedAt: '2024-01-01T00:00:00.000Z',
    },
    {
      id: 2,
      title: '프로젝트 B',
      situation: '상황',
      task: '과제',
      action: '행동',
      result: '결과',
      summary: null, // 요약이 없는 회고
      company: '회사 B',
      startDate: '2024-02-01',
      endDate: '2024-03-01',
      isPublic: true,
      keywords: ['React'],
      createdAt: '2024-02-01T00:00:00.000Z',
      updatedAt: '2024-02-01T00:00:00.000Z',
    },
  ];

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

  beforeEach(() => {
    (useRouter as jest.Mock).mockImplementation(() => mockRouter);
    (createResume as jest.Mock).mockResolvedValue({
      id: 1,
      title: '신입 프론트엔드 개발자 이력서',
      content: '이력서 내용',
      selfIntroductionId: 1,
      projects: [1],
      isPublic: true,
      createdAt: '2024-01-01T00:00:00.000Z',
      updatedAt: '2024-01-01T00:00:00.000Z',
    });
    (getIntroductions as jest.Mock).mockResolvedValue({
      introductions: mockIntroductions,
      total: mockIntroductions.length,
    });
    (getRetrospectives as jest.Mock).mockResolvedValue({
      retrospectives: mockRetrospectives,
      total: mockRetrospectives.length,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
    queryClient.clear();
  });

  const renderForm = (props = {}) => {
    return render(
      <QueryClientProvider client={queryClient}>
        <ChakraProvider>
          <ResumeForm mode="create" {...props} />
        </ChakraProvider>
      </QueryClientProvider>
    );
  };

  describe('생성 모드', () => {
    it('모든 필수 필드가 렌더링되어야 한다', () => {
      renderForm();

      expect(screen.getByLabelText(/제목/)).toBeInTheDocument();
      expect(screen.getByLabelText(/내용/)).toBeInTheDocument();
      expect(screen.getByLabelText(/자기소개서 선택/)).toBeInTheDocument();
      expect(screen.getByRole('group', { name: /프로젝트 회고 선택/ })).toBeInTheDocument();
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
      await user.type(screen.getByLabelText(/내용/), '이력서 내용');
      
      // 자기소개서 선���
      await waitFor(() => {
        expect(screen.getByText('프론트엔드 개발자 자기소개')).toBeInTheDocument();
      });
      await user.selectOptions(
        screen.getByLabelText(/자기소개서 선택/),
        '1'
      );

      // 회고 선택
      await waitFor(() => {
        expect(screen.getByText('프로젝트 A')).toBeInTheDocument();
      });
      await user.click(screen.getByText('프로젝트 A'));

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

  it('목록으로 돌아가는 버튼이 렌더링되어야 한다', () => {
    renderForm();
    const backToListButton = screen.getByRole('button', { name: /목록으로/ });
    expect(backToListButton).toBeInTheDocument();
    expect(backToListButton.closest('a')).toHaveAttribute('href', '/resumes');
  });
}); 