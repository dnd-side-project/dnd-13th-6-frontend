'use client';
import React, { useEffect, useState } from 'react';
import { ChatTeardropDots, Clover, FlagPennant } from '@phosphor-icons/react';
import NotificationCard from '@/components/notification/NotificationCard';

const icon = {
  CHEER: <Clover size={20} color={'#F2F2F7'} />,
  PERSONAL_GOAL_ACHIEVED: <FlagPennant size={20} color={'#F2F2F7'} />,
  PERSONAL_GOAL_FAILED: <FlagPennant size={20} color={'#F2F2F7'} />,
  CREW_GOAL_ACHIEVED: <FlagPennant size={20} color={'#F2F2F7'} />,
  CREW_GOAL_FAILED: <FlagPennant size={20} color={'#F2F2F7'} />,
  CREW_DISBANDED: <ChatTeardropDots size={20} color={'#F2F2F7'} />,
  RUN_STARTED: <FlagPennant size={20} color={'#F2F2F7'} />
};
interface Notification {
  createdAt: string;
  template: {
    code: string;
    raw: string;
    variables: object;
    emphasize: string[];
  };
}
function Page() {
  const [notification, setNotification] = useState<Notification[]>([]);
  const [raw, setRaw] = useState<string>('');
  const [code, setCode] = useState<string>('');
  const [variables, setvariables] = useState<object>({});
  useEffect(() => {
    //페이지 들어오면 main 페이지에서 비교를 위해 현재알림을 과거 알림에 담기
    const localStorageNotification = JSON.parse(
      localStorage.getItem('notification') || '[]'
    );
    setNotification(localStorageNotification);
    setRaw(localStorageNotification?.template?.raw || '');
    setCode(localStorageNotification?.template?.code || '');
    setvariables(localStorageNotification?.template?.variables || '');
  }, []);
  const ChangeText = () => {
    const result = raw.replace(
      /\$\{(\w+)\}/g,
      (_, key) => variables[key] || ''
    );
    return result;
  };

  return (
    <>
      {notification && notification.length > 0 ? (
        notification.map((item, index) => {
          <NotificationCard
            isNew={true}
            icon={icon.code}
            title={ChangeText()}
            time="3분전"
          />;
        })
      ) : (
        <div>알림이 없습니다</div>
      )}
    </>
  );
}
export default Page;