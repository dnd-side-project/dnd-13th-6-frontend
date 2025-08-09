// components/ui/ControlButton.tsx
import { ReactNode } from 'react';

export default function ControlButton({
  children,
  onClick
}: {
  children: ReactNode;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="flex h-[78px] w-[78px] items-center justify-center rounded-full bg-primary"
    >
      {children}
    </button>
  );
}
