import { useCalendarRecords } from '@/hooks/queries/calendar/useCalendarRecords';

export const usePrefetchCalendarRecords = (
  currentDate: Date,
  selectedView: 'week' | 'month'
) => {
  // 주별 데이터 미리 불러오기
  const prevWeekDate = new Date(currentDate);
  prevWeekDate.setDate(currentDate.getDate() - 7);
  useCalendarRecords('week', prevWeekDate, {
    enabled: selectedView === 'week'
  });

  const nextWeekDate = new Date(currentDate);
  nextWeekDate.setDate(currentDate.getDate() + 7);
  useCalendarRecords('week', nextWeekDate, {
    enabled: selectedView === 'week'
  });

  // 월별 데이터 미리 불러오기
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
};
