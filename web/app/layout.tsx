'use client';
import './globals.css';
import DefaultLayout from '@/components/common/DefaultLayout';
import { usePathname } from 'next/navigation';
import { lufga, pretendard } from '@/fonts/fonts';
import { routeConfigs } from '@/configs/routeConfig';

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();

  // URL별 뒤로가기 링크
  const config = routeConfigs[pathname];
  return (
    <html
      lang="ko"
      className={`${lufga.variable} ${pretendard.variable} antialiased`}
    >
      <head>
        <title>Runky</title>
      </head>
      <body className="bg-background pt-[env(safe-area-inset-top)] pb-[env(safe-area-inset-bottom)] text-white">
        <DefaultLayout
          showHeader={config?.showHeader}
          title={config?.title}
          backHref={config?.backHref}
        >
          {children}
        </DefaultLayout>
      </body>
    </html>
  );
}
