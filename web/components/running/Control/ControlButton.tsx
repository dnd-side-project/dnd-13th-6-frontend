// components/ui/ControlButton.tsx
import { ReactNode } from 'react';

export default function ControlButton({
  children,
  onClick,
  type
}: {
  children: ReactNode;
  onClick?: () => void;
  type?: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex h-[78px] w-[78px] items-center justify-center rounded-full ${
        type === 'stop' ? 'bg-[#48484a]' : 'bg-primary'
      }`}
    >
      {children}
    </button>
  );
}
