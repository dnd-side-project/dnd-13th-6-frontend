'use client';
import { useState } from 'react';
import { addDays, addMonths, subDays, subMonths, getWeekOfMonth } from 'date-fns';

export const useCalendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedView, setSelectedView] = useState<'week' | 'month'>('week');

  const prev = () => {
    if (selectedView === 'week') {
      setCurrentDate(subDays(currentDate, 7));
    } else {
      setCurrentDate(subMonths(currentDate, 1));
    }
  };

  const next = () => {
    if (selectedView === 'week') {
      setCurrentDate(addDays(currentDate, 7));
    } else {
      setCurrentDate(addMonths(currentDate, 1));
    }
  };

  const formatWeekDescription = (date: Date) => {
    const week = getWeekOfMonth(date, { weekStartsOn: 1 });
    const weekNumberText = ['첫째주', '둘째주', '셋째주', '넷째주', '다섯째주'];
    return `${weekNumberText[week - 1] || ''} 주간 기록`;
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
