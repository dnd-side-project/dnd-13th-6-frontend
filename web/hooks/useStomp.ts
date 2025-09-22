'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { Client, IMessage, StompSubscription } from '@stomp/stompjs';

interface UseStompWebSocketProps {
  socketUrl: string;
  publishDest?: string; // 기본 발행 Destination (옵션)
  subscribeTopic?: string; // 초기 구독 Topic (옵션)
  connectionHeaders?: Record<string, string>; // 연결 시 사용할 헤더
  onMessage?: (msg: any) => void; // 초기 구독 메시지 처리 콜백
  debug?: boolean; // 디버그 로그 출력 여부
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
  connectionHeaders,
  debug
}: UseStompWebSocketProps) {
  const clientRef = useRef<Client | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const subscriptionsRef = useRef<Map<string, StompSubscription>>(new Map());

  useEffect(() => {
    if (!socketUrl) return;
    console.log(connectionHeaders);
    const stompClient = new Client({
      webSocketFactory: () => new WebSocket(socketUrl),
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
      debug: msg => (debug ? console.log('[STOMP DEBUG]:', msg) : void 0),
      connectHeaders: connectionHeaders
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
      // 모든 구독 해제
      subscriptionsRef.current.forEach(sub => {
        try {
          sub.unsubscribe();
        } catch {}
      });
      subscriptionsRef.current.clear();
      stompClient.deactivate();
    };
  }, [socketUrl, subscribeTopic, onMessage, connectionHeaders, debug]);

  // ✅ 동적 구독
  const subscribe = useCallback(
    (
      topic: string,
      handler: (parsed: any, raw: IMessage) => void,
      headers?: Record<string, string>
    ) => {
      if (!clientRef.current?.connected) return () => {};
      // 이미 존재하면 먼저 해제
      const existing = subscriptionsRef.current.get(topic);
      if (existing) {
        try {
          existing.unsubscribe();
        } catch {}
      }
      const sub = clientRef.current.subscribe(
        topic,
        (message: IMessage) => {
          try {
            const parsed = JSON.parse(message.body);
            handler(parsed, message);
          } catch (e) {
            console.error('❌ Failed to parse STOMP message', e);
          }
        },
        headers
      );
      subscriptionsRef.current.set(topic, sub);
      return () => {
        try {
          sub.unsubscribe();
        } catch {}
        subscriptionsRef.current.delete(topic);
      };
    },
    []
  );

  // ✅ 발행 (일반/위치)
  const publish = useCallback(
    (
      destination: string,
      payload: unknown,
      headers?: Record<string, string>
    ) => {
      if (!clientRef.current?.connected) return;
      clientRef.current.publish({
        destination,
        body: JSON.stringify(payload),
        headers
      });
    },
    []
  );

  const sendLocation = useCallback(
    (location: LocationPayload, destination?: string) => {
      const dest = destination ?? publishDest;
      if (!clientRef.current?.connected || !dest) return;
      publish(dest, {
        type: 'LOCATION',
        ...location,
        timestamp: Date.now()
      });
    },
    [publishDest, publish]
  );

  const disconnect = useCallback(() => {
    if (!clientRef.current) return;
    try {
      subscriptionsRef.current.forEach(sub => sub.unsubscribe());
      subscriptionsRef.current.clear();
    } catch {}
    clientRef.current.deactivate();
  }, []);

  return {
    isConnected,
    subscribe,
    publish,
    sendLocation,
    disconnect,
    client: clientRef.current
  };
}
