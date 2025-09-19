'use client';
import Image from 'next/image';
import { useAtomValue } from 'jotai';
import { headerBackAtom, headerSaveAtom } from '@/store/header';
import { useRouter } from 'next/navigation';

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
                <div className="flex items-center">
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
                      <Image
                        src="/assets/CaretLeft.svg"
                        alt="Back"
                        width={24}
                        height={24}
                      />
                    </button>
                  )}
                </div>
                {title && (
                  <h1 className="flex-grow text-center text-lg font-bold text-white">
                    {title}
                  </h1>
                )}
                <div className="flex items-center">
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
