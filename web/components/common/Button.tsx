'use client';
import { useState } from 'react';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

type ButtonProps = {
  disabled?: boolean;
  children: string;
  className?: string; // 외부 class 추가 가능
  onClick?: () => void;
};

export default function Button({
  disabled,
  children,
  className,
  onClick = () => {}
}: ButtonProps) {
  const [isPressed, setIsPressed] = useState(false);

  const buttonClass = twMerge(
    clsx(
      'font-pretendard font-bold text-black px-6 py-2 rounded-xl', // 기본값
      isPressed && 'bg-pressed',
      disabled && 'bg-disabled',
      !isPressed && !disabled && 'bg-primary',
      className
    )
  );

  return (
    <button
      className={buttonClass}
      onClick={() => {
        if (!disabled) {
          setIsPressed(true);
          onClick();
        }
      }}
    >
      {children}
    </button>
  );
}
