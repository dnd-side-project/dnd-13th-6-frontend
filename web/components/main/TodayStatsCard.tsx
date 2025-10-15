'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import { useTodayRunning } from '@/hooks/queries/useTodayRunning';
import StatsCard from '@/components/common/Stats/StatsCard';
import Card from '@/components/main/Card';

const TodayStatsCard = () => {
  const router = useRouter();
  const [totalDistance, setTotalDistance] = useState(0); // meters
  const [totalTime, setTotalTime] = useState(0); // seconds
  const [distanceForPace, setDistanceForPace] = useState(0); // meters

  //  변환
  const formatDistance = (meters: number) => {
    if (!meters) return '0';
    return (meters / 1000).toFixed(2);
  };

  const formatTime = (seconds: number) => {
    if (!seconds) return '0';
    const min = Math.floor(seconds / 60);
    const sec = seconds % 60;
    return `${min}:${sec.toString().padStart(2, '0')}`;
  };

  const formatPace = (distanceMeters: number, durationSeconds: number) => {
    if (!distanceMeters || !durationSeconds) return "-'--''"; // 0일 때 표시
    const paceSec = durationSeconds / (distanceMeters / 1000);
    const min = Math.floor(paceSec / 60);
    if (min >= 50) return "-'--''"; // Set upper limit for pace to 50 min/km

    const sec = Math.round(paceSec % 60);
    return `${min}'${sec.toString().padStart(2, '0')}''`;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get(RUNNING_API.RUNNING_TODAY());
        console.log('오늘', res.data);
        setTotalDistance(res.data.result.totalDistanceMeter);
        setTotalTime(res.data.result.durationSeconds);
        setDistanceForPace(res.data.result.totalDistanceMeter);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  const handleMove = () => {
    router.push('/today-run-result');
  };

  const totalDistance = todayRunningData?.totalDistanceMeter ?? 0;
  const totalTime = todayRunningData?.durationSeconds ?? 0;

  return (
    <Card
      className="relative mt-[24px] pt-[16px] pb-[16px]"
      onClick={handleMove}
    >
      <StatsCard
        title="오늘 달린 기록"
        totalDistance={totalDistance}
        totalTime={totalTime}
      />
    </Card>
  );
};

export default TodayStatsCard;
