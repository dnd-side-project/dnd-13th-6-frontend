export const postMessageToApp = (type: string, data?: any) => {
  if (window.ReactNativeWebView) {
    // 쿠키에서 accessToken 가져오기
    const match = document.cookie.match(/(^|;\s*)accessToken=([^;]+)/);
    // const accessToken = match ? match[2] : '';
    const accessToken = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');
    const userId = localStorage.getItem('userId');
    const nickName = localStorage.getItem('nickname');
    const message = JSON.stringify({
      type,
      accessToken,
      refreshToken,
      nickName,
      userId,
      data: typeof data === 'string' ? data : JSON.stringify(data)
    });
    window.ReactNativeWebView.postMessage(message);
  }
};
