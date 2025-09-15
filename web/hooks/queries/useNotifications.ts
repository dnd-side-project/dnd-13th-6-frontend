import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '@/utils/queries/queryKeys';
import { getNotification } from '@/utils/queries/notification';
import { Notification } from '@/types/notification';

export const useNotifications = () => {
  return useQuery<Notification[]>({
    queryKey: queryKeys.notification.all,
    queryFn: getNotification,
    staleTime: 0,
    gcTime: 0,
  });
};
