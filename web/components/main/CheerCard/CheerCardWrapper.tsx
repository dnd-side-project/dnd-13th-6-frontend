'use client';
import React, { useState } from 'react';
import Card from '@/components/main/Card';
import Image from 'next/image';
import OneActiveRunner from '@/components/main/CheerCard/OneActiveRunner';
import NoActiveRunner from '@/components/main/CheerCard/NoActiveRunner';
import TwoActiveRunner from '@/components/main/CheerCard/TwoActiveRunner';
import ManyActiveRunner from '@/components/main/CheerCard/ManyActiveRunner';

const CheerCardWrapper = () => {
  const [count] = useState(0);
  const renderRunnerComponent = () => {
    switch (count) {
      case 0:
        return <NoActiveRunner />;
      case 1:
        return <OneActiveRunner />;
      case 2:
        return <TwoActiveRunner />;
      default:
        return count >= 3 ? <ManyActiveRunner /> : null;
    }
  };

  return (
    <Card className="relative overflow-hidden">
      <div className="absolute inset-0 z-10 bg-[linear-gradient(180deg,rgba(32,31,34,0.82)_0%,rgba(32,31,34,0.6)_100%)]" />
      <Image src="/assets/main/map.png" alt="map" fill className="z-0" />
      {renderRunnerComponent()}
    </Card>
  );
};

export default CheerCardWrapper;
