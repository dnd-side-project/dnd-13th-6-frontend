import "./globals.css";
import localFont from 'next/font/local'

const pretendard = localFont({
  src: '../fonts/pretendard/PretendardVariable.woff2',
  display: 'swap',
  weight: '100 900',
  variable: '--font-pretendard',
})
export default function RootLayout({
                                     children,
                                   }: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
    <body
      className={`${pretendard.variable} antialiased`}
    >
    {children}
    </body>
    </html>
  );
}
