import { render, screen } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ChakraProvider } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import IntroductionDetailPage from '../../[id]';
import { getIntroduction } from '@/entities/introduction/api/getIntroduction';

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

// Mock getIntroduction API
jest.mock('@/entities/introduction/api/getIntroduction');

describe('자기소개 상세 페이지', () => {
  const mockRouter = {
    query: { id: '1' },
  };

  const mockIntroduction = {
    id: 1,
    title: '프론트엔드 개발자 자기소개',
    content: '안녕하세요. 프론트엔드 개발자입니다.',
    createdAt: '2024-01-01T00:00:00.000Z',
    updatedAt: '2024-01-01T00:00:00.000Z',
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
    (getIntroduction as jest.Mock).mockResolvedValue(mockIntroduction);
  });

  afterEach(() => {
    jest.clearAllMocks();
    queryClient.clear();
  });

  const renderPage = () => {
    return render(
      <QueryClientProvider client={queryClient}>
        <ChakraProvider>
          <IntroductionDetailPage />
        </ChakraProvider>
      </QueryClientProvider>
    );
  };

  it('자기소개 상세 정보가 렌더링되어야 한다', async () => {
    renderPage();

    expect(await screen.findByText('프론트엔드 개발자 자기소개')).toBeInTheDocument();
    expect(screen.getByText('안녕하세요. 프론트엔드 개발자입니다.')).toBeInTheDocument();
    expect(screen.getByText('2024.01.01')).toBeInTheDocument();
  });

  it('로딩 중일 때 로딩 상태를 표시해야 한다', () => {
    (getIntroduction as jest.Mock).mockImplementation(
      () => new Promise(() => {})
    );
    renderPage();
    expect(screen.getByText('로딩 중...')).toBeInTheDocument();
  });

  it('자기소개가 없을 때 에러 메시지를 표시해야 한다', async () => {
    (getIntroduction as jest.Mock).mockResolvedValue(null);
    renderPage();
    expect(await screen.findByText('자기소개를 찾을 수 없습니다.')).toBeInTheDocument();
  });

  it('목록으로 돌아가는 버튼이 렌더링되어야 한다', async () => {
    renderPage();
    const backButton = await screen.findByRole('button', { name: '목록으로' });
    expect(backButton).toBeInTheDocument();
    expect(backButton.closest('a')).toHaveAttribute('href', '/introductions');
  });

  it('수정하기 버튼이 렌더링되어야 한다', async () => {
    renderPage();
    const editButton = await screen.findByRole('button', { name: '수정하기' });
    expect(editButton).toBeInTheDocument();
    expect(editButton.closest('a')).toHaveAttribute('href', '/introductions/1/edit');
  });

  it('삭제하기 버튼이 렌더링되어야 한다', async () => {
    renderPage();
    const deleteButton = await screen.findByRole('button', { name: '삭제하기' });
    expect(deleteButton).toBeInTheDocument();
  });
}); 