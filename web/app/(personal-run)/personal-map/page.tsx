import KakaoMap from '@/components/KakaoMap/KakaoMap';
import { BottomDashboard } from '@/components/personal-map/BottomDashboard';

export default function PersonalMap() {
  return (
    <>
      <KakaoMap height="50vh" />
      <BottomDashboard />
    </>
  );
}
