// components/ui/ControlButton.tsx
import { ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

export default function ControlButton({
  children,
  onClick,
  type,
  className
}: {
  children: ReactNode;
  onClick?: () => void;
  type?: string;
  className?: string;
}) {
  return (
    <button
      onClick={onClick}
      className={twMerge(
        `flex h-[78px] w-[78px] items-center justify-center rounded-full ${
          type === 'stop' ? 'bg-gray-80' : 'bg-primary'
        }`,
        className
      )}
    >
      {children}
    </button>
  );
}
