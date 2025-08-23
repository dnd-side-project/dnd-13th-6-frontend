

const postMessageToApp = (type: string, data?: string) => {
  if (window.ReactNativeWebView) {
    const message = JSON.stringify({ type, data });
    window.ReactNativeWebView.postMessage(message);
  }
};


export {
  postMessageToApp
}