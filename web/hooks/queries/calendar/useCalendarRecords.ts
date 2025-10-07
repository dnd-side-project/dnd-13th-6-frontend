import { getMonthlyCalendar, getWeeklyCalendar } from '@/utils/apis/calendar';
import { useQuery, UseQueryOptions } from '@tanstack/react-query';

export type CalendarRecords = {
  totalDistance: number;
  totalDuration: number;
  histories: {
    date: string;
    distance: number;
    duration: number;
  }[];
};

export const useCalendarRecords = (
  view: 'week' | 'month',
  currentDate: Date,
  options?: Omit<
    UseQueryOptions<CalendarRecords, Error>,
    'queryKey' | 'queryFn'
  >
) => {
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth() + 1;

  const monday = new Date(currentDate);
  const day = monday.getDay();
  const diff = monday.getDate() - day + (day === 0 ? -6 : 1); // Adjust when day is Sunday
  monday.setDate(diff);
  const mondayDateString = monday.toISOString().split('T')[0];

  const dateForQueryKey =
    view === 'week'
      ? mondayDateString
      : `${year}-${month}`;

  return useQuery<CalendarRecords, Error>({
    queryKey: ['calendarRecords', view, year, month, dateForQueryKey],
    queryFn: () => {
      if (view === 'week') {
        return getWeeklyCalendar(mondayDateString);
      }
      return getMonthlyCalendar(year, month);
    },
    ...options,
  });
};
