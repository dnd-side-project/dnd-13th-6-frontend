import React from 'react';

function OnBoardingWrapper({
  title,
  children
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="absolute top-[132px] left-[16px]">
      <p className="text-gray-20 text-[26px] font-bold whitespace-pre-line leading-[35px]">
        {title}
      </p>
      {children}
    </div>
  );
}

export default OnBoardingWrapper;
