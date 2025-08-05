'use client';

import { useEffect, useRef, useState } from 'react';

// RN WebView 타입 선언 (이 컴포넌트 파일 안에서만 사용할 경우)
interface ReactNativeWebView {
  postMessage: (message: string) => void;
}

// window 객체에 ReactNativeWebView 추가
declare global {
  interface Window {
    ReactNativeWebView?: ReactNativeWebView;
  }
}

export default function WebViewTestPage() {
  const [message, setMessage] = useState<string>('');
  const [receivedMessages, setReceivedMessages] = useState<string[]>([]);
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const messageEndRef = useRef<HTMLDivElement | null>(null);

  // React Native에서 보내는 메시지 수신 처리
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleMessage = (event: MessageEvent<any>): void => {
      if (event.data && event.data.type === 'FROM_RN') {
        setReceivedMessages(prev => [...prev, `RN: ${event.data.message}`]);
      }
    };

    window.addEventListener('message', handleMessage);

    if (window.ReactNativeWebView) {
      window.ReactNativeWebView.postMessage(
        JSON.stringify({ type: 'WEBVIEW_READY' })
      );
      setIsConnected(true);
    }

    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, []);

  // 스크롤 자동 하단 이동
  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [receivedMessages]);

  const sendMessage = (): void => {
    if (!message.trim()) return;

    const newMessage = `WEB: ${message}`;
    setReceivedMessages(prev => [...prev, newMessage]);

    if (window.ReactNativeWebView) {
      window.ReactNativeWebView.postMessage(
        JSON.stringify({
          type: 'MESSAGE',
          message: message,
          timestamp: new Date().toISOString()
        })
      );
    }

    setMessage('');
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-4 border-b">
          <h1 className="text-xl font-bold">WebView 통신 테스트</h1>
          <div className="flex items-center mt-2">
            <div
              className={`w-3 h-3 rounded-full mr-2 ${
                isConnected ? 'bg-green-500' : 'bg-red-500'
              }`}
            ></div>
            <span className="text-sm text-gray-600">
              {isConnected ? 'React Native와 연결됨' : '연결 대기 중...'}
            </span>
          </div>
        </div>

        <div className="h-80 overflow-y-auto p-4 bg-gray-50">
          {receivedMessages.length === 0 ? (
            <div className="h-full flex items-center justify-center text-gray-400">
              메시지를 주고받아보세요!
            </div>
          ) : (
            receivedMessages.map((msg, index) => (
              <div
                key={index}
                className={`mb-2 p-2 rounded-lg max-w-[80%] ${
                  msg.startsWith('WEB:')
                    ? 'ml-auto bg-blue-100 text-blue-800'
                    : 'mr-auto bg-gray-200 text-gray-800'
                }`}
              >
                {msg}
              </div>
            ))
          )}
          <div ref={messageEndRef} />
        </div>

        <div className="p-4 border-t">
          <div className="flex gap-2">
            <input
              type="text"
              value={message}
              onChange={e => setMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="메시지를 입력하세요..."
              className="flex-1 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={sendMessage}
              disabled={!message.trim()}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              전송
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
