'use client';

import { useEffect, useRef, useState } from 'react';
import axios from 'axios';

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
      const data = JSON.parse(event.data);
      if (data) {
        setReceivedMessages(prev => [...prev, `RN: ${data.message}`]);
      }
    };

    window.addEventListener('message', handleMessage);

    if (
      (window as unknown as { ReactNativeWebView: ReactNativeWebView })
        .ReactNativeWebView
    ) {
      (
        window as unknown as { ReactNativeWebView: ReactNativeWebView }
      ).ReactNativeWebView.postMessage(
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

    if (
      (window as unknown as { ReactNativeWebView: ReactNativeWebView })
        .ReactNativeWebView
    ) {
      (
        window as unknown as { ReactNativeWebView: ReactNativeWebView }
      ).ReactNativeWebView.postMessage(
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

  const handleButton = async () => {
    try {
      const data = await axios.get('https://api.runky.store/api/member/me', {
        headers: {
          'X-USER-ID': '1'
        }
      });
      window.alert(data);
    } catch (e) {
      console.error(e);
    }
  };
  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="mx-auto max-w-md overflow-hidden rounded-lg bg-white shadow-md">
        <div className="border-b p-4">
          <h1 className="text-xl font-bold">WebView 통신 테스트</h1>
          <div className="mt-2 flex items-center">
            <div
              className={`mr-2 h-3 w-3 rounded-full ${
                isConnected ? 'bg-green-500' : 'bg-red'
              }`}
            ></div>
            <span className="text-sm text-gray-600">
              {isConnected ? 'React Native와 연결됨' : '연결 대기 중...'}
            </span>
          </div>
        </div>

        <div className="h-80 overflow-y-auto bg-gray-50 p-4">
          {receivedMessages.length === 0 ? (
            <div className="flex h-full items-center justify-center text-gray-400">
              메시지를 주고받아보세요!
            </div>
          ) : (
            receivedMessages.map((msg, index) => (
              <div
                key={index}
                className={`mb-2 max-w-[80%] rounded-lg p-2 ${
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

        <div className="border-t p-4">
          <div className="flex gap-2">
            <input
              type="text"
              value={message}
              onChange={e => setMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="메시지를 입력하세요..."
              className="flex-1 rounded border p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
            <button
              onClick={handleButton}
              className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 disabled:cursor-not-allowed disabled:opacity-50"
            >
              전송
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
