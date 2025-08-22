import React from 'react';
import { twMerge } from 'tailwind-merge';

interface ProgressBarProps {
  progress: number; // 0 to 100
  className?: string;
  backgroundStyle?: string;
  barStyle?: string;
}

export const ProgressBar = ({
  progress,
  className,
  backgroundStyle,
  barStyle
}: ProgressBarProps) => {
  const clampedProgress = Math.min(Math.max(progress, 0), 100);

  return (
    //배경
    <div
      className={twMerge(
        'h-2.5 w-full rounded-full bg-gray-700',
        className,
        backgroundStyle
      )}
    >
      {/*초록색*/}
      <div
        className={twMerge(
          'bg-primary h-2.5 justify-center rounded-full',
          className,
          barStyle
        )}
        style={{ width: `${clampedProgress}%` }}
      />
    </div>
  );
};
export default ProgressBar;
