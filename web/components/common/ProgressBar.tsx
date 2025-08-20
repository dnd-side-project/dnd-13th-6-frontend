import React from 'react';
import { twMerge } from 'tailwind-merge';

interface ProgressBarProps {
  progress: number; // 0 to 100
  className?: string;
  backgroundColor?: string;
  barColor?: string;
}

export const ProgressBar = ({
  progress,
  className,
  backgroundColor,
  barColor
}: ProgressBarProps) => {
  const clampedProgress = Math.min(Math.max(progress, 0), 100);

  return (
    //배경
    <div
      className={twMerge(
        'h-2.5 w-full rounded-full bg-gray-700',
        className,
        backgroundColor
      )}
    >
      {/*초록색*/}
      <div
        className={twMerge(
          'bg-primary h-2.5 rounded-full',
          className,
          barColor
        )}
        style={{ width: `${clampedProgress}%` }}
      />
    </div>
  );
};
export default ProgressBar;
