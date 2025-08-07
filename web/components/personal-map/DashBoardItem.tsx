import React from 'react';

export default function DashBoardItem({
  title,
  value
}: {
  title: string;
  value: string;
}) {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="mb-2 text-base text-gray-600">{title}</div>
      <div className="text-[1.7rem] font-bold italic">{value}</div>
    </div>
  );
}
