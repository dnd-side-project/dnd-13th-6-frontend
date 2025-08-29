
"use client";
import React, { useState, useEffect } from 'react';
import { addMonths, subMonths } from 'date-fns';
import CalendarHeader from './CalendarHeader';
import CalendarDays from './CalendarDays';
import CalendarCells from './CalendarCells';

interface RunRecord {
  startTime: number;
  totalDistance: number;
  averagePace: string;
  totalTime: string;
  // Add other properties as needed
}

function Calendar() {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [records, setRecords] = useState<RunRecord[]>([]);

  useEffect(() => {
    const data = localStorage.getItem('finishData');
    if (data) {
      try {
        const parsedData = JSON.parse(data);
        if (Array.isArray(parsedData)) {
          setRecords(parsedData);
        }
      } catch (error) {
        console.error("Error parsing finishData from localStorage", error);
      }
    }
  }, []);

  const prevMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
  };

  const nextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };

  const onDateClick = (day: Date) => {
    setSelectedDate(day);
  };

  return (
    <div className="w-full h-full flex flex-col p-4 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 rounded-lg shadow-lg">
      <CalendarHeader
        currentMonth={currentMonth}
        prevMonth={prevMonth}
        nextMonth={nextMonth}
      />
      <CalendarDays />
      <CalendarCells
        currentMonth={currentMonth}
        selectedDate={selectedDate}
        onDateClick={onDateClick}
        records={records}
      />
    </div>
  );
}

export default Calendar;
