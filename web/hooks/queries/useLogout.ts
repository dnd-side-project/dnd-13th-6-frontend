import { useMutation } from '@tanstack/react-query';
import { logout } from '@/utils/apis/auth';
import { redirectToLogin } from '@/utils/authRedirect';

export const useLogout = () => {
  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
         localStorage.clear();
          redirectToLogin();
    }
  });
};
