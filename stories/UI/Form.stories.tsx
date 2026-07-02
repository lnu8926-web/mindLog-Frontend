import type { Meta, StoryObj } from '@storybook/nextjs';

import { ChatInputBar } from '@/features/send-message/ChatInputBar';
import { CheckboxItem, Input, Label, RadioGroup, Switch } from '@/shared/ui';
import { StoryFrame } from '../helpers/StoryFrame';

const meta = {
  title: 'UI/Form',
  component: Input,
  tags: ['autodocs'],
  args: {
    placeholder: '닉네임을 입력해주세요',
    disabled: false,
    'aria-invalid': false,
  },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <StoryFrame>
      <div className="space-y-2">
        <Label htmlFor="nickname">닉네임</Label>
        <Input id="nickname" {...args} />
      </div>
    </StoryFrame>
  ),
};

export const Variant: Story = {
  render: () => (
    <StoryFrame>
      <div className="space-y-5">
        <div className="space-y-2">
          <Label htmlFor="email">이메일</Label>
          <Input id="email" type="email" defaultValue="mindlog@example.com" />
        </div>
        <CheckboxItem label="AI 마음 분석에 동의해요." checked onChange={() => {}} showTag={false} />
        <RadioGroup
          legend="리포트 종류"
          name="report-type"
          value="weekly"
          onChange={() => {}}
          options={[
            { value: 'weekly', label: '주간 리포트' },
            { value: 'monthly', label: '월간 리포트' },
          ]}
        />
        <div className="flex items-center justify-between rounded-xl bg-white p-4">
          <span className="text-prime-800 text-sm font-medium">상담 알림</span>
          <Switch checked onCheckedChange={() => {}} />
        </div>
      </div>
    </StoryFrame>
  ),
};

export const Disabled: Story = {
  args: {
    disabled: true,
    value: '수정할 수 없는 값',
  },
};

export const ChatInput: Story = {
  render: () => (
    <StoryFrame width="lg" className="bg-cta-300">
      <ChatInputBar
        value="오늘은 생각보다 마음이 차분했어요."
        onChange={() => {}}
        onSend={() => {}}
        onEndChat={() => {}}
      />
    </StoryFrame>
  ),
};

export const ChatInputDisabled: Story = {
  render: () => (
    <StoryFrame width="lg" className="bg-cta-300">
      <ChatInputBar value="" onChange={() => {}} onSend={() => {}} disabled />
    </StoryFrame>
  ),
};
