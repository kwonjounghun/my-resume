import { render, screen, within } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { http, HttpResponse } from 'msw';
import RetrospectiveList from '../RetrospectiveList';

// Mock next/router
jest.mock('next/router', () => ({
  useRouter: () => ({
    pathname: '/retrospectives',
  }),
}));

// Mock next/link
jest.mock('next/link', () => {
  return ({ children, href }: { children: React.ReactNode; href: string }) => {
    return <a href={href}>{children}</a>;
  };
});

const mockRetrospectives = [
  {
    id: 1,
    title: '프로젝트 A',
    situation: '상황',
    task: '과제',
    action: '행동',
    result: '결과',
    createdAt: '2024-01-01T00:00:00.000Z',
    updatedAt: '2024-01-01T00:00:00.000Z',
    isPublic: true,
    keywords: ['React', 'TypeScript'],
    summary: '프로젝트 요약',
    company: '회사 A',
    startDate: '2024-01-01',
    endDate: '2024-02-01',
  },
  {
    id: 2,
    title: '프로젝트 B',
    situation: '상황',
    task: '과제',
    action: '행동',
    result: '결과',
    createdAt: '2024-02-01T00:00:00.000Z',
    updatedAt: '2024-02-01T00:00:00.000Z',
    isPublic: true,
    keywords: ['Next.js', 'TypeScript'],
    summary: '프로젝트 요약',
    company: '회사 B',
    startDate: '2024-02-01',
    endDate: '2024-03-01',
  },
];

describe('RetrospectiveList', () => {
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
            retrospectives: mockRetrospectives,
            total: mockRetrospectives.length,
          }),
      })
    ) as jest.Mock;

    render(
      <QueryClientProvider client={queryClient}>
        <RetrospectiveList />
      </QueryClientProvider>
    );
  });

  afterEach(() => {
    jest.resetAllMocks();
    queryClient.clear();
  });

  it('회고 목록이 로딩될 때 로딩 상태를 표시해야 한다', () => {
    expect(screen.getByText('회고 목록을 불러오는 중...')).toBeInTheDocument();
  });

  it('회고 목록이 있을 때 목록을 표시해야 한다', async () => {
    expect(await screen.findByText('프로젝트 A')).toBeInTheDocument();
    expect(await screen.findByText('프로젝트 B')).toBeInTheDocument();
  });

  it('각 회고 카드에 필요한 정보가 표시되어야 한다', async () => {
    const projectA = await screen.findByText('프로젝트 A');
    const card = projectA.closest('a');
    
    expect(card).toBeInTheDocument();
    expect(within(card!).getByText('회사 A')).toBeInTheDocument();
    expect(within(card!).getByText('2024.01.01 - 2024.02.01')).toBeInTheDocument();
    expect(within(card!).getByText('React')).toBeInTheDocument();
    expect(within(card!).getByText('TypeScript')).toBeInTheDocument();
  });

  it('회고 목록이 비어있을 때 안내 메시지를 표시해야 한다', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () =>
          Promise.resolve({
            retrospectives: [],
            total: 0,
          }),
      })
    ) as jest.Mock;

    render(
      <QueryClientProvider client={queryClient}>
        <RetrospectiveList />
      </QueryClientProvider>
    );

    expect(
      await screen.findByText('아직 작성된 회고가 없습니다.')
    ).toBeInTheDocument();
  });
}); 