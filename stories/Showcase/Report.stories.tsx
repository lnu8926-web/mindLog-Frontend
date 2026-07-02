import type { Meta, StoryObj } from '@storybook/nextjs';
import { useEffect, useState } from 'react';

import { EmotionAreaChart } from '@/components/report/EmotionAreaChart';
import { ReportCreationForm } from '@/components/report/ReportCreationForm';
import { ReportError } from '@/components/report/ReportError';
import { ReportPolling } from '@/components/report/ReportPolling';
import { monthlyEmotionTrend, weeklyEmotionTrend } from '../mocks/project-data';

function ReportLoadingPreview() {
  const [stage, setStage] = useState<{
    cycle: number;
    step: 'analyzing' | 'generating' | undefined;
  }>({ cycle: 0, step: undefined });

  useEffect(() => {
    const analyzingTimer = window.setTimeout(
      () => setStage((current) => ({ ...current, step: 'analyzing' })),
      700
    );
    const generatingTimer = window.setTimeout(
      () => setStage((current) => ({ ...current, step: 'generating' })),
      3200
    );
    const resetTimer = window.setTimeout(
      () => setStage((current) => ({ cycle: current.cycle + 1, step: undefined })),
      7200
    );

    return () => {
      window.clearTimeout(analyzingTimer);
      window.clearTimeout(generatingTimer);
      window.clearTimeout(resetTimer);
    };
  }, [stage.cycle]);

  return <ReportPolling key={stage.cycle} sseStep={stage.step} />;
}

const meta = {
  title: 'Showcase/Report',
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Dashboard: Story = {
  render: () => (
    <main className="bg-bg-light min-h-screen px-6 py-12">
      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[420px_1fr]">
        <section className="rounded-[24px] border border-prime-100 bg-white p-8 shadow-sm">
          <h1 className="text-prime-900 mb-2 text-2xl font-bold">마음 리포트 만들기</h1>
          <p className="text-prime-500 mb-8 text-sm">상담 기록이 충분한 기간을 선택해 분석을 시작합니다.</p>
          <ReportCreationForm onCreateReport={() => {}} />
        </section>
        <section className="space-y-8">
          <EmotionAreaChart data={weeklyEmotionTrend} type="weekly" />
          <EmotionAreaChart data={monthlyEmotionTrend} type="monthly" />
        </section>
      </div>
    </main>
  ),
};

export const Loading: Story = {
  render: () => (
    <main className="bg-bg-light min-h-screen px-6 py-12">
      <div className="mx-auto max-w-5xl">
        <ReportLoadingPreview />
      </div>
    </main>
  ),
};

export const Error: Story = {
  render: () => (
    <main className="bg-bg-light min-h-screen px-6 py-12">
      <ReportError onDismiss={() => {}} errorMessage="리포트 분석 요청이 만료되었습니다." />
    </main>
  ),
};

export const EmptyData: Story = {
  render: () => (
    <main className="bg-bg-light min-h-screen px-6 py-12">
      <div className="mx-auto max-w-5xl">
        <EmotionAreaChart data={[]} type="weekly" />
      </div>
    </main>
  ),
};
