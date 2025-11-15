let isFetchPatched = false;

const patchFetch = () => {
  if (isFetchPatched) {
    return;
  }

  const originalFetch = window.fetch;

  window.fetch = async (input: RequestInfo | URL, init?: RequestInit) => {
    const request = new Request(input, init);
    const webviewSecret = document.body.dataset.webviewSecret;

    // Only add the secret header to same-origin requests.
    const requestUrl = new URL(request.url, window.location.origin);
    if (webviewSecret && requestUrl.origin === window.location.origin) {
      request.headers.set('X-App-Auth', webviewSecret);
    }

    return originalFetch(request);
  };

  isFetchPatched = true;
};

export default patchFetch;
