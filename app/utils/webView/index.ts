import { Platform } from 'react-native';
import { WebViewMessageEvent } from 'react-native-webview';
import { POST_MESSAGE_TYPE } from './consts';

const generatePostMessage = (type: string, data: any) => {
  const message = {
    type,
    message: data,
    timestamp: Date.now(),
    platform: Platform.OS
  };

  const messageString = JSON.stringify(message);
  return messageString;
};

const receiveMessage = (event: WebViewMessageEvent) => {
  console.log('웹에서 받은 메시지:', event.nativeEvent.data);
};

export { generatePostMessage, receiveMessage };
