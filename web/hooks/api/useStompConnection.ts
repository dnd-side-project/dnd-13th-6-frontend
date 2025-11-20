'use client';
import { useEffect } from 'react';
import { Client } from '@stomp/stompjs';
import { SOCKET_URL } from '@/utils/apis/api';
import { RunningData } from '@/types/runningTypes';

interface UseStompConnectionProps {
  onMessageReceived: (data: RunningData) => void;
}

export const useStompConnection = ({
  onMessageReceived
}: UseStompConnectionProps) => {
  useEffect(() => {
    const stompClient = new Client({
      webSocketFactory: () => new WebSocket('wss://api.runky.store/ws'),
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
      connectHeaders: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`
      }
    });

    const handleMessage = (event: MessageEvent) => {
      try {
        console.log(event)
        const data = JSON.parse(event.data);
        if (data && data.message) {
          const newRunningData: RunningData = {
            ...data.message,
            timestamp: data.timestamp
          };
          onMessageReceived(newRunningData);

          if (stompClient.connected) {
            const runningId = localStorage.getItem('runningId');
            if (runningId) {
              stompClient.publish({
                destination: SOCKET_URL.RUNNING_PUBLISH(runningId),
                body: JSON.stringify({
                  x: data.message.longitude,
                  y: data.message.latitude,
                  timestamp: Date.now()
                })
              });
            }
          }
        }
      } catch (error) {
        console.error('❌ 메시지 파싱 에러:', error);
      }
    };

    stompClient.activate();

    // Android & iOS message handling
    document.addEventListener('message', handleMessage as EventListener);
    window.addEventListener('message', handleMessage);

    return () => {
      stompClient.deactivate();
      document.removeEventListener('message', handleMessage as EventListener);
      window.removeEventListener('message', handleMessage);
    };
  }, [onMessageReceived]);
};
