import { render, screen } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ChakraProvider } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import NewRetrospectivePage from '../new';

// Mock next/router
jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

const renderPage = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

  // Mock router implementation
  (useRouter as jest.Mock).mockImplementation(() => ({
    push: jest.fn(),
  }));

  return render(
    <QueryClientProvider client={queryClient}>
      <ChakraProvider>
        <NewRetrospectivePage />
      </ChakraProvider>
    </QueryClientProvider>
  );
};

describe('NewRetrospectivePage', () => {
  it('목록으로 돌아가는 버튼이 렌더링되어야 한다', () => {
    renderPage();
    const backToListButton = screen.getByRole('button', { name: /목록으로/ });
    expect(backToListButton).toBeInTheDocument();
    expect(backToListButton.closest('a')).toHaveAttribute('href', '/retrospectives');
  });
}); 