// utils/webView/consts.ts

// WebView -> React Native
export const WEB_VIEW_MESSAGE_TYPE = {
  REQUEST_TOKENS: 'REQUEST_TOKENS',
  REFRESH_TOKENS: 'REFRESH_TOKENS'
} as const;

// React Native -> WebView
export const NATIVE_MESSAGE_TYPE = {
  TOKENS: 'TOKENS',
  REFRESH_SUCCESS: 'REFRESH_SUCCESS',
  REFRESH_FAILURE: 'REFRESH_FAILURE'
} as const;

export interface WebViewMessage {
  type: keyof typeof WEB_VIEW_MESSAGE_TYPE;
  payload?: unknown;
}

export interface NativeMessage {
  type: keyof typeof NATIVE_MESSAGE_TYPE;
  payload?: unknown;
}