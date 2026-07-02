import type { Meta, StoryObj } from '@storybook/nextjs';

import { ChatMainArea } from '@/widgets/chat-main-area';
import { ChatSidebar } from '@/widgets/chat-sidebar';
import { chatMessages, chatSessionGroups, emotionCardMock } from '../mocks/project-data';

const meta = {
  title: 'Showcase/Chat',
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <main className="bg-bg-light flex h-screen overflow-hidden">
      <ChatSidebar activeSessionId="session-1" sessionGroups={chatSessionGroups} />
      <section className="flex min-w-0 flex-1 p-6">
        <ChatMainArea initialMessages={chatMessages} sessionId="session-1" />
      </section>
    </main>
  ),
};

export const Loading: Story = {
  render: () => (
    <main className="bg-bg-light flex h-screen overflow-hidden">
      <ChatSidebar activeSessionId="session-1" sessionGroups={chatSessionGroups} />
      <section className="flex min-w-0 flex-1 p-6">
        <ChatMainArea
          initialMessages={[
            ...chatMessages,
            { variant: 'ai', senderName: '나봄이', isLoading: true, avatarSrc: '/images/personas/nabomi-44.png' },
          ]}
          sessionId="session-1"
          isFinalizing
          finalizeStatusMessage="마음 기록 카드를 생성하고 있습니다."
        />
      </section>
    </main>
  ),
};

export const VariantEmotionCard: Story = {
  render: () => (
    <main className="bg-bg-light flex h-screen overflow-hidden">
      <ChatSidebar activeSessionId="session-1" sessionGroups={chatSessionGroups} />
      <section className="flex min-w-0 flex-1 p-6">
        <ChatMainArea
          initialMessages={[
            ...chatMessages,
            {
              variant: 'ai',
              senderName: '나봄이',
              avatarSrc: '/images/personas/nabomi-44.png',
              emotionCardData: emotionCardMock,
            },
          ]}
          sessionId="session-1"
          isSessionActive={false}
        />
      </section>
    </main>
  ),
};

export const EmptyData: Story = {
  render: () => (
    <main className="bg-bg-light flex h-screen overflow-hidden">
      <ChatSidebar sessionGroups={[]} />
      <section className="flex min-w-0 flex-1 p-6">
        <ChatMainArea initialMessages={[]} isSessionActive={false} />
      </section>
    </main>
  ),
};
