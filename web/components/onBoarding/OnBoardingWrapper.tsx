import React from 'react';

function OnBoardingWrapper({ title, text }: { title: string; text?: string }) {
  return (
    <div className="">
      <p className="text-gray-20 text-[1.625rem] leading-[1.35] font-bold tracking-[-0.025em] whitespace-pre-line">
        {title}
      </p>
      {text && (
        <p className="pretendard-headline2 text-gray-60 mt-[1.5vh] text-[0.9375rem] leading-[1.375] whitespace-pre-line sm:mt-[2vh] sm:text-[1.5vw]">
          {text}
        </p>
      )}
    </div>
  );
}

export default OnBoardingWrapper;
