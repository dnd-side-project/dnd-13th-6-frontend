'use client';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { routeConfigs } from '@/configs/groupRouteConfig';
import { MODULE } from '@/utils/apis/api';
import { postMessageToApp } from '@/utils/apis/postMessageToApp';
import router from 'next/router';

export default function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  // URL별 뒤로가기 링크
  const config = routeConfigs[pathname] || routeConfigs['/group/running'];
  const { backHref, title, showHeader } = config;

  const handleBack = () => {
    const data = {
      type: MODULE.PUSH,
      url: '/(tabs)/(home)'
    };
    postMessageToApp(MODULE.PUSH, JSON.stringify(data));
  };
  return (
    <>
      {showHeader && (
        <header className="flex items-center">
          <div className="p-4">
            {backHref === '/app/home' ? (
              <button onClick={handleBack}>
                <Image
                  src="/assets/CaretLeft.svg"
                  alt="Back"
                  width={24}
                  height={24}
                />
              </button>
            ) : (
              <Link href={backHref!}>
                <Image
                  src="/assets/CaretLeft.svg"
                  alt="Back"
                  width={24}
                  height={24}
                />
              </Link>
            )}
          </div>
          {title && (
            <h1 className="absolute left-1/2 -translate-x-1/2 transform text-lg font-bold text-white">
              {title}
            </h1>
          )}
        </header>
      )}
      {children}
    </>
  );
}
