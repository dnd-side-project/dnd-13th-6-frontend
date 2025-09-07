import './globals.css';
import ClientLayoutWrapper from '@/components/common/ClientLayoutWrapper'; // 새로 만든 컴포넌트 import
import { lufga, pretendard } from '@/fonts/fonts';
import React from 'react';

export const metadata = {
  title: 'Runky'
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ko"
      className={`${lufga.variable} ${pretendard.variable} antialiased h-full`}
    >
      <body className="bg-background text-white h-full overflow-hidden">
        <ClientLayoutWrapper>{children}</ClientLayoutWrapper>
      </body>
    </html>
  );
}