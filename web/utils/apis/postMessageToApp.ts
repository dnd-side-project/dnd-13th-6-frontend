import { SEND_MESSAGE_TYPE } from '@/utils/webView/consts';

export const postMessageToApp = (type: SEND_MESSAGE_TYPE, data?: string) => {
  if (window.ReactNativeWebView) {
    const message = JSON.stringify({ type, data });
    window.ReactNativeWebView.postMessage(message);
  }
};
