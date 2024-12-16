import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  config: {
    initialColorMode: 'light',
    useSystemColorMode: false,
  },
  styles: {
    global: {
      body: {
        bg: 'white',
        color: 'gray.900',
      },
    },
  },
  colors: {
    primary: {
      50: '#E5F3FF',
      100: '#CCE7FF',
      200: '#99CFFF',
      300: '#66B7FF',
      400: '#339FFF',
      500: '#0087FF',
      600: '#0066CC',
      700: '#004C99',
      800: '#003366',
      900: '#001933',
    },
    gray: {
      50: '#F9FAFB',
      100: '#F2F4F6',
      200: '#E5E8EB',
      300: '#D1D6DB',
      400: '#B0B8C1',
      500: '#8B95A1',
      600: '#6B7684',
      700: '#4E5968',
      800: '#333D4B',
      900: '#191F28',
    },
  },
  fonts: {
    heading: 'var(--font-geist-sans)',
    body: 'var(--font-geist-sans)',
    mono: 'var(--font-geist-mono)',
  },
  components: {
    Button: {
      baseStyle: {
        fontWeight: 'semibold',
        borderRadius: 'lg',
      },
      sizes: {
        lg: {
          fontSize: 'md',
          px: 6,
          py: 3,
        },
      },
      variants: {
        solid: {
          bg: 'primary.500',
          color: 'white',
          _hover: {
            bg: 'primary.600',
          },
        },
        outline: {
          border: '1px solid',
          borderColor: 'primary.500',
          color: 'primary.500',
          _hover: {
            bg: 'primary.50',
          },
        },
      },
      defaultProps: {
        size: 'lg',
        variant: 'solid',
      },
    },
    Card: {
      baseStyle: {
        p: 6,
        bg: 'white',
        borderRadius: 'xl',
        boxShadow: 'sm',
      },
    },
  },
});

export default theme; 