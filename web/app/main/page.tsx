'use client';
import React from 'react';
import MainHeader from '@/components/main/MainHeader';
import WelcomeCard from '@/components/main/WelcomeCard';
import WeeklyGoalCard from '@/components/main/WeeklyGoalCard';
import TodayStatsCard from '@/components/main/TodayStatsCard';
import CheerCard from '@/components/main/CheerCard';
import GachaCard from '@/components/main/GachaCard';
import CrewChallengeSection from '@/components/main/CrewChallengeSection';

export default function Main() {
  return (
    <>
      <MainHeader />
      <WelcomeCard />
      <WeeklyGoalCard />
      <TodayStatsCard />
      <div className="mt-[24px] flex gap-4">
        <CheerCard />
        <GachaCard />
      </div>
      <CrewChallengeSection />
    </>
  );
}