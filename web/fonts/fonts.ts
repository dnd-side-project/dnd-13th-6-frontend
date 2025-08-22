import localFont from 'next/font/local';

export const pretendard = localFont({
  src: '/pretendard/PretendardVariable.woff2',
  display: 'swap',
  weight: '100 900',
  variable: '--font-pretendard'
});

export const lufga = localFont({
  src: [
    {
      path: '/Lufga/LufgaThin.ttf',
      weight: '100',
      style: 'normal'
    },
    {
      path: '/Lufga/LufgaThinItalic.ttf',
      weight: '100',
      style: 'italic'
    },
    {
      path: '/Lufga/LufgaExtraLight.ttf',
      weight: '200',
      style: 'normal'
    },
    {
      path: '/Lufga/LufgaExtraLightItalic.ttf',
      weight: '200',
      style: 'italic'
    },
    {
      path: '/Lufga/LufgaLight.ttf',
      weight: '300',
      style: 'normal'
    },
    {
      path: '/Lufga/LufgaLightItalic.ttf',
      weight: '300',
      style: 'italic'
    },
    {
      path: '/Lufga/LufgaRegular.ttf',
      weight: '400',
      style: 'normal'
    },
    {
      path: '/Lufga/LufgaItalic.ttf',
      weight: '400',
      style: 'italic'
    },
    {
      path: '/Lufga/LufgaMedium.ttf',
      weight: '500',
      style: 'normal'
    },
    {
      path: '/Lufga/LufgaMediumItalic.ttf',
      weight: '500',
      style: 'italic'
    },
    {
      path: '/Lufga/LufgaSemiBold.ttf',
      weight: '600',
      style: 'normal'
    },
    {
      path: '/Lufga/LufgaSemiBoldItalic.ttf',
      weight: '600',
      style: 'italic'
    },
    {
      path: '/Lufga/LufgaBold.ttf',
      weight: '700',
      style: 'normal'
    },
    {
      path: '/Lufga/LufgaBoldItalic.ttf',
      weight: '700',
      style: 'italic'
    },
    {
      path: '/Lufga/LufgaExtraBold.ttf',
      weight: '800',
      style: 'normal'
    },
    {
      path: '/Lufga/LufgaExtraBoldItalic.ttf',
      weight: '800',
      style: 'italic'
    },
    {
      path: '/Lufga/LufgaBlack.ttf',
      weight: '900',
      style: 'normal'
    },
    {
      path: '/Lufga/LufgaBlackItalic.ttf',
      weight: '900',
      style: 'italic'
    }
  ],
  display: 'swap',
  variable: '--font-lufga'
});
