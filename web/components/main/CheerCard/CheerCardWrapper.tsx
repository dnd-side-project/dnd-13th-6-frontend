'use client';
import React, { useEffect, useState } from 'react';
import Card from '@/components/main/Card';
import Image from 'next/image';
import OneActiveRunner from '@/components/main/CheerCard/OneActiveRunner';
import NoActiveRunner from '@/components/main/CheerCard/NoActiveRunner';
import TwoActiveRunner from '@/components/main/CheerCard/TwoActiveRunner';
import ManyActiveRunner from '@/components/main/CheerCard/ManyActiveRunner';
import api from '@/utils/apis/customAxios';
import { CREW_API, MODULE } from '@/utils/apis/api';
import { postMessageToApp } from '@/utils/apis/postMessageToApp';
import { RunningUser } from '@/types/runningUser';

const CheerCardWrapper = () => {
  const [runningUser, setRunningUser] = useState<RunningUser[]>([]);
  const [count] = useState(runningUser?.length);
  const fetchRunningUser = async () => {
    const res = await api.get(CREW_API.MEMBER_RUNNING());
    setRunningUser(res.data.result.runningMembers);
  };
  useEffect(() => {
    fetchRunningUser();
  }, []);
  const renderRunnerComponent = (runningUser: RunningUser[]) => {
    switch (count) {
      case 0:
        return <NoActiveRunner />;
      case 1:
        return <OneActiveRunner runningUser={runningUser} />;
      case 2:
        return <TwoActiveRunner runningUser={runningUser} />;
      default:
        return count >= 3 ? (
          <ManyActiveRunner runningUser={runningUser} />
        ) : null;
    }
  };
  const onMove = () => {
    const data = {
      type: MODULE.PUSH,
      url: '/(tabs)/(group)'
    };
    postMessageToApp(MODULE.PUSH, JSON.stringify(data));
  };
  return (
    <Card className="relative overflow-hidden" onClick={onMove}>
      <div className="absolute inset-0 z-10 bg-[linear-gradient(180deg,rgba(32,31,34,0.82)_0%,rgba(32,31,34,0.6)_100%)]" />
      <Image src="/assets/main/map.png" alt="map" fill className="z-0" />
      {renderRunnerComponent(runningUser)}
    </Card>
  );
};

export default CheerCardWrapper;
