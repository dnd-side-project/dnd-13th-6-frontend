export const postMessageToApp = (type: string, data?: string) => {
  if (window.ReactNativeWebView) {
    // 쿠키에서 accessToken 가져오기
    const match = document.cookie.match(/(^|;\s*)accessToken=([^;]+)/);
    const accessToken = match ? match[2] : '';
    console.log('accessToken:', accessToken);
    const message = JSON.stringify({ type, accessToken, data });
    window.ReactNativeWebView.postMessage(message);
  }
};
