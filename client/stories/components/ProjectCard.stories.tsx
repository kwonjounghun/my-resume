import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { ProjectCard } from '../../src/shared/components/ProjectCard/ProjectCard';

const meta = {
  title: 'Components/ProjectCard',
  component: ProjectCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    layout: {
      control: 'radio',
      options: ['vertical', 'horizontal'],
      description: '카드 레이아웃 방향',
    },
    onClick: { action: 'clicked' },
  },
} satisfies Meta<typeof ProjectCard>;

export default meta;
type Story = StoryObj<typeof meta>;

const mockProject = {
  id: '1',
  title: '프로젝트 관리 시스템 개발',
  companyName: '테크 컴퍼니',
  startDate: '2023-01',
  endDate: '2023-06',
  keywords: ['React', 'TypeScript', 'Next.js', 'MSW'],
  situation: '프로젝트 관리 시스템 개발',
  task: '프로젝트 관리 시스템 개발',
  action: '프로젝트 관리 시스템 개발',
  result: '프로젝트 관리 시스템 개발',
  isPublic: true,
  workExperienceId: '1',
};

export const Vertical: Story = {
  args: {
    project: mockProject,
    layout: 'vertical',
  },
};

export const Horizontal: Story = {
  args: {
    project: mockProject,
    layout: 'horizontal',
  },
};

const mockProjectWithManyTags = {
  ...mockProject,
  keywords: [
    'React',
    'TypeScript',
    'Next.js',
    'MSW',
    'Chakra UI',
    'Emotion',
    'React Query',
    'Zustand',
    'Jest',
    'Playwright'
  ],
};

export const WithManyTags: Story = {
  args: {
    project: mockProjectWithManyTags,
    layout: 'vertical',
    maxVisibleTags: 5,
  },
};

export const CustomMaxTags: Story = {
  args: {
    project: mockProjectWithManyTags,
    layout: 'horizontal',
    maxVisibleTags: 3,
  },
};

const mockProjectWithLongTitle = {
  ...mockProject,
  title: '매우 긴 프로젝트 제목입니다. 이 프로젝트는 정말 긴 제목을 가지고 있어서 두 줄까지 표시가 되어야 하는 프로젝트입니다. 50자가 넘어가면 말줄임표시가 됩니다.',
};

export const LongTitle: Story = {
  args: {
    project: mockProjectWithLongTitle,
    layout: 'vertical',
  },
};

export const LongTitleHorizontal: Story = {
  args: {
    project: mockProjectWithLongTitle,
    layout: 'horizontal',
  },
};

export const VariousTitleLengths: Story = {
  args: {
    project: mockProject,
    layout: 'horizontal',
  },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '500px' }}>
      <ProjectCard
        project={mockProject}
        layout="horizontal"
      />
      <ProjectCard
        project={{
          ...mockProject,
          title: '두 줄 정도의 적당한 길이를 가진 프로젝트 제목입니다. 이정도면 깔끔하게 보일 것 같네요.이정도면 깔끔하게 보일 것 같네요.',
        }}
        layout="horizontal"
      />
      <ProjectCard
        project={mockProjectWithLongTitle}
        layout="horizontal"
      />
    </div>
  ),
};
