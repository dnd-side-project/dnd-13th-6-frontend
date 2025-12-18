import './globals.css';
import ClientLayoutWrapper from '@/components/common/ClientLayoutWrapper'; // 새로 만든 컴포넌트 import
import { GlobalConfirmModal } from '@/components/common/GlobalConfirmModal';
import QueryProvider from '@/components/common/QueryProvider';
import { lufga, pretendard } from '@/fonts/fonts';
import React from 'react';
import { headers } from 'next/headers';

export const metadata = {
  title: 'Runky',
  themeColor: '#211e22',
  viewport: {
    width: 'device-width',
    initialScale: 1,
    minimumScale: 1,
    maximumScale: 1,
    userScalable: false
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  const headerList = headers();
  return (
    <html
      lang="ko"
      className={`${lufga.variable} ${pretendard.variable} h-full antialiased bg-background`}
      style={{ backgroundColor: '#211e22' }}
    >
      <body
        className="bg-background h-full overflow-hidden text-white"
        style={{ backgroundColor: '#211e22' }}
      >
        <QueryProvider>
          <ClientLayoutWrapper>{children}</ClientLayoutWrapper>
          <GlobalConfirmModal />
        </QueryProvider>
      </body>
    </html>
  );
}
