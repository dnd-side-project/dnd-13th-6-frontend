import { useMutation } from '@tanstack/react-query';
import { logout } from '@/utils/apis/auth';

export const useLogout = () => {
  return useMutation({
    mutationFn: logout
  });
};
