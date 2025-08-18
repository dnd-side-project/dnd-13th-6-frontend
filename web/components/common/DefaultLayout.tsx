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
  showHeader = true,
  title,
  backHref
}: DefaultLayoutProps) {
  return (
    <div className="flex h-screen flex-col">
      <div className="h-[50px]" />
      {showHeader && (
        <header className="flex items-center justify-between bg-gradient-to-b p-4">
          {backHref ? (
            <Link href={backHref}>
              <Image
                src="/assets/CaretLeft.svg"
                alt="Back"
                width={24}
                height={24}
              />
            </Link>
          ) : (
            <div className="w-6" />
          )}
          {title && <h1 className="text-lg font-bold text-white">{title}</h1>}
          <div className="w-6" />
        </header>
      )}
      <main className="flex flex-1 flex-col p-4">{children}</main>
    </div>
  );
}
