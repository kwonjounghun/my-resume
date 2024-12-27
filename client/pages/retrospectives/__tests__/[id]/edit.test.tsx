import { render, screen } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ChakraProvider } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import EditRetrospectivePage from '../../[id]/edit';
import { getRetrospective } from '@/entities/retrospective/api/getRetrospective';

// Mock next/router
jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

// Mock getRetrospective API
jest.mock('@/entities/retrospective/api/getRetrospective');

describe('EditRetrospectivePage', () => {
  const mockRouter = {
    query: { id: '1' },
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

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

  beforeEach(() => {
    (useRouter as jest.Mock).mockImplementation(() => mockRouter);
    (getRetrospective as jest.Mock).mockResolvedValue(mockRetrospective);
  });

  afterEach(() => {
    jest.clearAllMocks();
    queryClient.clear();
  });

  const renderPage = () => {
    return render(
      <QueryClientProvider client={queryClient}>
        <ChakraProvider>
          <EditRetrospectivePage />
        </ChakraProvider>
      </QueryClientProvider>
    );
  };

  it('페이지 제목이 렌더링되어야 한다', () => {
    renderPage();
    expect(screen.getByText('회고 수정하기')).toBeInTheDocument();
  });

  it('로딩 중일 때 로딩 상태를 표시해야 한다', () => {
    (getRetrospective as jest.Mock).mockImplementation(
      () => new Promise(() => {})
    );
    renderPage();
    expect(screen.getByText('로딩 중...')).toBeInTheDocument();
  });

  it('회고가 없을 때 에러 메시지를 표시해야 한다', async () => {
    (getRetrospective as jest.Mock).mockResolvedValue(null);
    renderPage();
    expect(await screen.findByText('회고를 찾을 수 없습니다.')).toBeInTheDocument();
  });

  it('회고 데이터가 폼에 채워져야 한다', async () => {
    renderPage();

    expect(await screen.findByDisplayValue('프로젝트 A')).toBeInTheDocument();
    expect(await screen.findByDisplayValue('회사 A')).toBeInTheDocument();
    expect(await screen.findByText('React')).toBeInTheDocument();
    expect(await screen.findByText('TypeScript')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '수정하기' })).toBeInTheDocument();
  });
}); 