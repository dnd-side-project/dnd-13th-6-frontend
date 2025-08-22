

import {  AdvancedMarker } from "@vis.gl/react-google-maps";
import Image from "next/image";

interface CustomMarkerProps {
  lat: number;
  lng: number;
  imageUrl: string;
}

function UserMarker({ lat, lng, imageUrl }: CustomMarkerProps) {
  return (
  <AdvancedMarker position={{ lat, lng }}>
      <div className="flex flex-col items-center transform" style={{ transform: 'translateY(-20px)' }}>
        {/* 프로필 이미지 (그라데이션 링 + 흰색 링) */}
        <div className="rounded-full bg-gradient-to-tr from-emerald-400 to-sky-400 p-[3px]">
          <div className="rounded-full bg-white p-1">
            <div className="size-[47px] overflow-hidden rounded-full">
              <Image
                src={imageUrl}
                alt="profile"
                width={47}
                height={47}
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </AdvancedMarker>
  );
}

export default UserMarker;