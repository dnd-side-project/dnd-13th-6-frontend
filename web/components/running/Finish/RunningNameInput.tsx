'use client';
import React, { useEffect, useState } from 'react';

function RunningNameInput() {
  const [name, setName] = useState('');

  useEffect(() => {
    setName(
      new Date().toLocaleDateString('ko-KR', {
        month: 'long',
        day: 'numeric',
        weekday: 'long'
      }) + ' 러닝'
    );
  }, []);

  return (
    <div className="mb-3 flex items-center">
      <div className="max-w-[200px]">
        <p className="text-gray-40 truncate text-lg">{name}</p>
      </div>
    </div>
  );
}

export default RunningNameInput;
