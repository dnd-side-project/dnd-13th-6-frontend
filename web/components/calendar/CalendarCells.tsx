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
import { RunRecord } from '@/components/Calendar/Calendar';
import { twMerge } from 'tailwind-merge';
import { motion } from 'framer-motion';

interface CalendarCellsProps {
  currentDate: Date;
  records: RunRecord[];
  selectedView: 'week' | 'month';
  setSelectedView: (view: 'week' | 'month') => void;
}

function CalendarCells({
  currentDate,
  records,
  selectedView,
  setSelectedView
}: CalendarCellsProps) {
  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(monthStart);

  const startDate =
    selectedView === 'week'
      ? startOfWeek(currentDate, { weekStartsOn: 1 })
      : startOfWeek(monthStart, { weekStartsOn: 1 });
  const endDate =
    selectedView === 'week'
      ? endOfWeek(currentDate, { weekStartsOn: 1 })
      : endOfWeek(monthEnd, { weekStartsOn: 1 });

  const rows = [];
  let days = [];
  let day = startDate;
  let formattedDate = '';

  const recordDates = new Set(records.map(record => record.date));
  const today = new Date();

  while (day <= endDate) {
    for (let i = 0; i < 7; i++) {
      formattedDate = format(day, 'd');
      const dayHasRecord = recordDates.has(format(day, 'yyyy-MM-dd'));
      const isToday = isSameDay(day, today);

      let shapeClass = 'rounded-full';
      if (isToday && selectedView === 'week') {
        shapeClass = ' rounded-b-[22px]';
      }
      if (selectedView === 'month') {
        shapeClass += ' w-[44px] h-[44px] mb-1';
      } else {
        shapeClass += ' h-[34px]';
      }

      let todayHighlightClass = '';
      let weekCalendar = '';
      if (isToday) {
        if (selectedView === 'week') {
          todayHighlightClass =
            'bg-calendar-selected-background text-calendar-selected-text font-medium ';
        } else {
          // month view
          todayHighlightClass =
            'bg-calendar-selected-background text-calendar-selected-text text-[24px] leading-[25px] font-medium tracking-[0px] h-[44px]';
        }
      }
      if (selectedView === 'week') {
        weekCalendar = 'pb-2';
      }

      days.push(
        <div
          className={twMerge(
            'flex flex-col items-center justify-center rounded-lg',
            !isSameMonth(day, monthStart) && 'text-gray-60'
          )}
          key={day.toString()}
        >
          <span
            className={twMerge(
              'flex w-[44px] items-center justify-center text-[24px] font-medium',
              shapeClass,
              todayHighlightClass,
              weekCalendar
            )}
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
      <div className="mb-1 grid grid-cols-7 gap-1" key={day.toString()}>
        {days}
      </div>
    );
    days = [];
  }

  return (
    <motion.div
      className="mb-2 flex flex-col"
      drag="y"
      dragConstraints={{ top: 0, bottom: 0 }}
      onDragEnd={(e, { offset }) => {
        if (offset.y > 50) {
          setSelectedView('month');
        }
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      {rows}
    </motion.div>
  );
}

export default CalendarCells;
