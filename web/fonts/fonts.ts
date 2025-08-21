import localFont from 'next/font/local';

export const pretendard = localFont({
  src: '../fonts/pretendard/PretendardVariable.woff2',
  display: 'swap',
  weight: '100 900',
  variable: '--font-pretendard'
});

export const lufga = localFont({
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
