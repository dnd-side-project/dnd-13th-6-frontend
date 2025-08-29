'use client';
import React from 'react';

interface DecimalInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  onBlur?: () => void;
  className?: string;
  ref?: React.RefObject<HTMLInputElement>;
}

const DecimalInput = ({
  value,
  onChange,
  onBlur,
  placeholder,
  className,
  ref
}: DecimalInputProps) => {
  const validateDecimalInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value;
    // 숫자와 점 이외의 문자 제거
    val = val.replace(/[^0-9.]/g, '');

    // 점이 두 개 이상일 경우 첫 번째 점만 남김
    const dotIndex = val.indexOf('.');
    if (dotIndex > -1) {
      const afterDot = val.substring(dotIndex + 1).replace(/\./g, '');
      val = val.substring(0, dotIndex + 1) + afterDot;
    }

    // 소수점 둘째 자리까지만 허용
    const parts = val.split('.');
    if (parts[1] && parts[1].length > 2) {
      val = `${parts[0]}.${parts[1].substring(0, 2)}`;
    }

    onChange(val);
  };

  return (
    <input
      ref={ref}
      className={className}
      type="number"
      placeholder={placeholder}
      inputMode="decimal"
      value={value}
      onChange={validateDecimalInput}
      onBlur={onBlur}
    />
  );
};

export default DecimalInput;
