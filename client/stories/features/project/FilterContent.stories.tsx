import type { Meta, StoryObj } from '@storybook/react';
import { FilterContent } from '@/features/project/ui/FilterContent';
import { Box } from '@chakra-ui/react';

const meta = {
  title: 'Features/Project/FilterContent',
  component: FilterContent,
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <Box width="800px">
        <Story />
      </Box>
    ),
  ],
} satisfies Meta<typeof FilterContent>;

export default meta;
type Story = StoryObj<typeof meta>;

const mockFilter = {
  searchField: 'title' as const,
  searchQuery: '',
  sortOrder: 'desc' as const,
};

export const Desktop: Story = {
  args: {
    filter: mockFilter,
    onChange: () => { },
    isModal: false,
  },
};

export const Mobile: Story = {
  args: {
    filter: mockFilter,
    onChange: () => { },
    isModal: true,
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
}; 