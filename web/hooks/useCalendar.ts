'use client';
import { useState } from 'react';
import {
  addDays,
  addMonths,
  subDays,
  subMonths,
  getWeekOfMonth,
  startOfWeek,
  endOfWeek,
  getMonth,
} from 'date-fns';

export const useCalendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedView, setSelectedView] = useState<'week' | 'month'>('week');

  const prev = () => {
    if (selectedView === 'week') {
      const start = startOfWeek(currentDate, { weekStartsOn: 1 });
      const end = endOfWeek(currentDate, { weekStartsOn: 1 });

      // If it's a cross-month week AND we are currently in the second month's context
      if (getMonth(start) !== getMonth(end) && getMonth(currentDate) === getMonth(end)) {
        // Just move to a date in the previous month within the same week to change the context
        setCurrentDate(start);
      } else {
        // Otherwise, jump to the previous week as usual
        setCurrentDate(subDays(currentDate, 7));
      }
    } else {
      setCurrentDate(subMonths(currentDate, 1));
    }
  };

  const next = () => {
    if (selectedView === 'week') {
      const start = startOfWeek(currentDate, { weekStartsOn: 1 });
      const end = endOfWeek(currentDate, { weekStartsOn: 1 });

      // If it's a cross-month week AND we are currently in the first month's context
      if (getMonth(start) !== getMonth(end) && getMonth(currentDate) === getMonth(start)) {
        // Just move to a date in the next month within the same week to change the context
        setCurrentDate(end);
      } else {
        // Otherwise, jump to the next week as usual
        setCurrentDate(addDays(currentDate, 7));
      }
    } else {
      setCurrentDate(addMonths(currentDate, 1));
    }
  };

  const formatWeekDescription = (date: Date) => {
    const weekStartsOn = { weekStartsOn: 1 } as const;
    const monthForDisplay = getMonth(date) + 1; // getMonth is 0-indexed
    const week = getWeekOfMonth(date, weekStartsOn);
    const weekNumberText = ['첫째주', '둘째주', '셋째주', '넷째주', '다섯째주'];

    return `${monthForDisplay}월 ${weekNumberText[week - 1] || ''} 주간 기록`;
  };

  return {
    currentDate,
    selectedView,
    setSelectedView,
    prev,
    next,
    formatWeekDescription
  };
};
