import { generatePostMessage } from '@/utils/webView';
import { POST_MESSAGE_TYPE } from '@/utils/webView/consts';
import { useRef } from 'react';
import WebView from 'react-native-webview';

export const useWebView = <T>() => {
  const webviewRef = useRef<WebView>(null);

  const postMessage = (type: string, data: T) => {
    const message = generatePostMessage(type, data);
    console.log('message', message);
    if (webviewRef.current) {
      console.log('message', message);
      webviewRef.current.postMessage(message);
    }
  };

  return {
    webviewRef,
    postMessage
  };
};
