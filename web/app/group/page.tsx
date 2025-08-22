'use client'
import Image from 'next/image'
import ProgressBar from "@/components/common/ProgressBar"
import { useRouter } from 'next/navigation'
function CrewCard() {
  return (
    <div className="bg-[#363538] px-4 py-[22px] rounded-2xl flex flex-col gap-4 flex-grow">
      <div className="flex w-full justify-between items-center">
        <div>
          <div>블랙핑크-뛰어<Image className='inline' src="/assets/CaretRight.svg" alt="crew" width={20} height={20} /> </div>
          <div className="flex mt-2">
            <Image src="/assets/clover.png" alt="crew" width={28} height={28} />
          <Image src="/assets/clover.png" alt="crew" width={28} height={28} />
            <Image src="/assets/clover.png" alt="crew" width={28} height={28} />
            <Image src="/assets/clover.png" alt="crew" width={28} height={28} />
          </div>
        </div>
        <div className="text-white font-bold"><span className="text-2xl">2.2</span><span className="font-semibold">km</span></div>
      </div>
      <ProgressBar progress={50} className="w-full" />
      <button className="w-full bg-[#48484A] rounded-2xl" onClick={() => alert('결과보기')}>
        <div className="text-[17px] py-3 font-bold">이번 주 결과보기</div>
      </button>
    </div>
  )
}

export default function Page() {
  const router = useRouter();
  return (
    <div className="w-full">
      <div className="flex flex-col gap-4 h-[calc(100vh-90px)] overflow-y-auto">
        <CrewCard />
        <CrewCard />
        <CrewCard />
        <CrewCard />
        <CrewCard />
      </div>
      <div className="w-full flex gap-3 fixed bottom-4">
        <button className="w-full bg-[#48484A] rounded-2xl" onClick={() => alert('결과보기')}>
          <div className="text-[17px] py-3 font-bold">크루 만들기</div>
        </button>
        <button className="w-full bg-[#32FF76] rounded-2xl" onClick={() => router.push('/group-code')}>
          <div className="text-[18px] py-3 text-black font-bold">초대 코드 입력</div>
        </button>
      </div>
    </div>
  )
}