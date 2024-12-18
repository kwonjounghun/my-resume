import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ChakraProvider } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import IntroductionForm from '../IntroductionForm';
import { createIntroduction } from '@/entities/introduction/api/createIntroduction';

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
jest.mock('@/entities/introduction/api/createIntroduction');

describe('자기소개 폼', () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  const renderForm = () => {
    return render(
      <QueryClientProvider client={queryClient}>
        <ChakraProvider>
          <IntroductionForm onSuccess={() => { }} />
        </ChakraProvider>
      </QueryClientProvider>
    );
  };

  it('모든 필수 필드가 렌더링되어야 한다', () => {
    renderForm();

    expect(screen.getByLabelText(/제목/)).toBeInTheDocument();
    expect(screen.getByPlaceholderText('자기소개 내용을 입력하세요')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '등록하기' })).toBeInTheDocument();
  });

  it('필수 필드가 비어있을 때 유효성 검사 에러를 표시해야 한다', async () => {
    renderForm();

    fireEvent.submit(screen.getByRole('button', { name: '등록하기' }));

    expect(await screen.findByText('제목을 입력해주세요.')).toBeInTheDocument();
    expect(await screen.findByText('내용을 입력해주세요.')).toBeInTheDocument();
  });

  it('폼을 올바르게 제출해야 한다', async () => {
    renderForm();
    const user = userEvent.setup();

    await user.type(screen.getByLabelText(/제목/), '프론트엔드 개발자 자기소개');
    await user.type(screen.getByPlaceholderText('자기소개 내용을 입력하세요'), '안녕하세요. 프론트엔드 개발자입니다.');

    await user.click(screen.getByRole('button', { name: '등록하기' }));

    await waitFor(() => {
      expect(createIntroduction).toHaveBeenCalledWith({
        title: '프론트엔드 개발자 자기소개',
        content: '안녕하세요. 프론트엔드 개발자입니다.',
      });
    });
  });

  it('목록으로 돌아가는 버튼이 렌더링되어야 한다', () => {
    renderForm();
    const backToListButton = screen.getByRole('button', { name: /목록으로/ });
    expect(backToListButton).toBeInTheDocument();
    expect(backToListButton.closest('a')).toHaveAttribute('href', '/introductions');
  });
}); 