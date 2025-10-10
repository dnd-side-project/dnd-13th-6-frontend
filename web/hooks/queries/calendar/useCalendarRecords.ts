import { getMonthlyCalendar, getWeeklyCalendar } from '@/utils/apis/calendar';
import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { RunRecord } from '@/types/runningTypes';
import { queryKeys } from '@/utils/queries/queryKeys';

export type CalendarRecords = {
  totalDistance: number;
  totalDuration: number;
  histories: RunRecord[];
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

  const key =
    view === 'week'
      ? queryKeys.calendar.weekly(mondayDateString)
      : queryKeys.calendar.monthly(year, month);

  return useQuery<CalendarRecords, Error>({
    queryKey: key,
    queryFn: () => {
      if (view === 'week') {
        return getWeeklyCalendar(mondayDateString);
      }
      return getMonthlyCalendar(year, month);
    },
    ...options
  });
};
