'use client';
import { useState, useEffect } from 'react';

interface Position {
  lat: number;
  lng: number;
}

const INITIAL_POSITION = {
  lat: 37.5665, // Default to Seoul
  lng: 126.978
};

export const useCurrentPosition = () => {
  const [position, setPosition] = useState<Position>(INITIAL_POSITION);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      try {
        const data = JSON.parse(event.data);
        if (data.message.type === 'RUNNING_PREPARE') {
          setPosition({
            lat: data.message.lat,
            lng: data.message.lng
          });
        }
      } catch (e) {
        setError('Failed to parse message data');
        console.error('error:', e);
      }
    };

    // Android
    document.addEventListener('message', handleMessage as EventListener);
    // iOS
    window.addEventListener('message', handleMessage);

    return () => {
      //Android
      document.removeEventListener('message', handleMessage as EventListener);
      //iOS
      window.removeEventListener('message', handleMessage);
    };
  }, []);

  return { position, error };
};
