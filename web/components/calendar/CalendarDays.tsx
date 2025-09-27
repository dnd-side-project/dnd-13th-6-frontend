import React from 'react';

function CalendarDays() {
  const days = ['일', '월', '화', '수', '목', '금', '토'];

  return (
    <div className="mt-4 grid grid-cols-7 gap-1">
      {days.map(day => (
        <div
          key={day}
          className="text-gray-60 text-center text-sm text-[12px] leading-[24px] font-medium"
        >
          {day}
        </div>
      ))}
    </div>
  );
}

export default CalendarDays;
