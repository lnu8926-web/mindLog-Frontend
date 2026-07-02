import type { Meta, StoryObj } from '@storybook/nextjs';
import { Gift } from 'lucide-react';

import { CreditProductCard, RefundPolicyNotice } from '@/features/purchase-credit';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/ui/tabs';
import { creditProducts } from '../mocks/project-data';

const meta = {
  title: 'Showcase/Shop',
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <main className="layout-container px-gutter bg-bg-light flex min-h-screen flex-col items-center py-16">
      <Tabs defaultValue="credit" className="flex w-full flex-col items-center">
        <TabsList className="mb-12">
          <TabsTrigger value="credit">크레딧 구매하기</TabsTrigger>
          <TabsTrigger value="event">이벤트</TabsTrigger>
        </TabsList>
        <TabsContent value="credit" className="w-full">
          <div className="flex flex-col items-center gap-16">
            <div className="mx-auto grid w-full max-w-300 grid-cols-1 gap-10 md:grid-cols-3">
              {creditProducts.map((product) => (
                <CreditProductCard key={product.id} product={product} onPurchase={() => {}} />
              ))}
            </div>
            <div className="w-full max-w-300">
              <RefundPolicyNotice />
            </div>
          </div>
        </TabsContent>
        <TabsContent value="event" className="w-full">
          <div className="flex flex-col items-center gap-4 py-24">
            <div className="bg-secondary-100 flex h-16 w-16 items-center justify-center rounded-full">
              <Gift size={28} strokeWidth={1.5} className="text-prime-400" />
            </div>
            <p className="text-prime-400 text-base">진행 중인 이벤트가 없습니다.</p>
          </div>
        </TabsContent>
      </Tabs>
    </main>
  ),
};

export const Loading: Story = {
  render: () => (
    <main className="bg-bg-light flex min-h-screen items-center justify-center">
      <div className="flex flex-col items-center gap-4 py-24">
        <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-gray-400" />
        <p className="text-prime-400 text-base">상품을 불러오는 중입니다...</p>
      </div>
    </main>
  ),
};

export const EmptyData: Story = {
  render: () => (
    <main className="bg-bg-light flex min-h-screen items-center justify-center">
      <div className="flex flex-col items-center gap-4 py-24">
        <div className="bg-secondary-100 flex h-16 w-16 items-center justify-center rounded-full">
          <Gift size={28} strokeWidth={1.5} className="text-prime-400" />
        </div>
        <p className="text-prime-400 text-base">구매 가능한 상품이 없습니다.</p>
      </div>
    </main>
  ),
};
