'use client';
import React, { useEffect, useState } from 'react';
import {
  ChatTeardropDots,
  Clover,
  FlagPennant,
  HandWaving
} from '@phosphor-icons/react';
import NotificationCard from '@/components/notification/NotificationCard';

function Page() {
  const [notification, setNotification] = useState<Notification[]>([]);
  useEffect(() => {
    setNotification(JSON.parse(localStorage.getItem('notification') || '[]'));
  }, []);
  return (
    <>
      {notification && notification.length > 0 ? (
        <div>
          <NotificationCard
            isNew={true}
            icon={<Clover size={20} color={'#F2F2F7'} />}
            title="퉁퉁퉁퉁진수후르님이 응원을 보내셨어요!"
            time="3분전"
          />
          <NotificationCard
            isNew={true}
            icon={<FlagPennant size={20} color={'#F2F2F7'} />}
            title="우리 크루, 이번 주도 완주 GO! 크루가 이번 주 목표를 달성했어요!"
            time="3분전"
          />
          <NotificationCard
            isNew={false}
            icon={<ChatTeardropDots size={20} color={'#F2F2F7'} />}
            title="우리 크루, 이번 주도 완주 GO! 크루에 새 멤버 퉁퉁후르님이 들어왔어요."
            time="3분전"
          />
          <NotificationCard
            isNew={false}
            icon={<HandWaving size={20} color={'#F2F2F7'} />}
            title={'뉴진스민지내여친이 새로운 크루 리더가 되었어요'}
            time="지난주"
          />
          <NotificationCard
            isNew={false}
            icon={<ChatTeardropDots size={20} color={'#F2F2F7'} />}
            title={'aaa크루가 크루 리더에 의해 해체되었어요.'}
            time="지난주"
          />
        </div>
      ) : (
        <div>알림이 없습니다</div>
      )}
    </>
  );
}

export default Page;
