
"use client";
import React from 'react';
import {
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addDays,
  format,
  isSameMonth,
  isSameDay,
} from 'date-fns';

interface RunRecord {
  startTime: number;
  totalDistance: number;
  averagePace: string;
  totalTime: string;
}

interface CalendarCellsProps {
  currentMonth: Date;
  selectedDate: Date;
  onDateClick: (day: Date) => void;
  records: RunRecord[];
}

function CalendarCells({ currentMonth, selectedDate, onDateClick, records }: CalendarCellsProps) {
  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart);
  const endDate = endOfWeek(monthEnd);

  const rows = [];
  let days = [];
  let day = startDate;
  let formattedDate = '';

  while (day <= endDate) {
    for (let i = 0; i < 7; i++) {
      formattedDate = format(day, 'd');
      const cloneDay = day;
      const recordsForDay = records.filter((record) =>
        isSameDay(new Date(record.startTime), day)
      );

      days.push(
        <div
          className={`flex flex-col items-center justify-start pt-2 cursor-pointer rounded-lg transition-colors duration-200 hover:bg-gray-200 dark:hover:bg-gray-700 ${
            !isSameMonth(day, monthStart) ? 'text-gray-400 dark:text-gray-600' : ''
          }`}
          key={day.toString()}
          onClick={() => onDateClick(cloneDay)}
        >
          <span
            className={`w-8 h-8 flex items-center justify-center rounded-full ${
              isSameDay(day, selectedDate)
                ? 'bg-blue-500 text-white dark:bg-blue-700 dark:text-white'
                : ''
            }`}>
            {formattedDate}
          </span>
          <div className="mt-1 w-full flex-grow overflow-y-auto px-1">
            {recordsForDay.map((record, index) => (
              <div
                key={index}
                className="text-xs text-center bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-md mb-1 px-1"
              >
                {record.totalDistance}km
              </div>
            ))}
          </div>
        </div>
      );
      day = addDays(day, 1);
    }
    rows.push(
      <div className="grid grid-cols-7 gap-1 flex-grow" key={day.toString()}>
        {days}
      </div>
    );
    days = [];
  }

  return <div className="flex flex-col flex-grow">{rows}</div>;
}

export default CalendarCells;
