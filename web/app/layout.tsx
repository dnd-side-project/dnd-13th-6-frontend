import "./globals.css";
import localFont from 'next/font/local'

const pretendard = localFont({
  src: '../fonts/pretendard/PretendardVariable.woff2',
  display: 'swap',
  weight: '100 900',
  variable: '--font-pretendard',
})
import './globals.css';
import Script from 'next/script';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const KAKAO_APP_KEY = process.env.NEXT_PUBLIC_KAKAO_MAPS_APP_KEY;
  if (!KAKAO_APP_KEY) {
    throw new Error('KAKAO_SDK_URL is not defined');
  }
  const KAKAO_SDK_URL = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${KAKAO_APP_KEY}&autoload=false`;

  return (
    <html lang="en">
      <head>
        <title>Runky</title>
        <Script src={KAKAO_SDK_URL} strategy="beforeInteractive" />
      </head>
      <body className={`${pretendard.variable} antialiased`}>
        <main>{children}</main>
      </body>
    </html>
  );
}
