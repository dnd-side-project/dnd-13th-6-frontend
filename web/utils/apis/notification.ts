import api from '@/utils/apis/customAxios';
import { NOTIFICATION_API } from '@/utils/apis/api';

export const fetchNotification = async () => {
  const res = await api.get(NOTIFICATION_API.NOTIFICATION_LIST());
  return res.data;
};
