'use client';
import React from 'react';
import Image from 'next/image';
import { Bell } from '@phosphor-icons/react';
import Card from '@/components/main/Card';
import ControlButton from '@/components/running/Control/ControlButton';
import { Play } from 'lucide-react';
import ProgressBar from '@/components/common/ProgressBar';

export default function Main() {
  return (
    <>
      <div className="flex w-full items-center justify-between">
        <Image
          src={'/assets/LogoWithText.png'}
          alt={'logo'}
          width={92}
          height={29}
        />
        <div className="relative">
          <Bell width={24} height={24} color={'white'} />
          {/* 빨간 점 */}
          <div className="absolute top-1 right-0 h-[8px] w-[8px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#FF3B30]" />
        </div>
      </div>
      {/*첫번째 카드*/}
      <Card className="relative mt-[36px] overflow-visible">
        <div className="flex items-center justify-start">
          <div>
            <p className="mb-2 text-[1.0625rem] leading-[150%] font-medium tracking-tight text-white/70">
              8월 15일 금요일
            </p>
            <p className="text-gray-20 text-[1.375rem] font-bold whitespace-break-spaces">
              {`안녕하세요,\n진수한접시님`}
            </p>
          </div>
          <div>
            <Image
              src={'/assets/icon/pig.svg'}
              alt={'character'}
              width={180}
              height={180}
              className="absolute -top-10 right-0 left-39 rotate-20"
            />
          </div>
        </div>
      </Card>
      {/*  두번째 카드*/}
      <Card className="relative mt-[24px] py-[28px]">
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <p className="tex-[1.0625rem] text-gray-20 leading-[150%] font-bold tracking-tight">
              이번주 목표
            </p>
            <div className="flex items-center">
              <p className="text-primary font-lufga text-[2.0625rem] leading-[1.4] font-bold tracking-[0] italic">
                15km
              </p>
              <p className="text-gray-20 ml-2 text-[1.5rem] leading-[1.4] font-bold tracking-[-0.025em]">
                달리기
              </p>
            </div>
          </div>
          <ControlButton className="h-[48px] w-[48px]">
            <Play className="h-[24px] w-[24px] fill-black text-black" />
          </ControlButton>
        </div>
        <ProgressBar
          progress={70}
          className="mt-[16px] h-[8px]"
          backgroundColor="bg-background"
          barColor="bg-gradient-to-r from-primary to-[#69b4ff]"
        />
        <div className="mt-[14px] flex items-center justify-between">
          <p className="text-gray-30 text-[1.0625rem] leading-[1.5] font-medium tracking-[-0.025em]">
            현재까지 달린 거리
          </p>
          <p className="font-lufga itailic text-gray-20 text-[1.1875rem] leading-[1.4] font-medium tracking-[-0.025em] italic">
            10km
          </p>
        </div>
        <div className="mt-[8px] flex items-center justify-between">
          <p className="text-gray-30 text-[1.0625rem] leading-[1.5] font-medium tracking-[-0.025em]">
            현재까지 달린 거리
          </p>
          <p className="font-lufga text-gray-20 text-[1.1875rem] leading-[1.4] font-medium tracking-[-0.025em] italic">
            5km
          </p>
        </div>
      </Card>
      <Card className="relative mt-[24px] py-[28px]">
        <p className="text-gray-30 text-[1.0625rem] leading-[1.5] font-medium tracking-[-0.025em]">
          오늘 달린 기록
        </p>
        <div className="mt-[12px] flex justify-around">
          <div className="flex flex-col items-center">
            <p className="font-lufga text-gray-20 inline-block -skew-x-2 transform text-[1.75rem] font-semibold tracking-[0] italic">
              1.3km
            </p>
            <p className="font-regular text-[0.9375rem] leading-[1.5] tracking-[-0.025em]">
              거리
            </p>
          </div>
          <div className="flex flex-col items-center">
            <p className="font-lufga text-gray-20 text-[1.75rem] font-semibold tracking-[0] italic">
              1:06
            </p>
            <p className="font-regular text-[0.9375rem] leading-[1.5] tracking-[-0.025em]">
              시간
            </p>
          </div>
          <div className="flex flex-col items-center">
            <p className="font-lufga text-gray-20 text-[1.75rem] font-semibold tracking-[0] italic">
              {`'-'--''`}
            </p>
            <p className="font-regular text-[0.9375rem] leading-[1.5] tracking-[-0.025em]">
              거리
            </p>
          </div>

          {/*  응원, 가챠 */}
        </div>
      </Card>
      <div className="mt-[24px] flex gap-4">
        <Card className="relative overflow-hidden">
          <div className="absolute inset-0 z-10 bg-[linear-gradient(180deg,rgba(32,31,34,0.82)_0%,rgba(32,31,34,0.6)_100%)]" />
          <Image src="/assets/main/map.png" alt="map" fill className="z-0" />
          <div className="relative z-20 flex-col pt-1">
            <div className="flex justify-center">
              <div className="bg-background z-10 flex h-[60px] w-[60px] justify-center rounded-full">
                <Image
                  src="/assets/icon/elephant.svg"
                  alt="elephant"
                  width={39.5}
                  height={35}
                />
              </div>
            </div>
            <div className="z-10 mt-5 justify-self-center text-center font-bold">
              <span className="text-primary z-10">인생한접시</span>
              <span className="whitespace-pre-line text-white">
                {`님이\n뛰고 있어요!\n함께 응원해요!`}
              </span>
            </div>
          </div>
        </Card>

        <Card className="bg-primary relative overflow-hidden">
          <div
            className="absolute inset-0 z-10"
            style={{
              background:
                'linear-gradient(180deg, rgb(32,31,34) 0%, rgba(32,31,34,0.7) 100%)'
            }}
          />
          <div className="relative z-20">
            <div className="flex justify-center">
              <div className="bg-primary w-[70px] justify-self-center rounded-full p-1 text-center leading-[1.4] tracking-[-0.025em] text-black/70">
                <span className="text-[17px] font-semibold">3</span>
                <span className="font-regular text-[17px] leading-[1.4] tracking-[-0.025em]">
                  /10개
                </span>
              </div>
            </div>
            <div className="mt-3 text-center text-[15px] leading-[1.4] font-medium tracking-[-0.025em] whitespace-pre-line text-white">
              {`클로버를 모으면\n 랜덤 가챠 1회권 지급!`}
            </div>
            <div className="flex justify-center">
              <Image
                alt="뽑기공"
                src="/assets/main/gachaball.svg"
                width={90}
                height={90}
              />
            </div>
          </div>
        </Card>
      </div>
      <div className="mt-[37px] flex">
        <p className="mr-2 flex align-baseline text-[20px] leading-[1.4] font-bold tracking-[-0.025em]">
          내 크루 챌린지
        </p>
        <button>
          <Image
            src="/assets/common/arrow-right.svg"
            alt="arrow"
            width={24}
            height={24}
          />
        </button>
      </div>

      <Card className="mt-[24px]">
        <div className="flex flex-row justify-between gap-2">
          {/* 상단 타이틀 */}
          <div>
            <div className="flex flex-row items-center justify-between">
              <div className="flex items-center">
                <p className="text-gray-20 mr-1 text-[17px] leading-[1.5] font-medium tracking-[-0.015em]">
                  블랙핑크-뛰어
                </p>
                <button>
                  <Image
                    src="/assets/common/arrow-right.svg"
                    alt="arrow"
                    width={24}
                    height={24}
                  />
                </button>
              </div>
            </div>

            {/* 아바타들 */}
            <div className="mt-1 flex flex-row">
              <div className="bg-background z-10 flex h-7 w-7 items-center justify-center rounded-full border-2 border-white/10">
                a
              </div>
              <div className="bg-background z-20 -ml-3 flex h-7 w-7 items-center justify-center rounded-full border-2 border-white/10">
                b
              </div>
              <div className="bg-background z-30 -ml-3 flex h-7 w-7 items-center justify-center rounded-full border-2 border-white/10">
                c
              </div>
            </div>
          </div>
          <span className="font-lufga flex items-baseline text-[33px] font-bold italic">
            2.2
            <span className="ml-1 text-[16px] font-semibold">km</span>
          </span>
        </div>
        <ProgressBar
          progress={70}
          className="mt-[16px] h-2"
          backgroundColor="bg-background"
        />
      </Card>

      <Card className="mt-[24px]">
        <div className="flex flex-row justify-between gap-2">
          {/* 상단 타이틀 */}
          <div>
            <div className="flex flex-row items-center justify-between">
              <div className="flex items-center">
                <p className="text-gray-20 mr-1 text-[17px] leading-[1.5] font-medium tracking-[-0.015em]">
                  우리 크루, 이번주도 완주 GO!
                </p>
                <button>
                  <Image
                    src="/assets/common/arrow-right.svg"
                    alt="arrow"
                    width={24}
                    height={24}
                  />
                </button>
              </div>
            </div>

            {/* 아바타들 */}
            <div className="mt-1 flex flex-row">
              <div className="bg-background z-10 flex h-7 w-7 items-center justify-center rounded-full border-2 border-white/10">
                a
              </div>
              <div className="bg-background z-20 -ml-3 flex h-7 w-7 items-center justify-center rounded-full border-2 border-white/10">
                b
              </div>
              <div className="bg-background z-30 -ml-3 flex h-7 w-7 items-center justify-center rounded-full border-2 border-white/10">
                c
              </div>
            </div>
          </div>
          <span className="font-lufga flex items-baseline text-[33px] font-bold italic">
            2.2
            <span className="ml-1 text-[16px] font-semibold">km</span>
          </span>
        </div>
        <ProgressBar
          progress={70}
          className="mt-[16px] h-2"
          backgroundColor="bg-background"
        />
      </Card>
    </>
  );
}
