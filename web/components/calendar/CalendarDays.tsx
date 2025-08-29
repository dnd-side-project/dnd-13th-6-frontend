
import React from 'react';

function CalendarDays() {
  const days = ['일', '월', '화', '수', '목', '금', '토'];

  return (
    <div className="grid grid-cols-7 gap-1">
      {days.map((day) => (
        <div key={day} className="text-center text-sm font-medium text-gray-500 dark:text-gray-400">
          {day}
        </div>
      ))}
    </div>
  );
}

export default CalendarDays;
