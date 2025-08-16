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
    <div className="flex flex-col h-screen">
      <div className="h-[50px]" />
      {showHeader && (
        <header className="flex items-center justify-between p-4 bg-gradient-to-b">
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
          {title && <h1 className="text-white text-lg font-bold">{title}</h1>}
          <div className="w-6" />
        </header>
      )}
      <main className="flex-1 flex flex-col">{children}</main>
    </div>
  );
}
