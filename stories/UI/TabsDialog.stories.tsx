import type { Meta, StoryObj } from '@storybook/nextjs';

import { Button, Dialog, StatusModal, Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/ui';
import { StoryFrame } from '../helpers/StoryFrame';

const meta = {
  title: 'UI/Tabs & Modal',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <StoryFrame>
      <Tabs defaultValue="credit">
        <TabsList>
          <TabsTrigger value="credit">크레딧 구매하기</TabsTrigger>
          <TabsTrigger value="event">이벤트</TabsTrigger>
        </TabsList>
        <TabsContent value="credit" className="rounded-xl bg-white p-5 text-sm text-prime-700">
          구매 가능한 크레딧 상품을 확인합니다.
        </TabsContent>
        <TabsContent value="event" className="rounded-xl bg-white p-5 text-sm text-prime-700">
          진행 중인 이벤트가 없습니다.
        </TabsContent>
      </Tabs>
    </StoryFrame>
  ),
};

export const Variant: Story = {
  render: () => (
    <Dialog isOpen onClose={() => {}} title="상담 종료">
      <div className="space-y-6">
        <p className="text-prime-700 text-sm leading-6">
          상담을 종료하면 지금까지의 대화를 바탕으로 마음 기록 카드가 생성됩니다.
        </p>
        <div className="flex gap-3">
          <Button variant="secondary" className="flex-1">
            이어하기
          </Button>
          <Button className="flex-1">종료하기</Button>
        </div>
      </div>
    </Dialog>
  ),
};

export const Loading: Story = {
  render: () => (
    <StatusModal
      isOpen
      onClose={() => {}}
      semantic="progress"
      title="리포트 생성 중"
      description="대화의 흐름과 감정 변화를 분석하고 있어요."
    />
  ),
};

export const Disabled: Story = {
  render: () => (
    <StatusModal
      isOpen
      onClose={() => {}}
      semantic="refund"
      title="환불 전 확인"
      description="환불 정책을 확인한 뒤 진행할 수 있습니다."
      showAgreement
      actions={[
        { label: '취소', variant: 'secondary', onClick: () => {} },
        { label: '환불하기', variant: 'primary', onClick: () => {} },
      ]}
    />
  ),
};
