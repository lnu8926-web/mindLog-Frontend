import type { ReactNode } from 'react';

import { cn } from '@/shared/lib/utils';

type StoryFrameProps = {
  children: ReactNode;
  className?: string;
  width?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
};

const WIDTH_CLASS: Record<NonNullable<StoryFrameProps['width']>, string> = {
  sm: 'w-[360px]',
  md: 'w-[520px]',
  lg: 'w-[760px]',
  xl: 'w-[1040px]',
  full: 'w-full',
};

export function StoryFrame({ children, className, width = 'md' }: StoryFrameProps) {
  return (
    <div className={cn('bg-bg-light min-h-40 rounded-2xl p-6', WIDTH_CLASS[width], className)}>
      {children}
    </div>
  );
}
