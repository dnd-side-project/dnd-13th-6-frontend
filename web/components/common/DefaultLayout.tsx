'use client';
import { useAtomValue } from 'jotai';
import { headerBackAtom, headerSaveAtom } from '@/store/header';
import { useRouter } from 'next/navigation';
import CaretLeft from '@/public/assets/CaretLeft.svg';

interface DefaultLayoutProps {
  children: React.ReactNode;
  showHeader?: boolean;
  title?: string;
  backHref?: string;
  showAlarmIcon?: boolean;
  showSaveButton?: boolean;
}

export default function DefaultLayout({
  children,
  showHeader = false,
  title = undefined,
  backHref,
  showSaveButton
}: DefaultLayoutProps) {
  const handleSave = useAtomValue(headerSaveAtom);
  const handleBack = useAtomValue(headerBackAtom);
  const router = useRouter();
  return (
    <div className="flex h-full flex-col">
      {showHeader && (
        <div className="bg-background top-0 z-10">
          {(backHref || title || showSaveButton) && (
            <div className="relative h-16">
              <header className="fixed flex h-16 w-full items-center justify-between px-4">
                {/* 1. 왼쪽 영역 너비 고정 */}
                <div className="flex w-16 items-center justify-start">
                  {backHref && (
                    <button
                      onClick={() => {
                        if (handleBack) {
                          handleBack?.();
                        } else {
                          router.push(backHref);
                        }
                      }}
                      className="mr-2"
                    >
                      <CaretLeft width={24} height={24} />
                    </button>
                  )}
                </div>

                {/* 2. 제목을 absolute로 중앙 정렬 */}
                {title && (
                  <h1 className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-lg font-bold text-white">
                    {title}
                  </h1>
                )}

                {/* 3. 오른쪽 영역 너비 고정 */}
                <div className="flex w-16 items-center justify-end">
                  {showSaveButton && handleSave && (
                    <button
                      onClick={handleSave}
                      className="text-[1.0625rem] leading-[22px] font-semibold tracking-[-0.43px]"
                    >
                      저장
                    </button>
                  )}
                </div>
              </header>
            </div>
          )}
        </div>
      )}

      <main
        className={
          showHeader
            ? 'flex flex-1 flex-col overflow-y-auto px-4 pt-4 pb-4'
            : 'h-full overflow-y-auto'
        }
      >
        {children}
      </main>
    </div>
  );
}
