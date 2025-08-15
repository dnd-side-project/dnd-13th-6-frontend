import React from 'react';
import { twMerge } from 'tailwind-merge';

interface ProgressBarProps {
  progress: number; // 0 to 100
  className?: string;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ progress, className }) => {
  const clampedProgress = Math.min(Math.max(progress, 0), 100);

  return (
    //배경
    <div
      className={twMerge(
        'w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700',
        className
      )}
    >
      {/*초록색*/}
      <div
        className={twMerge('bg-primary rounded-full', className)}
        style={{ width: `${clampedProgress}%` }}
      />
    </div>
  );
};

export default ProgressBar;
