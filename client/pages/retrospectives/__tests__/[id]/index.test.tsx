import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ChakraProvider } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import RetrospectiveDetailPage from '../../[id]';
import { getRetrospective } from '@/entities/retrospective/api/getRetrospective';
import { deleteRetrospective } from '@/entities/retrospective/api/deleteRetrospective';
import { summarizeRetrospective } from '@/entities/retrospective/api/summarizeRetrospective';

// Mock next/router
jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

// Mock next/link
jest.mock('next/link', () => {
  const Link = ({ children, href }: { children: React.ReactNode; href: string }) => {
    return <a href={href}>{children}</a>;
  };
  return {
    __esModule: true,
    default: Link,
  };
});

// Mock API functions
jest.mock('@/entities/retrospective/api/getRetrospective');
jest.mock('@/entities/retrospective/api/deleteRetrospective');
jest.mock('@/entities/retrospective/api/summarizeRetrospective');

describe('RetrospectiveDetailPage', () => {
  const mockRouter = {
    query: { id: '1' },
    push: jest.fn(),
  };

  const mockRetrospective = {
    id: 1,
    title: '프로젝트 A',
    situation: '상황',
    task: '과제',
    action: '행동',
    result: '결과',
    isPublic: true,
    keywords: ['React', 'TypeScript'],
    company: '회사 A',
    startDate: '2024-01-01',
    endDate: '2024-02-01',
    createdAt: '2024-01-01T00:00:00.000Z',
    updatedAt: '2024-01-01T00:00:00.000Z',
    summary: null,
  };

  let queryClient: QueryClient;

  beforeEach(() => {
    queryClient = new QueryClient();

    (useRouter as jest.Mock).mockImplementation(() => mockRouter);
    (getRetrospective as jest.Mock).mockResolvedValue(mockRetrospective);
    (deleteRetrospective as jest.Mock).mockResolvedValue(undefined);
    (summarizeRetrospective as jest.Mock).mockResolvedValue({
      ...mockRetrospective,
      summary: '회고 요약',
    });
    window.confirm = jest.fn(() => true);
  });

  afterEach(() => {
    jest.clearAllMocks();
    queryClient.clear();
  });

  const renderWithClient = (ui: React.ReactElement) => {
    return render(
      <QueryClientProvider client={queryClient}>
        <ChakraProvider>{ui}</ChakraProvider>
      </QueryClientProvider>
    );
  };

  it('회고 상세 정보가 렌더링되어야 한다', async () => {
    renderWithClient(<RetrospectiveDetailPage />);

    expect(await screen.findByText('프로젝트 A')).toBeInTheDocument();
    expect(screen.getByText('회사 A')).toBeInTheDocument();
    expect(screen.getByText('2024.01.01 - 2024.02.01')).toBeInTheDocument();
    expect(screen.getByText('상황')).toBeInTheDocument();
    expect(screen.getByText('과제')).toBeInTheDocument();
    expect(screen.getByText('행동')).toBeInTheDocument();
    expect(screen.getByText('결과')).toBeInTheDocument();
    expect(screen.getByText('React')).toBeInTheDocument();
    expect(screen.getByText('TypeScript')).toBeInTheDocument();
    expect(screen.getByText('공개')).toBeInTheDocument();
  });

  it('로딩 중일 때 로딩 상태를 표시해야 한다', () => {
    (getRetrospective as jest.Mock).mockImplementation(
      () => new Promise(() => { })
    );
    renderWithClient(<RetrospectiveDetailPage />);
    expect(screen.getByText('로딩 중...')).toBeInTheDocument();
  });

  it('회고가 없을 때 에러 메시지를 표시해야 한다', async () => {
    (getRetrospective as jest.Mock).mockResolvedValue(null);
    renderWithClient(<RetrospectiveDetailPage />);
    await waitFor(() => {
      expect(screen.getByText('회고를 찾을 수 없습니다.')).toBeInTheDocument();
    });
  });

  it('삭제 버튼 클릭 시 확인 후 삭제되어야 한다', async () => {
    renderWithClient(<RetrospectiveDetailPage />);
    const deleteButton = await screen.findByRole('button', { name: '삭제하기' });
    fireEvent.click(deleteButton);

    await waitFor(() => {
      expect(window.confirm).toHaveBeenCalledWith('정말로 삭제하시겠습니까?');
      expect(deleteRetrospective).toHaveBeenCalledWith(1);
      expect(mockRouter.push).toHaveBeenCalledWith('/retrospectives');
    });
  });

  describe('요약하기 버튼', () => {
    it('STAR 내용이 모두 있고 summary가 없을 때 표시되어야 한다', async () => {
      (getRetrospective as jest.Mock).mockResolvedValue(mockRetrospective);
      renderWithClient(<RetrospectiveDetailPage />);

      const summarizeButton = await screen.findByRole('button', { name: '회고 요약하기' });
      expect(summarizeButton).toBeInTheDocument();
    });

    it('summary가 있을 때 표시되지 않아야 한다', async () => {
      (getRetrospective as jest.Mock).mockResolvedValue({
        ...mockRetrospective,
        summary: '회고 요약',
      });
      renderWithClient(<RetrospectiveDetailPage />);
      await waitFor(() => {
        expect(screen.queryByTestId('summarize-button')).not.toBeInTheDocument();
      });
    });

    it('STAR 중 하나라도 없을 때 표시되지 않아야 한다', async () => {
      (getRetrospective as jest.Mock).mockResolvedValue({
        ...mockRetrospective,
        situation: '',
      });
      renderWithClient(<RetrospectiveDetailPage />);
      await waitFor(() => {
        expect(screen.queryByTestId('summarize-button')).not.toBeInTheDocument();
      });
    });

    it('클릭 시 요약이 생성되어야 한다', async () => {
      renderWithClient(<RetrospectiveDetailPage />);
      const summarizeButton = await screen.findByTestId('summarize-button');
      fireEvent.click(summarizeButton);

      await waitFor(() => {
        expect(summarizeRetrospective).toHaveBeenCalledWith(1);
      });
    });
  });
}); 