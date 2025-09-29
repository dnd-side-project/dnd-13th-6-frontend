import React from 'react';
import { isSameDay, startOfWeek, addDays } from 'date-fns';
import { twMerge } from 'tailwind-merge';

interface CalendarDaysProps {
  currentDate?: Date;
  selectedView?: 'week' | 'month';
}

function CalendarDays({ currentDate, selectedView }: CalendarDaysProps) {
  const days = ['월', '화', '수', '목', '금', '토', '일'];
  const today = new Date();
  const weekStartDate = currentDate
    ? startOfWeek(currentDate, { weekStartsOn: 1 })
    : null;

  return (
    <div className="mt-4 grid grid-cols-7 gap-1">
      {days.map((day, index) => {
        const dayInWeek = weekStartDate ? addDays(weekStartDate, index) : null;
        const isToday = dayInWeek && isSameDay(today, dayInWeek);

        return (
          <div key={day} className="flex items-center justify-center">
            <span
              className={twMerge(
                'flex h-[14px] w-[44px] items-center justify-center text-[12px] leading-[24px] font-medium',
                selectedView === 'week' && isToday
                  ? 'bg-calendar-selected-background text-calendar-selected-text rounded-t-[22px] pt-4 pb-4'
                  : 'text-gray-60'
              )}
            >
              {day}
            </span>
          </div>
        );
      })}
    </div>
  );
}

export default CalendarDays;
