import api from '@/utils/apis/customAxios';
import {Notification} from '@/types/notification';
import { NOTIFICATION_API } from '@/utils/apis/api';

export const fetchNotification = async () => {
  const res = await api.get(NOTIFICATION_API.NOTIFICATION_LIST());
        const fetched: Notification[] = res.data.result.values;
        //읽었는지 확인
        const stored: Notification[] = JSON.parse(
          localStorage.getItem('notification') || '[]'
        );
        const merged = fetched.map(f => {
          const prev = stored.find(
            s =>
              s.createdAt === f.createdAt && s.template?.code === f.template.code
          );
          return prev ? { ...f, read: prev.read } : f;
        });
        return merged;
};
