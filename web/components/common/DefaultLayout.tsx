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
    <div className="flex h-full flex-col ">
      {showHeader && (
        <div className="sticky top-0 z-10 bg-background pt-[env(safe-area-inset-top)]">
          <header className="flex items-center">
            {backHref && (
              <div className="p-4">
                <button
                  onClick={() => {
                    if (handleBack) {
                      handleBack?.();
                    } else {
                      router.push(backHref);
                    }
                  }}
                >
                  <Image
                    src="/assets/CaretLeft.svg"
                    alt="Back"
                    width={24}
                    height={24}
                  />
                </button>
              </div>
            )}
            {title && (
              <h1 className="absolute left-1/2 -translate-x-1/2 transform text-lg font-bold text-white">
                {title}
              </h1>
            )}
            {showSaveButton && handleSave && (
              <button
                onClick={handleSave}
                className="ml-auto p-4 text-[1.0625rem] leading-[22px] font-semibold tracking-[-0.43px]"
              >
                저장
              </button>
            )}
          </header>
        </div>
      )}

      <main
        className={          showHeader
            ? 'flex flex-1 flex-col overflow-y-auto px-4 pb-4'
            : 'h-full overflow-y-auto pt-[env(safe-area-inset-top)] pb-[env(safe-area-inset-bottom)]'
        }
      >
        {children}
      </main>
    </div>
  );
}