import type { Meta, StoryObj } from '@storybook/nextjs';
import { Download, Send } from 'lucide-react';

import { Button } from '@/shared/ui/button';
import { StoryFrame } from '../helpers/StoryFrame';

const meta = {
  title: 'UI/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'ghost', 'allow', 'mode-dark', 'mode-light'],
    },
    semantic: {
      control: 'select',
      options: ['blue', 'yellow', 'red', 'green'],
    },
    size: {
      control: 'select',
      options: ['default', 'cta', 'sm', 'lg', 'icon'],
    },
  },
  args: {
    children: '버튼',
    variant: 'primary',
    semantic: 'blue',
    size: 'default',
    disabled: false,
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Variant: Story = {
  render: () => (
    <StoryFrame width="lg" className="flex flex-wrap gap-3">
      {(['primary', 'secondary', 'ghost'] as const).map((variant) => (
        <Button key={variant} variant={variant}>
          {variant}
        </Button>
      ))}
      {(['blue', 'yellow', 'red', 'green'] as const).map((semantic) => (
        <Button key={semantic} semantic={semantic}>
          {semantic}
        </Button>
      ))}
      <Button size="lg">
        <Download className="size-4" />
        다운로드
      </Button>
      <Button size="icon" aria-label="전송">
        <Send className="size-4" />
      </Button>
    </StoryFrame>
  ),
};

export const Disabled: Story = {
  args: {
    disabled: true,
    children: '비활성 버튼',
  },
};

export const Loading: Story = {
  render: () => (
    <Button disabled>
      <span className="size-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
      처리 중
    </Button>
  ),
};
