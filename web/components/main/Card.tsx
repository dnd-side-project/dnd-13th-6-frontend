import { twMerge } from 'tailwind-merge';

export default function Card({
  children,
  className,
  onClick,
  onTouchEnd
}: {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  onTouchEnd?: () => void;
}) {
  return (
    <div
      onClick={onClick}
      onTouchEnd={onTouchEnd}
      className={twMerge(
        'text-gray-20 w-full rounded-3xl bg-white/10 p-5 backdrop-blur-sm',
        className
      )}
    >
      {children}
    </div>
  );
}
