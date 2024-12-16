import { render, screen } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import ResumeList from '../ResumeList';

// Mock next/router
jest.mock('next/router', () => ({
  useRouter: () => ({
    pathname: '/resumes',
  }),
}));

// Mock next/link
jest.mock('next/link', () => {
  return ({ children, href }: { children: React.ReactNode; href: string }) => {
    return <a href={href}>{children}</a>;
  };
});

const mockResumes = [
  {
    id: 1,
    userId: 1,
    selfIntroductionId: 1,
    title: '프론트엔드 개발자 이력서',
    content: '이력서 내용',
    createdAt: '2024-01-01T00:00:00.000Z',
    updatedAt: '2024-01-01T00:00:00.000Z',
    isPublic: true,
    projects: [1, 2],
    companyWishlist: [1],
  },
  {
    id: 2,
    userId: 1,
    selfIntroductionId: 2,
    title: '백엔드 개발자 이력서',
    content: '이력서 내용',
    createdAt: '2024-02-01T00:00:00.000Z',
    updatedAt: '2024-02-01T00:00:00.000Z',
    isPublic: true,
    projects: [3, 4],
    companyWishlist: [2],
  },
];

describe('ResumeList', () => {
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
            resumes: mockResumes,
            total: mockResumes.length,
          }),
      })
    ) as jest.Mock;

    render(
      <QueryClientProvider client={queryClient}>
        <ResumeList />
      </QueryClientProvider>
    );
  });

  afterEach(() => {
    jest.resetAllMocks();
    queryClient.clear();
  });

  it('이력서 목록이 로딩될 때 로딩 상태를 표시해야 한다', () => {
    expect(screen.getByText('이력서 목록을 불러오는 중...')).toBeInTheDocument();
  });

  it('이력서 목록이 있을 때 목록을 표시해야 한다', async () => {
    expect(await screen.findByText('프론트엔드 개발자 이력서')).toBeInTheDocument();
    expect(await screen.findByText('백엔드 개발자 이력서')).toBeInTheDocument();
  });

  it('각 이력서 카드에 필요한 정보가 표시되어야 한다', async () => {
    const frontendCard = await screen.findByText('프론트엔드 개발자 이력서');
    const card = frontendCard.closest('a');
    
    expect(card).toBeInTheDocument();
    expect(card).toHaveAttribute('href', '/resumes/1');
    expect(screen.getByText('2024.01.01')).toBeInTheDocument();
  });

  it('이력서 목록이 비어있을 때 안내 메시지를 표시해야 한다', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () =>
          Promise.resolve({
            resumes: [],
            total: 0,
          }),
      })
    ) as jest.Mock;

    render(
      <QueryClientProvider client={queryClient}>
        <ResumeList />
      </QueryClientProvider>
    );

    expect(
      await screen.findByText('아직 작성된 이력서가 없습니다.')
    ).toBeInTheDocument();
  });
}); 