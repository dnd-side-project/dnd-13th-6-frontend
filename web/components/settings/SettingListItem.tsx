import { CaretRight } from '@phosphor-icons/react';
import React from 'react';

export default function SettingListItem({
  text,
  onClick
}: {
  text: string;
  onClick: () => void;
}) {
  return (
    <div>
      {/* 여기에 w-full과 items-center 추가 */}
      <button
        onClick={onClick}
        className="flex h-[55px] w-full items-center justify-between"
      >
        <span className="text-[1.0625rem] leading-[22px] tracking-[-0.025em]">
          {text}
        </span>
        <CaretRight size={16} />
      </button>
    </div>
  );
}
