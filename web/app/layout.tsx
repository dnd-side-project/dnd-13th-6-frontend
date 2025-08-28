import './globals.css';
import { lufga, pretendard } from '@/fonts/fonts';
import ClientLayoutWrapper from '@/components/common/ClientLayoutWrapper'; // 새로 만든 컴포넌트 import
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
      className={`${lufga.variable} ${pretendard.variable} antialiased`}
    >
      <body className="bg-background pt-[env(safe-area-inset-top)] pb-[env(safe-area-inset-bottom)] text-white">
        <ClientLayoutWrapper>{children}</ClientLayoutWrapper>
      </body>
    </html>
  );
}
