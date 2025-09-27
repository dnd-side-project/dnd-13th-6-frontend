'use client';
import React from 'react';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface CalendarHeaderProps {
  currentMonth: Date;
  prevMonth: () => void;
  nextMonth: () => void;
}

function CalendarHeader({
  currentMonth,
  prevMonth,
  nextMonth
}: CalendarHeaderProps) {
  return (
    <div className="mt-8 flex items-center justify-between py-2">
      <div className="flex flex-col">
        <span className="text-[26px] font-bold text-white">
          {format(currentMonth, 'yyyy년 MMMM', { locale: ko })}
        </span>
      </div>
      <div className="flex items-center space-x-2">
        <button
          onClick={prevMonth}
          className="p-1 text-gray-900 dark:text-gray-100"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
        <button
          onClick={nextMonth}
          className="p-1 text-gray-900 dark:text-gray-100"
        >
          <ChevronRight className="h-6 w-6" />
        </button>
      </div>
    </div>
  );
}

export default CalendarHeader;
