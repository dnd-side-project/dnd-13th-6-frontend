import localFont from 'next/font/local';
import './globals.css';
import Script from 'next/script';

const pretendard = localFont({
  src: '../fonts/pretendard/PretendardVariable.woff2',
  display: 'swap',
  weight: '100 900',
  variable: '--font-pretendard',
})

const lufga = localFont({
  src: [
    {
      path: '../fonts/Lufga/LufgaThin.ttf',
      weight: '100',
      style: 'normal',
    },
    {
      path: '../fonts/Lufga/LufgaThinItalic.ttf',
      weight: '100',
      style: 'italic',
    },
    {
      path: '../fonts/Lufga/LufgaExtraLight.ttf',
      weight: '200',
      style: 'normal',
    },
    {
      path: '../fonts/Lufga/LufgaExtraLightItalic.ttf',
      weight: '200',
      style: 'italic',
    },
    {
      path: '../fonts/Lufga/LufgaLight.ttf',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../fonts/Lufga/LufgaLightItalic.ttf',
      weight: '300',
      style: 'italic',
    },
    {
      path: '../fonts/Lufga/LufgaRegular.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../fonts/Lufga/LufgaItalic.ttf',
      weight: '400',
      style: 'italic',
    },
    {
      path: '../fonts/Lufga/LufgaMedium.ttf',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../fonts/Lufga/LufgaMediumItalic.ttf',
      weight: '500',
      style: 'italic',
    },
    {
      path: '../fonts/Lufga/LufgaSemiBold.ttf',
      weight: '600',
      style: 'normal',
    },
    {
      path: '../fonts/Lufga/LufgaSemiBoldItalic.ttf',
      weight: '600',
      style: 'italic',
    },
    {
      path: '../fonts/Lufga/LufgaBold.ttf',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../fonts/Lufga/LufgaBoldItalic.ttf',
      weight: '700',
      style: 'italic',
    },
    {
      path: '../fonts/Lufga/LufgaExtraBold.ttf',
      weight: '800',
      style: 'normal',
    },
    {
      path: '../fonts/Lufga/LufgaExtraBoldItalic.ttf',
      weight: '800',
      style: 'italic',
    },
    {
      path: '../fonts/Lufga/LufgaBlack.ttf',
      weight: '900',
      style: 'normal',
    },
    {
      path: '../fonts/Lufga/LufgaBlackItalic.ttf',
      weight: '900',
      style: 'italic',
    },
  ],
  display: 'swap',
  variable: '--font-lufga',
})

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
    <html lang="en" className={`${lufga.variable} ${pretendard.variable} antialiased`}>
      <head>
        <title>Runky</title>
        <Script src={KAKAO_SDK_URL} strategy="beforeInteractive" />
      </head>
      <body>
        <main>{children}</main>
      </body>
    </html>
  );
}
