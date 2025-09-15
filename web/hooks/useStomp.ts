'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import SockJS from 'sockjs-client';
import { Client, IMessage } from '@stomp/stompjs';

interface UseStompWebSocketProps {
  socketUrl: string;
  publishDest?: string; // 메시지를 보낼 Destination
  subscribeTopic?: string; // 구독할 Topic
  connectionHeaders?: Record<string, string>; // 연결 시 사용할 헤더
  onMessage?: (msg: string) => void; // 구독 메시지 처리 콜백
}

interface LocationPayload {
  x: number;
  y: number;
}

export function useStomp({
  socketUrl,
  publishDest,
  subscribeTopic,
  onMessage,
  connectionHeaders
}: UseStompWebSocketProps) {
  const clientRef = useRef<Client | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  // ✅ WebSocket 연결
  useEffect(() => {
    if (!socketUrl) return;

    const stompClient = new Client({
      webSocketFactory: () => new SockJS(socketUrl),
      reconnectDelay: 5000,
      debug: msg => console.log('[STOMP DEBUG]:', msg),
      ...connectionHeaders
    });

    stompClient.onConnect = () => {
      console.log('✅ Connected');
      setIsConnected(true);

      // 구독 처리
      if (subscribeTopic) {
        stompClient.subscribe(subscribeTopic, (message: IMessage) => {
          try {
            const parsed = JSON.parse(message.body);
            onMessage?.(parsed);
          } catch (e) {
            console.error('❌ Failed to parse STOMP message', e);
          }
        });
      }
    };

    stompClient.onDisconnect = () => {
      console.log('❌ Disconnected');
      setIsConnected(false);
    };

    stompClient.activate();
    clientRef.current = stompClient;

    return () => {
      stompClient.deactivate();
    };
  }, [socketUrl, subscribeTopic, onMessage]);

  // ✅ 위치 전송 (Runner)
  const sendLocation = useCallback(
    (location: LocationPayload) => {
      if (!clientRef.current?.connected || !publishDest) return;

      clientRef.current.publish({
        destination: publishDest,
        body: JSON.stringify({
          type: 'LOCATION',
          runnerId: 101,
          ...location,
          timestamp: Date.now()
        })
      });
    },
    [publishDest]
  );

  return { isConnected, sendLocation };
}
