import { render, screen } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import IntroductionList from '../IntroductionList';

// Mock next/router
jest.mock('next/router', () => ({
  useRouter: () => ({
    pathname: '/introductions',
  }),
}));

// Mock next/link
jest.mock('next/link', () => {
  return ({ children, href }: { children: React.ReactNode; href: string }) => {
    return <a href={href}>{children}</a>;
  };
});

const mockIntroductions = [
  {
    id: 1,
    title: '프론트엔드 개발자 자기소개',
    content: '안녕하세요. 프론트엔드 개발자입니다.',
    createdAt: '2024-01-01T00:00:00.000Z',
    updatedAt: '2024-01-01T00:00:00.000Z',
  },
  {
    id: 2,
    title: '백엔드 개발자 자기소개',
    content: '안녕하세요. 백엔드 개발자입니다.',
    createdAt: '2024-02-01T00:00:00.000Z',
    updatedAt: '2024-02-01T00:00:00.000Z',
  },
];

describe('IntroductionList', () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

  beforeEach(() => {
    // Mock fetch response
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () =>
          Promise.resolve({
            introductions: mockIntroductions,
            total: mockIntroductions.length,
          }),
      })
    ) as jest.Mock;

    render(
      <QueryClientProvider client={queryClient}>
        <IntroductionList />
      </QueryClientProvider>
    );
  });

  afterEach(() => {
    jest.resetAllMocks();
    queryClient.clear();
  });

  it('자기소개 목록이 로딩될 때 로딩 상태를 표시해야 한다', () => {
    expect(screen.getByText('자기소개 목록을 불러오는 중...')).toBeInTheDocument();
  });

  it('자기소개 목록이 있을 때 목록을 표시해야 한다', async () => {
    expect(await screen.findByText('프론트엔드 개발자 자기소개')).toBeInTheDocument();
    expect(await screen.findByText('백엔드 개발자 자기소개')).toBeInTheDocument();
  });

  it('각 자기소개 카드에 필요한 정보가 표시되어야 한다', async () => {
    const frontendCard = await screen.findByText('프론트엔드 개발자 자기소개');
    const card = frontendCard.closest('a');
    
    expect(card).toBeInTheDocument();
    expect(card).toHaveAttribute('href', '/introductions/1');
    expect(screen.getByText('안녕하세요. 프론트엔드 개발자입니다.')).toBeInTheDocument();
  });

  it('자기소개 목록이 비어있을 때 안내 메시지를 표시해야 한다', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () =>
          Promise.resolve({
            introductions: [],
            total: 0,
          }),
      })
    ) as jest.Mock;

    render(
      <QueryClientProvider client={queryClient}>
        <IntroductionList />
      </QueryClientProvider>
    );

    expect(
      await screen.findByText('아직 작성된 자기소개가 없습니다.')
    ).toBeInTheDocument();
  });
}); 