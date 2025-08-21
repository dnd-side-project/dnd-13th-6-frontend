'use client';
import localFont from 'next/font/local';
import './globals.css';
import DefaultLayout from '@/components/common/DefaultLayout';
import { usePathname } from 'next/navigation';

const pretendard = localFont({
  src: '../fonts/pretendard/PretendardVariable.woff2',
  display: 'swap',
  weight: '100 900',
  variable: '--font-pretendard'
});

const lufga = localFont({
  src: [
    {
      path: '../fonts/Lufga/LufgaThin.ttf',
      weight: '100',
      style: 'normal'
    },
    {
      path: '../fonts/Lufga/LufgaThinItalic.ttf',
      weight: '100',
      style: 'italic'
    },
    {
      path: '../fonts/Lufga/LufgaExtraLight.ttf',
      weight: '200',
      style: 'normal'
    },
    {
      path: '../fonts/Lufga/LufgaExtraLightItalic.ttf',
      weight: '200',
      style: 'italic'
    },
    {
      path: '../fonts/Lufga/LufgaLight.ttf',
      weight: '300',
      style: 'normal'
    },
    {
      path: '../fonts/Lufga/LufgaLightItalic.ttf',
      weight: '300',
      style: 'italic'
    },
    {
      path: '../fonts/Lufga/LufgaRegular.ttf',
      weight: '400',
      style: 'normal'
    },
    {
      path: '../fonts/Lufga/LufgaItalic.ttf',
      weight: '400',
      style: 'italic'
    },
    {
      path: '../fonts/Lufga/LufgaMedium.ttf',
      weight: '500',
      style: 'normal'
    },
    {
      path: '../fonts/Lufga/LufgaMediumItalic.ttf',
      weight: '500',
      style: 'italic'
    },
    {
      path: '../fonts/Lufga/LufgaSemiBold.ttf',
      weight: '600',
      style: 'normal'
    },
    {
      path: '../fonts/Lufga/LufgaSemiBoldItalic.ttf',
      weight: '600',
      style: 'italic'
    },
    {
      path: '../fonts/Lufga/LufgaBold.ttf',
      weight: '700',
      style: 'normal'
    },
    {
      path: '../fonts/Lufga/LufgaBoldItalic.ttf',
      weight: '700',
      style: 'italic'
    },
    {
      path: '../fonts/Lufga/LufgaExtraBold.ttf',
      weight: '800',
      style: 'normal'
    },
    {
      path: '../fonts/Lufga/LufgaExtraBoldItalic.ttf',
      weight: '800',
      style: 'italic'
    },
    {
      path: '../fonts/Lufga/LufgaBlack.ttf',
      weight: '900',
      style: 'normal'
    },
    {
      path: '../fonts/Lufga/LufgaBlackItalic.ttf',
      weight: '900',
      style: 'italic'
    }
  ],
  display: 'swap',
  variable: '--font-lufga'
});

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();

  // URL별 뒤로가기 링크
  const backHrefMap: Record<string, string | undefined> = {
    '/login': undefined,
    '/onboarding/terms': '/login',
    '/onboarding/setup-nickname': '/onboarding/terms',
    '/onboarding/select-character': '/onboarding/setup-nickname',
    '/onboarding/setup-target': '/onboarding/select-character',
    '/main': undefined
  };

  // URL별 헤더 표시 여부
  const showHeaderMap: Record<string, boolean> = {
    '/login': false,
    '/onboarding': true,
    '/onboarding/terms': true,
    '/onboarding/setup-nickname': true,
    '/onboarding/select-character': true,
    '/onboarding/setup-target': true,
    '/onboarding/onboarding-finish': true,
    '/main': true
  };
  //URL 별 타이틀 표시 여부
  const headerTitleMap: Record<string, string> = {};

  const backHref = backHrefMap[pathname];
  const showHeader = showHeaderMap[pathname] ?? false; // 기본 false
  const title = headerTitleMap[pathname] ?? undefined;
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
          showHeader={showHeader}
          title={title}
          backHref={backHref}
        >
          {children}
        </DefaultLayout>
      </body>
    </html>
  );
}
