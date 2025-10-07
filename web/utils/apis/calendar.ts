import { CALENDAR_API } from '@/utils/apis/api';
import api from '@/utils/apis/customAxios';

export const getWeeklyCalendar = async (date: string) => {
  const res = await api.get(CALENDAR_API.RUNS_IN_WEEK(date));
  return res.data.result;
};

export const getMonthlyCalendar = async (year: number, month: number) => {
  const res = await api.get(CALENDAR_API.RUNS_IN_MONTH(year, month));
  return res.data.result;
};
