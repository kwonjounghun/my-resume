import { ChakraProvider, createLocalStorageManager } from '@chakra-ui/react';

const manager = createLocalStorageManager('test-theme');

export const TestProvider = ({ children }: { children: React.ReactNode }) => (
  <ChakraProvider colorModeManager={manager}>
    {children}
  </ChakraProvider>
); 