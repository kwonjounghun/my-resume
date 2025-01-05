import React from 'react';
import type { Preview } from "@storybook/react";
import { theme } from '../src/shared/styles/tokens';
import { Global } from '@emotion/react';
import { ChakraProvider, baseTheme } from '@chakra-ui/react';

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [
    (Story) => (
      <ChakraProvider>
        <Global
          styles={{
            body: {
              margin: 0,
              fontFamily: theme.typography.fontFamily.base,
            },
          }}
        />
        <Story />
      </ChakraProvider>
    ),
  ],
};

export default preview; 