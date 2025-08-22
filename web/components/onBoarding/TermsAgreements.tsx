'use client';
import React, { useState, useEffect } from 'react';
import CheckBox from '@/components/common/CheckBox';

interface Agreements {
  all: boolean;
  service: boolean;
  privacy: boolean;
  marketing: boolean;
}

interface TermsAgreementsProps {
  onAgreementChange: (isValid: boolean) => void;
}

function TermsAgreements({ onAgreementChange }: TermsAgreementsProps) {
  const [agreements, setAgreements] = useState<Agreements>({
    all: false,
    service: false,
    privacy: false,
    marketing: false,
  });

  useEffect(() => {
    onAgreementChange(agreements.service && agreements.privacy);
  }, [agreements.service, agreements.privacy, onAgreementChange]);

  const handleAllClick = () => {
    const newValue = !agreements.all;
    setAgreements({
      all: newValue,
      service: newValue,
      privacy: newValue,
      marketing: newValue,
    });
  };

  const handleSingleClick = (key: keyof Agreements) => {
    const newAgreements = { ...agreements, [key]: !agreements[key] };
    const allChecked =
      newAgreements.service && newAgreements.privacy && newAgreements.marketing;
    setAgreements({ ...newAgreements, all: allChecked });
  };

  return (
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
  );
}

export default TermsAgreements;
