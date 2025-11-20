import React, { forwardRef } from 'react';
import WebView, { WebViewProps } from 'react-native-webview';

const AuthenticatedWebView = forwardRef<WebView, WebViewProps>(
  ({ source, ...props }, ref) => {
    const headers = {
      'X-App-Auth': process.env.EXPO_PUBLIC_APP_WEBVIEW_SECRET || ''
    };

    const newSource =
      typeof source === 'number'
        ? source
        : {
            ...source,
            headers: {
              ...source?.headers,
              ...headers
            }
          };

    return <WebView ref={ref} source={newSource} {...props} />;
  }
);

AuthenticatedWebView.displayName = 'AuthenticatedWebView';

export default AuthenticatedWebView;
