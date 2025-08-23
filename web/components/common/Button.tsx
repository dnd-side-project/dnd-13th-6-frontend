'use client';
import { useState } from 'react';
import { twMerge } from 'tailwind-merge';

type ButtonProps = {
  disabled?: boolean;
  children: string;
  className?: string; // 외부 class 추가 가능
  onClickAction?: () => void;
};

export default function Button({
  disabled,
  children,
  className,
  onClickAction = () => {}
}: ButtonProps) {
  const [isPressed, setIsPressed] = useState(false);

  const handlePressStart = () => {
    if (!disabled) {
      setIsPressed(true);
    }
  };

  const handlePressEnd = () => {
    if (!disabled) {
      setIsPressed(false);
    }
  };

  const buttonClass = twMerge(
    'button-title5 px-6 py-2 rounded-xl', // 기본값
    'transition-colors', // 색상 변경 애니메이션
    isPressed && 'bg-pressed',
    disabled && 'bg-disabled',
    !isPressed && !disabled && 'bg-primary',
    className
  );

  return (
    <button
      className={buttonClass}
      onClick={e => {
        if (!disabled) {
          e.stopPropagation();
          onClickAction();
        }
      }}
      onTouchStart={handlePressStart}
      onTouchEnd={handlePressEnd}
      onTouchCancel={handlePressEnd} // 터치 취소 시 상태 초기화
    >
      {children}
    </button>
  );
}
