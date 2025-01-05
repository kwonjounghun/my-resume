import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '../../src/shared/components/Button';

const meta = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    children: {
      control: 'text',
      description: '버튼 내부 텍스트',
    },
    disabled: {
      control: 'boolean',
      description: '버튼 비활성화 여부',
    },
    onClick: { action: 'clicked' },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

// 기본 버튼
export const Default: Story = {
  args: {
    children: '버튼',
  },
};

// 비활성화된 버튼
export const Disabled: Story = {
  args: {
    children: '비활성화 버튼',
    disabled: true,
  },
};

// 긴 텍스트 버튼
export const LongText: Story = {
  args: {
    children: '매우 긴 텍스트를 가진 버튼입니다',
  },
};

// 사용 예시를 보여주는 스토리
export const Examples: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', flexDirection: 'column' }}>
      <Button>기본 버튼</Button>
      <Button disabled>비활성화 버튼</Button>
      <Button onClick={() => alert('클릭됨!')}>클릭 이벤트 버튼</Button>
    </div>
  ),
}; 