'use client';
import React, { useState } from 'react';
import Card from '@/components/main/Card';
import Image from 'next/image';
import OneActiveRunner from '@/components/main/CheerCard/OneActiveRunner';
import NoActiveRunner from '@/components/main/CheerCard/NoActiveRunner';
import TwoActiveRunner from '@/components/main/CheerCard/TwoActiveRunner';
import ManyActiveRunner from '@/components/main/CheerCard/ManyActiveRunner';

const CheerCard = () => {
  const [count] = useState(3);
  return (
    <Card className="relative overflow-hidden">
      <div className="absolute inset-0 z-10 bg-[linear-gradient(180deg,rgba(32,31,34,0.82)_0%,rgba(32,31,34,0.6)_100%)]" />
      <Image src="/assets/main/map.png" alt="map" fill className="z-0" />
      {count === 0 && <NoActiveRunner />}
      {count === 1 && <OneActiveRunner />}
      {count === 2 && <TwoActiveRunner />}
      {count >= 3 && <ManyActiveRunner />}
    </Card>
  );
};

export default CheerCard;
