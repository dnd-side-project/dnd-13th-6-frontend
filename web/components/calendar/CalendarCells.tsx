'use client';
import React from 'react';
import {
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addDays,
  format,
  isSameMonth,
  isSameDay
} from 'date-fns';
import { RunRecord } from './Calendar';

interface CalendarCellsProps {
  currentMonth: Date;
  records: RunRecord[];
}

function CalendarCells({ currentMonth, records }: CalendarCellsProps) {
  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart);
  const endDate = endOfWeek(monthEnd);

  const rows = [];
  let days = [];
  let day = startDate;
  let formattedDate = '';

  const recordDates = records.map(record => record.date);
  const today = new Date();

  while (day <= endDate) {
    for (let i = 0; i < 7; i++) {
      formattedDate = format(day, 'd');
      const dayHasRecord = recordDates.includes(format(day, 'yyyy-MM-dd'));

      days.push(
        <div
          className={`flex flex-col items-center justify-center rounded-lg p-1 ${
            !isSameMonth(day, monthStart) ? 'text-gray-600' : ''
          }`}
          key={day.toString()}
        >
          <span
            className={`text-pretendard-title3 font flex h-[44px] w-[44px] items-center justify-center rounded-full ${
              isSameDay(day, today)
                ? 'bg-calendar-selected-background text-calendar-selected-text text-[24px] leading-[25px] font-medium tracking-[0px]'
                : ''
            }`}
          >
            {formattedDate}
          </span>
          <div className="mt-1 flex w-full flex-grow items-center justify-center">
            {dayHasRecord && (
              <div className="bg-primary h-2 w-2 rounded-full" />
            )}
          </div>
        </div>
      );
      day = addDays(day, 1);
    }
    rows.push(
      <div className="grid grid-cols-7 gap-1" key={day.toString()}>
        {days}
      </div>
    );
    days = [];
  }

  return <div className="flex flex-col">{rows}</div>;
}

export default CalendarCells;
