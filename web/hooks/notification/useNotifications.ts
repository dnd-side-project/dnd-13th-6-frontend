'use client';
import { useEffect, useState } from 'react';

type IconCode = 'CHEER' | 'PERSONAL_GOAL_ACHIEVED' | 'PERSONAL_GOAL_FAILED' | 'CREW_GOAL_ACHIEVED' | 'CREW_GOAL_FAILED' | 'CREW_DISBANDED' | 'RUN_STARTED';

interface Notification {
  id: number;
  title: string;
  text: string;
  senderId: number | null;
  createdAt: string;
  read: boolean;
  message: {
    type: IconCode;
    raw: string;
    variables: { [key: string]: string | number };
  };
}

export const useNotifications = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    const storedNotifications = JSON.parse(
      localStorage.getItem('notification') || '[]'
    );
    setNotifications(storedNotifications);

    return () => {
      const updated = storedNotifications.map((n: Notification) => ({
        ...n,
        read: true,
      }));
      localStorage.setItem('notification', JSON.stringify(updated));
    };
  }, []);

  return { notifications };
};
