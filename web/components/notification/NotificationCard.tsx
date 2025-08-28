import React from 'react';

type NotificationCardProps = {
  icon: React.ReactNode;
  title: string;
  time: string;
  isNew: boolean;
};

function NotificationCard({
  icon,
  isNew = false,
  title,
  time
}: NotificationCardProps) {
  return (
    <div className={`py-4 ${isNew ? 'bg-gray-90 -mx-4 px-4' : ''} `}>
      <div className="flex items-center gap-2">
        {icon}
        <span className="text-gray-20 text-[0.9375rem] leading-[1.4] font-medium tracking-[-0.015em]">
          {title}
        </span>
      </div>
      <p className="mt-2 ml-7 text-sm text-gray-50">{time}</p>
    </div>
  );
}

export default NotificationCard;
