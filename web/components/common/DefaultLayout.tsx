import Image from 'next/image';
import Link from 'next/link';

interface DefaultLayoutProps {
  children: React.ReactNode;
  showHeader?: boolean;
  title?: string;
  backHref?: string;
}

export default function DefaultLayout({
  children,
  showHeader = false,
  title,
  backHref
}: DefaultLayoutProps) {
  return (
    <div className="flex h-screen flex-col">
      {showHeader && (
        <>
          <div className="h-[59px] flex-none" />
          <header className=" ">
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
            {title && <h1 className="text-lg font-bold text-white">{title}</h1>}
          </header>
        </>
      )}

      <main className={showHeader ? 'flex flex-1 flex-col p-4' : ''}>
        {children}
      </main>
    </div>
  );
}
