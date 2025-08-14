'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import Button from '@/components/common/Button';
import { useRouter } from 'next/navigation';

export default function LuckyStampPage() {
  const [visible, setVisible] = useState(false);
  const router = useRouter();
  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 100); // 0.1초 후에 나타나기 시작
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="text-white min-h-screen flex flex-col justify-between p-4 font-pretendard">
      {/* Spacer for top area */}
      <h1 className="text-2xl font-semibold leading-relaxed mb-8 whitespace-pre-line">
        {'오늘도 수고 많으셨어요!\n오늘의 행운이 도착했어요!'}
      </h1>
      <div className="flex-grow flex flex-col items-center justify-center text-center">
        <Image
          src="/assets/lucky-stamp/four-leaf-clover.png"
          alt="Four Leaf Clover"
          width={225}
          height={224}
          priority
        />
        <div
          className={`inline-flex items-center justify-center px-6 py-4
      bg-[rgba(255,255,255,0.13)] rounded-[20px] mt-10 transition-opacity duration-1000 ${
        visible ? 'opacity-100' : 'opacity-0'
      }`}
        >
          <p className="text-xl font-bold text-gray-20 font-pretendard">
            클로버 +1개
          </p>
        </div>
      </div>

      {/* Bottom Button */}
      <div className="w-full">
        <Button onClick={() => router.push('/')} className="w-full h-15 mb-5">
          홈화면으로 돌아가기
        </Button>
      </div>
    </div>
  );
}
