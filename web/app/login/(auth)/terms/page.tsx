'use client';
import React, { useState } from 'react';
import ProgressBar from '@/components/common/ProgressBar';
import CheckBox from '@/components/common/CheckBox';
import Button from '@/components/common/Button';

function Page() {
  const [agreements, setAgreements] = useState({
    all: false,
    service: false,
    privacy: false,
    marketing: false
  });

  const handleAllClick = () => {
    const newValue = !agreements.all;
    setAgreements({
      all: newValue,
      service: newValue,
      privacy: newValue,
      marketing: newValue
    });
  };

  const handleSingleClick = (key: keyof typeof agreements) => {
    const newAgreements = { ...agreements, [key]: !agreements[key] };
    const allChecked = newAgreements.privacy && newAgreements.marketing;
    setAgreements({ ...newAgreements, all: allChecked });
  };

  return (
    <div className="flex flex-col justify-between flex-grow p-4">
      <div>
        <ProgressBar progress={20} className="h-[6px]" />
        <p className="text-gray-20 text-[26px] font-bold whitespace-pre-line mt-[51px] leading-[35px] tracking-[-0.025em]">
          {`서비스 이용 약관에 \n동의해주세요`}
        </p>

        <div className="mt-[56px] flex flex-col gap-3">
          <CheckBox
            isClicked={agreements.all}
            onClick={handleAllClick}
            text={'(필수) 네, 모두 동의합니다.'}
            className="mb-5"
          />
          <div className="flex justify-between">
            <CheckBox
              isClicked={agreements.service}
              onClick={() => handleSingleClick('service')}
              text={'(필수) 서비스 이용 약관'}
            />
            <p className="body2 text-gray-60 underline">상세보기</p>
          </div>

          <div className="flex justify-between">
            <CheckBox
              isClicked={agreements.privacy}
              onClick={() => handleSingleClick('privacy')}
              text={'(필수) 개인정보 수집 및 이용 동의'}
            />
            <p className="body2 text-gray-60 underline">상세보기</p>
          </div>
          <CheckBox
            isClicked={agreements.marketing}
            onClick={() => handleSingleClick('marketing')}
            text={'(선택) 마케팅 정보 수신'}
          />
        </div>
      </div>
      <Button
        className="w-full h-13 mb-5"
        disabled={!(agreements.service && agreements.privacy)}
        onClick={() => {}}
      >
        다음으로
      </Button>
    </div>
  );
}

export default Page;
