'use client';
import React, { useState } from 'react';
import {
  addDays,
  addMonths,
  getWeekOfMonth,
  subDays,
  subMonths
} from 'date-fns';
import CalendarHeader from '@/components/Calendar/CalendarHeader';
import CalendarDays from '@/components/Calendar/CalendarDays';
import CalendarCells from '@/components/Calendar/CalendarCells';
import CalendarMenu from '@/components/Calendar/CalendarMenu';
import CalendarStats from '@/components/Calendar/CalendarStats';
import DistanceChart from '@/components/Calendar/Chart/DistanceChart';

export interface RunRecord {
  date: string; // YYYY-MM-DD
}

function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedView, setSelectedView] = useState<'week' | 'month'>('week');

  const records: RunRecord[] = [
    { date: '2025-09-01' },
    { date: '2025-09-05' },
    { date: '2025-09-10' },
    { date: '2025-09-15' },
    { date: '2025-09-25' }
  ];

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

  return (
    <div className="bg-background flex h-full w-full flex-col rounded-lg text-gray-900 shadow-lg dark:text-gray-100">
      <CalendarMenu
        selectedView={selectedView}
        setSelectedView={setSelectedView}
      />
      <CalendarHeader currentDate={currentDate} prev={prev} next={next} />
      {selectedView === 'week' ? (
        <>
          {formatWeekDescription(currentDate)}
          <CalendarDays currentDate={currentDate} selectedView={selectedView} />
          <CalendarCells
            currentDate={currentDate}
            records={records}
            selectedView={selectedView}
          />
          <CalendarStats />
          <DistanceChart />
        </>
      ) : (
        <>
          <CalendarDays />
          <CalendarCells
            currentDate={currentDate}
            records={records}
            selectedView={selectedView}
          />
          <div className="bg-gray-80 my-10 h-[1px]" />
          <CalendarStats />
        </>
      )}
    </div>
  );
}

export default Calendar;
