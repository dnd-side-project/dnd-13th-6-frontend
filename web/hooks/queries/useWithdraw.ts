import { useMutation } from '@tanstack/react-query';
import { withdraw } from '@/utils/apis/auth';
import { redirectToLogin } from '@/utils/authRedirect';

export const useWithdraw = () => {
  return useMutation({
    mutationFn: withdraw,
    onSuccess: () => {
      // 먼저 앱에 온보딩으로 이동하라는 메시지 전송 (localStorage 클리어 전에!)
      redirectToLogin();
      
      // 그 다음 localStorage 클리어
      localStorage.clear();
      
      // React Native WebView에 토큰 삭제 요청 전송
      if (window.ReactNativeWebView) {
        window.ReactNativeWebView.postMessage(JSON.stringify({
          type: 'CLEAR_TOKENS',
          action: 'withdraw'
        }));
      }
    }
  });
};
