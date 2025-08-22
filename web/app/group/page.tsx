'use client'
import Image from 'next/image'
import ProgressBar from "@/components/common/ProgressBar"
function CrewCard() {
  return (
    <div className="bg-[#363538] px-4 py-[22px] rounded-2xl flex flex-col gap-4">
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
        <div className="text-[17px] py-3 text-bold">이번 주 결과보기</div>
      </button>
    </div>
  )
}

export default function Page() {
  return (
    <div className="w-full">
      <CrewCard />
    </div>
  )
}