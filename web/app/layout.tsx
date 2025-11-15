import './globals.css';
import ClientLayoutWrapper from '@/components/common/ClientLayoutWrapper'; // 새로 만든 컴포넌트 import
import { GlobalConfirmModal } from '@/components/common/GlobalConfirmModal';
import QueryProvider from '@/components/common/QueryProvider';
import { lufga, pretendard } from '@/fonts/fonts';
import React from 'react';
import { headers } from 'next/headers';

export const metadata = {
  title: 'Runky',
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
  const webviewSecret = headerList.get('X-App-Auth');
  return (
    <html
      lang="ko"
      className={`${lufga.variable} ${pretendard.variable} h-full antialiased`}
    >
      <body
        className="bg-background h-full overflow-hidden text-white"
        data-webview-secret={webviewSecret}
      >
        <QueryProvider>
          <ClientLayoutWrapper>{children}</ClientLayoutWrapper>
          <GlobalConfirmModal />
        </QueryProvider>
      </body>
    </html>
  );
}
