'use client';
import React, { Suspense, useMemo } from 'react';
import ProfileImage from '@/components/common/ProfileImage';
import GoogleMap from '@/components/googleMap/GoogleMap';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import UserMarker from '@/components/googleMap/UserMarker';
import type { MemberData } from '@/types/crew';
import { useSearchParams } from 'next/navigation';
import { postCheerfulMessage } from '@/utils/apis/running';
import { useCrewRunningSocket } from '@/hooks/running/useCrewRunningSocket';
import { useCloverAnimation } from '@/hooks/ui/useCloverAnimation';
import { postMessageToApp } from '@/utils/apis/postMessageToApp';

function CrewMemberProfiles({
  users,
  onClick
}: {
  users: Array<MemberData>;
  onClick: (user: MemberData) => void;
}) {
  return (
    <div className="mt-6 flex gap-4 overflow-x-scroll">
      {users.map((user, index) => (
        <ProfileImage
          key={index}
          onClick={() => {
            if (user.isRunning) {
              onClick(user);
            }
          }}
          isRunning={user.isRunning}
          profileImageUrl={user.badgeImageUrl}
          alt="user"
        />
      ))}
    </div>
  );
}

const SendCloverButton = ({ member }: { member: MemberData | null }) => {
  const { clovers, startCloverAnimation } = useCloverAnimation();

  const sendEmoji = (emojiType: string) => {
    if (!member?.isRunning) return;

    startCloverAnimation();
    const runningId = member?.sub.split('/').at(-1);

    if (runningId && !isNaN(Number(runningId))) {
      postCheerfulMessage({
        runningId,
        memberId: member?.memberId,
        emojiType
      });
    }
  };

  return (
    <button
      onClick={() => sendEmoji('clover')}
      disabled={!member}
      className="absolute right-2 bottom-2 z-50 ml-auto flex items-center gap-2 rounded-full bg-black/50 px-4 py-2 text-white"
    >
      <div className="relative h-5 max-h-15 w-5">
        <Image src="/assets/clover.png" alt="clover" fill />
        <div className="pointer-events-none absolute top-0 left-2 h-5 w-5">
          <AnimatePresence>
            {clovers.map(c => (
              <motion.div
                key={c.id}
                initial={{ y: 0, scale: 3, opacity: 0.3 }}
                animate={{
                  y: -100,
                  x: 50,
                  scale: 12,
                  opacity: 1,
                  rotate: 45
                }}
                transition={{ duration: 0.5 }}
                className="absolute top-0 left-1/2 -translate-x-1/2"
              >
                <Image
                  src="/assets/clover-142.png"
                  alt="clover"
                  width={142}
                  height={142}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
      <div>행운 보내기</div>
    </button>
  );
};

function GroupRunningContent() {
  const searchParams = useSearchParams();
  const crewId = searchParams.get('q');
  const { members, activeMember, memberLocation, selectMember } =
    useCrewRunningSocket(crewId);

  const latestMemberLocation = useMemo(() => {
    return memberLocation.at(-1)
  }, [memberLocation]);

  const data = {
    type: 'CONTENT_HEIGHT',
    height: 400
  };
     postMessageToApp('CONTENT_HEIGHT', JSON.stringify(data));

  return (
    <div className="relative -mt-6 w-full max-h-[650px] overflow-hidden bg-[#313131] px-4 text-white">
      <CrewMemberProfiles users={members} onClick={selectMember} />
      <div className="mt-6 mb-[14px] bg-[#313131] relative">
        <GoogleMap height="450px" paths={[memberLocation]}>
          {(
            <>
              {activeMember && latestMemberLocation &&
                <UserMarker
                  lat={latestMemberLocation.lat}
                  lng={latestMemberLocation.lng}
                  imageUrl={activeMember.badgeImageUrl}
                />
              }
            </>
          )}
        </GoogleMap>
        <SendCloverButton member={activeMember} />
      </div>
    </div>
  );
}

export default function Page() {

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <GroupRunningContent />
    </Suspense>
  );
}