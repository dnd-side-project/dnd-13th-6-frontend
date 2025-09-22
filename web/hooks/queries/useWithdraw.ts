import { useMutation } from '@tanstack/react-query';
import { withdraw } from '@/utils/apis/auth';
import { redirectToLogin } from '@/utils/authRedirect';

export const useWithdraw = () => {
  return useMutation({
    mutationFn: withdraw,
    onSuccess: () => {
            localStorage.clear();
      redirectToLogin();
    }
  }); 
};
