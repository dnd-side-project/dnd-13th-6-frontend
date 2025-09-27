'use client';
import React, { useState } from 'react';
import { addMonths, subMonths } from 'date-fns';
import CalendarHeader from './CalendarHeader';
import CalendarDays from './CalendarDays';
import CalendarCells from './CalendarCells';
import CalendarMenu from './CalendarMenu';
import CalendarStats from './CalendarStats';

export interface RunRecord {
  date: string; // YYYY-MM-DD
}

function Calendar() {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const records: RunRecord[] = [
    { date: '2025-09-01' },
    { date: '2025-09-05' },
    { date: '2025-09-10' },
    { date: '2025-09-15' },
    { date: '2025-09-25' }
  ];

  const prevMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
  };

  const nextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };

  return (
    <div className="bg-background flex h-full w-full flex-col rounded-lg text-gray-900 shadow-lg dark:text-gray-100">
      <CalendarMenu />
      <CalendarHeader
        currentMonth={currentMonth}
        prevMonth={prevMonth}
        nextMonth={nextMonth}
      />
      <CalendarDays />
      <CalendarCells currentMonth={currentMonth} records={records} />
      <div className="bg-gray-80 my-10 h-[1px]" />

      <CalendarStats />
    </div>
  );
}

export default Calendar;
