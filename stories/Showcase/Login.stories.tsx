import type { Meta, StoryObj } from '@storybook/nextjs';

import { LoginContent } from '@/features/auth/LoginContent';
import AuroraBackground from '@/shared/ui/AuroraBackground';

const meta = {
  title: 'Showcase/Login',
  component: LoginContent,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  args: {
    isLoading: false,
    loadingProvider: null,
    error: null,
  },
} satisfies Meta<typeof LoginContent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <AuroraBackground>
      <LoginContent {...args} onLogin={async () => {}} />
    </AuroraBackground>
  ),
};

export const Loading: Story = {
  args: {
    isLoading: true,
    loadingProvider: 'kakao',
  },
  render: Default.render,
};

export const Error: Story = {
  args: {
    error: '소셜 로그인 연결에 실패했습니다. 잠시 후 다시 시도해주세요.',
  },
  render: Default.render,
};
