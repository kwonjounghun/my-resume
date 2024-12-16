import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ChakraProvider } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import RetrospectiveForm from '../RetrospectiveForm';
import { createRetrospective } from '@/entities/retrospective/api/createRetrospective';
import { updateRetrospective } from '@/entities/retrospective/api/updateRetrospective';

// Mock next/router
jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

// Mock API functions
jest.mock('@/entities/retrospective/api/createRetrospective');
jest.mock('@/entities/retrospective/api/updateRetrospective');

describe('RetrospectiveForm', () => {
  const mockRouter = {
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

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

  beforeEach(() => {
    (useRouter as jest.Mock).mockImplementation(() => mockRouter);
    (createRetrospective as jest.Mock).mockResolvedValue(mockRetrospective);
    (updateRetrospective as jest.Mock).mockResolvedValue({
      ...mockRetrospective,
      title: '수정된 프로젝트 A',
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
          <RetrospectiveForm mode="create" {...props} />
        </ChakraProvider>
      </QueryClientProvider>
    );
  };

  describe('생성 모드', () => {
    it('모든 필수 필드가 렌더링되어야 한다', () => {
      renderForm();

      expect(screen.getByLabelText(/제목/)).toBeInTheDocument();
      expect(screen.getByLabelText(/회사/)).toBeInTheDocument();
      expect(screen.getByLabelText(/시작일/)).toBeInTheDocument();
      expect(screen.getByLabelText(/종료일/)).toBeInTheDocument();
      expect(screen.getByLabelText(/상황/)).toBeInTheDocument();
      expect(screen.getByLabelText(/과제/)).toBeInTheDocument();
      expect(screen.getByLabelText(/행동/)).toBeInTheDocument();
      expect(screen.getByLabelText(/결과/)).toBeInTheDocument();
      expect(screen.getByLabelText(/공개 여부/)).toBeInTheDocument();
      expect(screen.getByRole('button', { name: '등록하기' })).toBeInTheDocument();
    });

    it('필수 필드가 비어있을 때 유효성 검사 에러를 표시해야 한다', async () => {
      renderForm();

      fireEvent.submit(screen.getByRole('button', { name: '등록하기' }));

      expect(await screen.findByText('제목을 입력해주세요.')).toBeInTheDocument();
      expect(await screen.findByText('회사를 입력해주세요.')).toBeInTheDocument();
      expect(await screen.findByText('시작일을 입력해주세요.')).toBeInTheDocument();
      expect(await screen.findByText('종료일을 입력해주세요.')).toBeInTheDocument();
      expect(await screen.findByText('상황을 입력해주세요.')).toBeInTheDocument();
      expect(await screen.findByText('과제를 입력해주세요.')).toBeInTheDocument();
      expect(await screen.findByText('행동을 입력해주세요.')).toBeInTheDocument();
      expect(await screen.findByText('결과를 입력해주세요.')).toBeInTheDocument();
    });

    it('폼 제출이 성공하면 목록 페이지로 이동해야 한다', async () => {
      renderForm();
      const user = userEvent.setup();

      await user.type(screen.getByLabelText(/제목/), '프로젝트 A');
      await user.type(screen.getByLabelText(/회사/), '회사 A');
      await user.type(screen.getByLabelText(/시작일/), '2024-01-01');
      await user.type(screen.getByLabelText(/종료일/), '2024-02-01');
      await user.type(screen.getByLabelText(/상황/), '상황');
      await user.type(screen.getByLabelText(/과제/), '과제');
      await user.type(screen.getByLabelText(/행동/), '행동');
      await user.type(screen.getByLabelText(/결과/), '결과');

      await user.click(screen.getByRole('button', { name: '등록하기' }));

      await waitFor(() => {
        expect(createRetrospective).toHaveBeenCalled();
        expect(mockRouter.push).toHaveBeenCalledWith('/retrospectives');
      });
    });
  });

  describe('수정 모드', () => {
    it('초기 데이터가 폼에 채워져야 한다', () => {
      renderForm({ mode: 'edit', initialData: mockRetrospective });

      expect(screen.getByLabelText(/제목/)).toHaveValue('프로젝트 A');
      expect(screen.getByLabelText(/회사/)).toHaveValue('회사 A');
      expect(screen.getByLabelText(/시작일/)).toHaveValue('2024-01-01');
      expect(screen.getByLabelText(/종료일/)).toHaveValue('2024-02-01');
      expect(screen.getByLabelText(/상황/)).toHaveValue('상황');
      expect(screen.getByLabelText(/과제/)).toHaveValue('과제');
      expect(screen.getByLabelText(/행동/)).toHaveValue('행동');
      expect(screen.getByLabelText(/결과/)).toHaveValue('결과');
      expect(screen.getByRole('button', { name: '수정하기' })).toBeInTheDocument();

      // 키워드 확인
      expect(screen.getByText('React')).toBeInTheDocument();
      expect(screen.getByText('TypeScript')).toBeInTheDocument();
    });

    it('폼 제출이 성공하면 목록 페이지로 이동해야 한다', async () => {
      renderForm({ mode: 'edit', initialData: mockRetrospective });
      const user = userEvent.setup();

      await user.clear(screen.getByLabelText(/제목/));
      await user.type(screen.getByLabelText(/제목/), '수정된 프로젝트 A');

      await user.click(screen.getByRole('button', { name: '수정하기' }));

      await waitFor(() => {
        expect(updateRetrospective).toHaveBeenCalledWith(1, expect.objectContaining({
          title: '수정된 프로젝트 A',
        }));
        expect(mockRouter.push).toHaveBeenCalledWith('/retrospectives');
      });
    });
  });

  it('목록으로 돌아가는 버튼이 렌더링되���야 한다', () => {
    renderForm();
    const backToListButton = screen.getByRole('button', { name: /목록으로/ });
    expect(backToListButton).toBeInTheDocument();
    expect(backToListButton.closest('a')).toHaveAttribute('href', '/retrospectives');
  });

  it('키워드를 추가하고 삭제할 수 있어야 한다', async () => {
    renderForm();
    const user = userEvent.setup();

    const keywordInput = screen.getByPlaceholderText(
      '키워드를 입력하고 Enter를 누르세요'
    );

    // 키워드 추가
    await user.type(keywordInput, 'React{Enter}');
    expect(screen.getByText('React')).toBeInTheDocument();

    await user.type(keywordInput, 'TypeScript{Enter}');
    expect(screen.getByText('TypeScript')).toBeInTheDocument();

    // 키워드 삭제
    const closeButton = screen.getByLabelText('React 삭제');
    await user.click(closeButton);
    expect(screen.queryByText('React')).not.toBeInTheDocument();
  });

  it('키워드는 최대 10개까지만 추가할 수 있어야 한다', async () => {
    renderForm();
    const user = userEvent.setup();

    const keywordInput = screen.getByPlaceholderText(
      '키워드를 입력하고 Enter를 누르세요'
    );

    // 11개의 키워드 추가 시도
    for (let i = 1; i <= 11; i++) {
      await user.type(keywordInput, `Keyword${i}{Enter}`);
    }

    expect(screen.getByText('최대 10개까지 추가할 수 있습니다.')).toBeInTheDocument();
    expect(screen.getAllByLabelText(/삭제$/)).toHaveLength(10);
  });
}); 