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

export interface RunRecord {
  date: string; // YYYY-MM-DD
}

import { useCalendar } from '@/hooks/useCalendar';

function Calendar() {
  const {
    currentDate,
    selectedView,
    setSelectedView,
    prev,
    next,
    formatWeekDescription
  } = useCalendar();

  const records: RunRecord[] = [
    { date: '2025-09-01' },
    { date: '2025-09-05' },
    { date: '2025-09-10' },
    { date: '2025-09-15' },
    { date: '2025-09-25' },
    { date: '2025-10-01' }
  ];

  return (
    <div className="bg-background flex h-full w-full flex-col rounded-lg text-gray-900 shadow-lg dark:text-gray-100">
      <CalendarMenu
        selectedView={selectedView}
        setSelectedView={setSelectedView}
      />
      <CalendarHeader currentDate={currentDate} prev={prev} next={next} />
      <AnimatePresence mode="wait">
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
            <CalendarStats />
            <DistanceChart />
            <TimeChart />
            <PaceChart />
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
            <CalendarStats />
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Calendar;
