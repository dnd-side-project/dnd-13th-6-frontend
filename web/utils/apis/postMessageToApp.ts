export const postMessageToApp = (type: string, data?: string) => {
  if (window.ReactNativeWebView) {
    // 쿠키에서 accessToken 가져오기
    const match = document.cookie.match(/(^|;\s*)accessToken=([^;]+)/);
    const accessToken = match ? match[2] : '';
    const userId = localStorage.getItem('userId');
    const nickName = localStorage.getItem('nickname');
    const message = JSON.stringify({
      type,
      accessToken,
      nickName,
      userId,
      data
    });
    window.ReactNativeWebView.postMessage(message);
  }
};
