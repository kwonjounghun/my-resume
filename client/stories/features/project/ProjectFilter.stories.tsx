import type { Meta, StoryObj } from '@storybook/react';
import { ProjectFilter } from '@/features/project/ui/ProjectFilter';
import { Box } from '@chakra-ui/react';

const meta = {
  title: 'Features/Project/ProjectFilter',
  component: ProjectFilter,
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
} satisfies Meta<typeof ProjectFilter>;

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
    onFilterChange: () => { },
    onReset: () => { },
  },
};

export const Mobile: Story = {
  args: {
    filter: mockFilter,
    onFilterChange: () => { },
    onReset: () => { },
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
};

export const WithSearchQuery: Story = {
  args: {
    filter: {
      ...mockFilter,
      searchQuery: '프로젝트',
    },
    onFilterChange: () => { },
    onReset: () => { },
  },
}; 