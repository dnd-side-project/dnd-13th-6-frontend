'use client';

import CalendarHeader from '@/components/calendar/CalendarHeader';
import CalendarDays from '@/components/calendar/CalendarDays';
import CalendarCells from '@/components/calendar/CalendarCells';
import CalendarMenu from '@/components/calendar/CalendarMenu';
import CalendarStats from '@/components/calendar/CalendarStats';
import DistanceChart from '@/components/calendar/Chart/DistanceChart';
import TimeChart from '@/components/calendar/Chart/TimeChart';
import PaceChart from '@/components/calendar/Chart/PaceChart';
import { AnimatePresence } from 'framer-motion';
import { useCalendar } from '@/hooks/useCalendar';
import { useCalendarRecords } from '@/hooks/queries/calendar/useCalendarRecords';

function Calendar() {
  const {
    currentDate,
    selectedView,
    setSelectedView,
    prev,
    next,
    formatWeekDescription
  } = useCalendar();

  // Fetch data for the current view
  const { data } = useCalendarRecords(selectedView, currentDate);
  const records = data?.histories || [];

  //빠른 이동을 위한 이전주, 다음 주 미리 통신
  const prevWeekDate = new Date(currentDate);
  prevWeekDate.setDate(currentDate.getDate() - 7);
  useCalendarRecords(selectedView, prevWeekDate, {
    enabled: selectedView === 'week'
  });

  const nextWeekDate = new Date(currentDate);
  nextWeekDate.setDate(currentDate.getDate() + 7);
  useCalendarRecords(selectedView, nextWeekDate, {
    enabled: selectedView === 'week'
  });
  //빠른 이동을 위한 이전달 다음달 미리 통신
  const prevMonthDate = new Date(currentDate);
  prevMonthDate.setMonth(currentDate.getMonth() - 1);
  useCalendarRecords('month', prevMonthDate, {
    enabled: selectedView === 'month'
  });

  const nextMonthDate = new Date(currentDate);
  nextMonthDate.setMonth(currentDate.getMonth() + 1);
  useCalendarRecords('month', nextMonthDate, {
    enabled: selectedView === 'month'
  });

  return (
    <div className="bg-background flex h-full w-full flex-col rounded-lg text-gray-900 shadow-lg dark:text-gray-100">
      <CalendarMenu
        selectedView={selectedView}
        setSelectedView={setSelectedView}
      />
      <CalendarHeader currentDate={currentDate} prev={prev} next={next} />
      <AnimatePresence mode="sync">
        {selectedView === 'week' ? (
          <>
            <p>{formatWeekDescription(currentDate)}</p>
            <CalendarDays
              currentDate={currentDate}
              selectedView={selectedView}
            />
            <CalendarCells
              key="week"
              currentDate={currentDate}
              records={records}
              selectedView={selectedView}
              setSelectedView={setSelectedView}
            />
            <CalendarStats
              totalDistance={data?.totalDistance || 0}
              totalTime={data?.totalDuration || 0}
            />
            <DistanceChart records={records} />
            <TimeChart records={records} />
            <PaceChart records={records} />
          </>
        ) : (
          <>
            <CalendarDays />
            <CalendarCells
              key="month"
              currentDate={currentDate}
              records={records}
              selectedView={selectedView}
              setSelectedView={setSelectedView}
            />
            <div className="bg-gray-80 h-[1px]" />
            <CalendarStats
              totalDistance={data?.totalDistance || 0}
              totalTime={data?.totalDuration || 0}
            />
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Calendar;
