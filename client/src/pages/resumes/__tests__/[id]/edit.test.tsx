import { render, screen, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ChakraProvider } from '@chakra-ui/react';
import EditResumePage from '../../[id]/edit';
import { getResume } from '@/entities/resume/api/getResume';

jest.mock('@/entities/resume/api/getResume');
jest.mock('next/router', () => ({
  useRouter: () => ({
    query: { id: '1' },
  }),
}));

describe('EditResumePage', () => {
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
  });

  const renderPage = () => {
    return render(
      <QueryClientProvider client={queryClient}>
        <ChakraProvider>
          <EditResumePage />
        </ChakraProvider>
      </QueryClientProvider>
    );
  };

  it('이력서 수정 폼이 렌더링되어야 한다', async () => {
    renderPage();

    await waitFor(() => {
      expect(screen.getByLabelText(/제목/)).toHaveValue('신입 프론트엔드 개발자 이력서');
      expect(screen.getByLabelText(/내용/)).toHaveValue('이력서 내용');
      expect(screen.getByRole('button', { name: '수정하기' })).toBeInTheDocument();
    });
  });
}); 