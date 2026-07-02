import type { Meta, StoryObj } from '@storybook/nextjs';
import { Home, RotateCcw, ServerCrash } from 'lucide-react';

import { ErrorState } from '@/shared/ui/ErrorState';
import { CreditIcon } from '@/shared/ui/credit-icon';
import { ReportDetailSkeleton } from '@/components/report/ReportDetailSkeleton';
import { ReportError } from '@/components/report/ReportError';
import { StoryFrame } from '../helpers/StoryFrame';

const meta = {
  title: 'UI/Feedback',
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <ErrorState
      eyebrow="Server Error"
      code="506"
      title="일시적으로 연결이 불안정해요"
      description={['잠시 후 다시 시도해주세요.', '작업 중이던 내용은 최대한 보존됩니다.']}
      accentIcon={ServerCrash}
      actions={[
        { label: '다시 시도', onClick: () => {}, icon: RotateCcw },
        { label: '홈으로', href: '/', variant: 'secondary', icon: Home },
      ]}
      helpTitle="문제가 계속될 때"
      helpItems={['네트워크 상태를 확인한 뒤 새로고침해주세요.', '같은 문제가 반복되면 고객센터로 문의해주세요.']}
    />
  ),
};

export const Loading: Story = {
  render: () => (
    <StoryFrame width="xl">
      <ReportDetailSkeleton />
    </StoryFrame>
  ),
};

export const Variant: Story = {
  render: () => (
    <StoryFrame width="lg">
      <ReportError onDismiss={() => {}} errorMessage="AI 분석 서버 응답 시간이 초과되었습니다." />
    </StoryFrame>
  ),
};

export const EmptyData: Story = {
  render: () => (
    <StoryFrame width="lg" className="flex min-h-96 items-center justify-center">
      <div className="text-center">
        <div className="bg-secondary-100 mx-auto mb-4 flex size-16 items-center justify-center rounded-full">
          <ServerCrash className="text-prime-300 size-7" />
        </div>
        <p className="text-prime-800 text-lg font-semibold">표시할 데이터가 없습니다</p>
        <p className="text-prime-500 mt-2 text-sm">상담을 완료하면 이 영역에 기록이 표시됩니다.</p>
      </div>
    </StoryFrame>
  ),
};

export const CreditWarning: Story = {
  render: () => (
    <StoryFrame className="flex items-center justify-center bg-white">
      <div className="flex flex-col items-center gap-3">
        <CreditIcon />
        <p className="heading-04 text-prime-900">크레딧이 부족합니다</p>
      </div>
    </StoryFrame>
  ),
};
