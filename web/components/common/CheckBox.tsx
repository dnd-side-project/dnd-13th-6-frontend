import React from 'react';
import { Check } from 'lucide-react';

function CheckBox({
  isClicked,
  onClick,
  text,
  className
}: {
  isClicked: boolean;
  onClick: () => void;
  text: string;
  className?: string;
}) {
  return (
    <label
      className={`flex items-center cursor-pointer ${className}`}
      onClick={onClick}
    >
      <div
        className={`w-[20px] h-[20px] border-1 rounded-sm mr-2 flex justify-center items-center ${
          isClicked ? 'bg-primary border-primary' : 'border-white '
        }`}
      >
        <Check
          size={16}
          className={`${isClicked ? 'block' : 'hidden'} text-black `}
          strokeWidth={3}
        />
      </div>
      <p className="pretendard-headline2 text-gray-20">{text}</p>
    </label>
  );
}

export default CheckBox;
