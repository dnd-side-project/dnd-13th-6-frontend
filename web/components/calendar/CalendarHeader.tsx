
"use client";
import React from 'react';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface CalendarHeaderProps {
  currentMonth: Date;
  prevMonth: () => void;
  nextMonth: () => void;
}

function CalendarHeader({ currentMonth, prevMonth, nextMonth }: CalendarHeaderProps) {
  const today = new Date();

  return (
    <div className="flex items-center justify-between py-2">
      <div className="flex flex-col">
        <span className="text-lg font-bold text-gray-900 dark:text-gray-100">
          {format(currentMonth, 'yyyy년 MMMM', { locale: ko })}
        </span>
        <span className="text-sm text-gray-500 dark:text-gray-400">
          {format(today, 'yyyy년 MM월 dd일', { locale: ko })}
        </span>
      </div>
      <div className="flex items-center space-x-2">
        <button onClick={prevMonth} className="p-1 text-gray-900 dark:text-gray-100">
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button onClick={nextMonth} className="p-1 text-gray-900 dark:text-gray-100">
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
}

export default CalendarHeader;
