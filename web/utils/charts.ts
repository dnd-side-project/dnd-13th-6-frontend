import { CalendarRecords } from '@/hooks/queries/calendar/useCalendarRecords';

const dayOfWeek = ['일', '월', '화', '수', '목', '금', '토'];

export const processRecordsForChart = (
  records: CalendarRecords['histories'],
  valueSelector: (record: CalendarRecords['histories'][0]) => number
) => {
  const data = ['월', '화', '수', '목', '금', '토', '일'].map(name => ({
    name,
    value: 0
  }));

  records.forEach(record => {
    const dayIndex = new Date(record.date).getDay();
    const dayName = dayOfWeek[dayIndex];
    const chartData = data.find(d => d.name === dayName);
    if (chartData) {
      chartData.value = valueSelector(record);
    }
  });

  return data;
};
