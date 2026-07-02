import type { Meta, StoryObj } from '@storybook/nextjs';

import { EmotionAreaChart } from '@/components/report/EmotionAreaChart';
import { EmotionCard } from '@/widgets/emotion-card';
import { StoryFrame } from '../helpers/StoryFrame';
import { emotionCardMock, monthlyEmotionTrend, weeklyEmotionTrend } from '../mocks/project-data';

const meta = {
  title: 'UI/Emotion & Chart',
  tags: ['autodocs'],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <StoryFrame className="flex justify-center">
      <EmotionCard data={emotionCardMock} width={320} />
    </StoryFrame>
  ),
};

export const Variant: Story = {
  render: () => (
    <StoryFrame width="xl">
      <EmotionAreaChart data={weeklyEmotionTrend} type="weekly" />
    </StoryFrame>
  ),
};

export const EmptyData: Story = {
  render: () => (
    <StoryFrame width="xl">
      <EmotionAreaChart data={[]} type="monthly" />
    </StoryFrame>
  ),
};

export const Monthly: Story = {
  render: () => (
    <StoryFrame width="xl">
      <EmotionAreaChart data={monthlyEmotionTrend} type="monthly" />
    </StoryFrame>
  ),
};
