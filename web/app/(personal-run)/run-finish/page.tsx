'use client';

import React, { useEffect, useState } from 'react';
import KakaoMap from '@/components/KakaoMap/KakaoMap';
import ExerciseOverview from '@/components/personal-map/ExerciseOverview';
import Confetti from 'react-confetti';

export default function Page() {
  const [numberOfPieces, setNumberOfPieces] = useState(0);
  const [date, setDate] = useState('');
  const [isClient, setIsClient] = useState(false);
  const [windowSize, setWindowSize] = useState({
    width: 0,
    height: 0
  });

  useEffect(() => {
    setIsClient(true);
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight
    });
    setNumberOfPieces(300);
    setDate(new Date().toLocaleString());

    const timer = setTimeout(() => {
      setNumberOfPieces(0);
    }, 7000); // Stop confetti after 7 seconds

    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      {isClient && (
        <Confetti
          width={windowSize.width}
          height={windowSize.height}
          numberOfPieces={numberOfPieces}
          recycle={false}
          style={{ zIndex: 9999 }}
        />
      )}
      <div className="h-[50vh] p-4">
        <div>{date}</div>
        <div className="text-[5rem] font-bold">0.00</div>
        <div className="pb-5">
          <p className="inline-block bg-[#d9d9d9] px-2 py-1 rounded w-30">
            킬로미터
          </p>
        </div>
        <ExerciseOverview />
      </div>
      <KakaoMap height="50vh" />
    </div>
  );
}
