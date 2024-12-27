import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ChakraProvider } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import IntroductionEditPage from '../../[id]/edit';
import { getIntroduction } from '@/entities/introduction/api/getIntroduction';
import { updateIntroduction } from '@/entities/introduction/api/updateIntroduction';

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

// Mock APIs
jest.mock('@/entities/introduction/api/getIntroduction');
jest.mock('@/entities/introduction/api/updateIntroduction');

describe('IntroductionEditPage', () => {
  const mockRouter = {
    query: { id: '1' },
    push: jest.fn(),
  };

  const mockIntroduction = {
    id: 1,
    title: '기존 자기소개',
    content: '기존 내용입니다.',
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
    (updateIntroduction as jest.Mock).mockResolvedValue({
      ...mockIntroduction,
      title: '수정된 자기소개',
      content: '수정된 내용입니다.',
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
    queryClient.clear();
  });

  const renderPage = () => {
    return render(
      <QueryClientProvider client={queryClient}>
        <ChakraProvider>
          <IntroductionEditPage />
        </ChakraProvider>
      </QueryClientProvider>
    );
  };

  it('기존 자기소개 내용이 폼에 표시되어야 한다', async () => {
    renderPage();

    await waitFor(() => {
      expect(screen.getByDisplayValue('기존 자기소개')).toBeInTheDocument();
      expect(screen.getByDisplayValue('기존 내용입니다.')).toBeInTheDocument();
    });
  });

  it('자기소개를 성공적으로 수정해야 한다', async () => {
    renderPage();

    await waitFor(() => {
      expect(screen.getByDisplayValue('기존 자기소개')).toBeInTheDocument();
    });

    const titleInput = screen.getByLabelText('제목');
    const contentInput = screen.getByLabelText('내용');
    const submitButton = screen.getByRole('button', { name: '수정하기' });

    fireEvent.change(titleInput, { target: { value: '수정된 자기소개' } });
    fireEvent.change(contentInput, { target: { value: '수정된 내용입니다.' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(updateIntroduction).toHaveBeenCalledWith(1, {
        title: '수정된 자기소개',
        content: '수정된 내용입니다.',
      });
    });

    expect(mockRouter.push).toHaveBeenCalledWith('/introductions/1');
  });

  it('필수 필드가 비어있으면 에러 메시지를 표시해야 한다', async () => {
    renderPage();

    await waitFor(() => {
      expect(screen.getByDisplayValue('기존 자기소개')).toBeInTheDocument();
    });

    const titleInput = screen.getByLabelText('제목');
    const contentInput = screen.getByLabelText('내용');
    const submitButton = screen.getByRole('button', { name: '수정하기' });

    fireEvent.change(titleInput, { target: { value: '' } });
    fireEvent.change(contentInput, { target: { value: '' } });
    fireEvent.click(submitButton);

    expect(await screen.findByText('제목을 입력해주세요.')).toBeInTheDocument();
    expect(screen.getByText('내용을 입력해주세요.')).toBeInTheDocument();
  });

  it('뒤로 가기 버튼을 클릭하면 상세 페이지로 이동해야 한다', async () => {
    renderPage();

    const backButton = await screen.findByRole('button', { name: '뒤로 가기' });
    fireEvent.click(backButton);

    expect(mockRouter.push).toHaveBeenCalledWith('/introductions/1');
  });
}); 