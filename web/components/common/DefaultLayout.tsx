import Image from 'next/image';
import Link from 'next/link';
import { useAtomValue } from 'jotai';
import { headerSaveAtom } from '@/store/header';

interface DefaultLayoutProps {
  children: React.ReactNode;
  showHeader?: boolean;
  title?: string;
  backHref?: string;
  showSaveButton?: boolean;
}

export default function DefaultLayout({
  children,
  showHeader = false,
  title = undefined,
  backHref,
  showSaveButton,
}: DefaultLayoutProps) {
  const handleSave = useAtomValue(headerSaveAtom);

  return (
    <div className="flex h-screen flex-col">
      {showHeader && (
        <>
          <div className="h-[59px] flex-none" />
          <header className="flex items-center">
            {backHref && (
              <div className="p-4">
                <Link href={backHref}>
                  <Image
                    src="/assets/CaretLeft.svg"
                    alt="Back"
                    width={24}
                    height={24}
                  />
                </Link>
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
        </>
      )}

      <main className={showHeader ? 'flex flex-1 flex-col px-4 pb-4' : ''}>
        {children}
      </main>
    </div>
  );
}