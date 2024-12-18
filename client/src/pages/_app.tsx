import type { AppProps } from 'next/app';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { useState, useEffect } from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import { Geist, Geist_Mono } from 'next/font/google';
import Navigation from '@/widgets/navigation/ui/Navigation';
import theme from '@/shared/lib/theme';
import '@/shared/ui/globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,
      gcTime: 60 * 1000,
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

export default function App({ Component, pageProps }: AppProps) {
  const [isMockingEnabled, setIsMockingEnabled] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined' && process.env.NEXT_PUBLIC_API_MOCKING === 'enabled') {
      import('@/shared/api/mocks/browser').then(({ worker }) => {
        worker.start().then(() => {
          setIsMockingEnabled(true);
        });
      });
    }

    if (typeof window !== 'undefined' && process.env.NEXT_PUBLIC_API_MOCKING === 'disabled') {
      setIsMockingEnabled(true);
    }
  }, []);

  if (!isMockingEnabled) {
    return <div>Mocking is enabled</div>;
  }

  return (
    <>
      <style jsx global>{`
        :root {
          --font-geist-sans: ${geistSans.style.fontFamily};
          --font-geist-mono: ${geistMono.style.fontFamily};
        }
      `}</style>
      <QueryClientProvider client={queryClient}>
        <ChakraProvider theme={theme}>
          <Navigation />
          <Component {...pageProps} />
        </ChakraProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </>
  );
} 