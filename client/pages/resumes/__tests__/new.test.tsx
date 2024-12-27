import { render, screen } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ChakraProvider } from '@chakra-ui/react';
import CreateResumePage from '../new';

// Mock next/router
jest.mock('next/router', () => ({
  useRouter: jest.fn(() => ({
    push: jest.fn(),
  })),
}));

// Mock ResumeForm component
jest.mock('@/widgets/resume-form/ui/ResumeForm', () => {
  return function MockResumeForm() {
    return <div data-testid="resume-form">Resume Form</div>;
  };
});

describe('CreateResumePage', () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

  const renderPage = () => {
    return render(
      <QueryClientProvider client={queryClient}>
        <ChakraProvider>
          <CreateResumePage />
        </ChakraProvider>
      </QueryClientProvider>
    );
  };

  it('페이지 제목이 표시되어야 한다', () => {
    renderPage();
    expect(screen.getByText('이력서 작성')).toBeInTheDocument();
  });

  it('ResumeForm 컴포넌트가 렌더링되어야 한다', () => {
    renderPage();
    expect(screen.getByTestId('resume-form')).toBeInTheDocument();
  });
}); 