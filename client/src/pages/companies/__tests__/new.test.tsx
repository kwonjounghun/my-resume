import { render, screen, waitFor } from '@testing-library/react';
import NewCompanyWishlistPage from '../new';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ChakraProvider } from '@chakra-ui/react';

jest.mock('next/router', () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));


describe('NewCompanyWishlistPage', () => {
  const queryClient = new QueryClient();
  const renderPage = () => {
    return render(
      <QueryClientProvider client={queryClient}>
        <ChakraProvider>
          <NewCompanyWishlistPage />
        </ChakraProvider>
      </QueryClientProvider>
    );
  };

  it('renders the page title and form', async () => {
    renderPage();

    await waitFor(async () => {
      expect(await screen.getByText('관심기업 등록')).toBeInTheDocument();
    });
  });
}); 