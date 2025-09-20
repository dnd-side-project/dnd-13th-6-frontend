'use client';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { routeConfigs } from '@/configs/groupRouteConfig';
import { MODULE } from '@/utils/apis/api';
import { postMessageToApp } from '@/utils/apis/postMessageToApp';
import { useRouter } from 'next/navigation';
import { useMemo } from 'react';

export default function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  // URL별 뒤로가기 링크
  const config = useMemo(() => {
    return routeConfigs[pathname] || routeConfigs['/group/running'];
  }, [pathname]);
  const { backHref, title, showHeader } = config;
  const handleBack = (url: string) => {
    const data = {
      type: MODULE.PUSH,
      url
    };
    router.replace('/main');
    postMessageToApp(MODULE.PUSH, JSON.stringify(data));
  };
  return (
    <>
      {showHeader && (
        <header className="flex items-center">
          <div className="p-4">
            {backHref?.includes('/native') ? (
              <button
                onClick={() => handleBack(backHref.replace('/native', ''))}
              >
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
