import { twMerge } from 'tailwind-merge';

export default function Card({
  children,
  className
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={twMerge(
        'text-gray-20 w-full rounded-3xl bg-white/10 p-5 backdrop-blur-sm',
        className
      )}
    >
      {children}
    </div>
  );
}
