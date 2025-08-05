import './globals.css';
import Script from 'next/script';

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  const KAKAO_SDK_URL = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_MAPS_APP_KEY}&autoload=false`;

  return (
    <html lang="en">
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
