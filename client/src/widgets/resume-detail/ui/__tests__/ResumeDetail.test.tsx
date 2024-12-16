import { render, screen, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ChakraProvider } from '@chakra-ui/react';
import ResumeDetail from '../ResumeDetail';
import { getResume } from '@/entities/resume/api/getResume';
import { getIntroduction } from '@/entities/introduction/api/getIntroduction';
import { getRetrospective } from '@/entities/retrospective/api/getRetrospective';

jest.mock('@/entities/resume/api/getResume');
jest.mock('@/entities/introduction/api/getIntroduction');
jest.mock('@/entities/retrospective/api/getRetrospective');

const mockRouter = { push: jest.fn() };
jest.mock('next/router', () => ({
  useRouter: () => mockRouter,
}));

describe('ResumeDetail', () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

  beforeEach(() => {
    jest.clearAllMocks();
    (getResume as jest.Mock).mockResolvedValue({
      id: 1,
      title: '신입 프론트엔드 개발자 이력서',
      content: '이력서 내용',
      selfIntroductionId: 1,
      projects: [1],
      isPublic: true,
      createdAt: '2024-01-01T00:00:00.000Z',
      updatedAt: '2024-01-01T00:00:00.000Z',
    });
    (getIntroduction as jest.Mock).mockResolvedValue({
      id: 1,
      title: '프론트엔드 개발자 자기소개',
      content: '자기소개 내용',
    });
    (getRetrospective as jest.Mock).mockResolvedValue({
      id: 1,
      title: '프로젝트 A',
      summary: '프로젝트 A 요약',
      startDate: '2024-01-01',
      endDate: '2024-02-01',
      keywords: ['React'],
    });
  });

  const renderDetail = () => {
    return render(
      <QueryClientProvider client={queryClient}>
        <ChakraProvider>
          <ResumeDetail id={1} />
        </ChakraProvider>
      </QueryClientProvider>
    );
  };

  it('이력서 정보를 렌더링해야 한다', async () => {
    renderDetail();

    await waitFor(() => {
      expect(screen.getByText('신입 프론트엔드 개발자 이력서')).toBeInTheDocument();
      expect(screen.getByText('이력서 내용')).toBeInTheDocument();
      expect(screen.getByText('공개')).toBeInTheDocument();
    });
  });

  it('자기소개 정보를 렌더링해야 한다', async () => {
    renderDetail();

    await waitFor(() => {
      expect(screen.getByText('프론트엔드 개발자 자기소개')).toBeInTheDocument();
      expect(screen.getByText('자기소개 내용')).toBeInTheDocument();
    });
  });

  it('프로젝트 경험을 렌더링해야 한다', async () => {
    renderDetail();

    await waitFor(() => {
      expect(screen.getByText('프로젝트 A')).toBeInTheDocument();
      expect(screen.getByText('프로젝트 A 요약')).toBeInTheDocument();
      expect(screen.getByText('React')).toBeInTheDocument();
    });
  });

  it('수정하기 버튼이 올바른 링크를 가져야 한다', async () => {
    renderDetail();

    await waitFor(() => {
      const editButton = screen.getByRole('link', { name: '수정하기' });
      expect(editButton).toHaveAttribute('href', '/resumes/1/edit');
    });
  });
}); 