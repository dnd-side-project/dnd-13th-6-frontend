/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.tsx","./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        main: '#31FF76',
        black: '#1C1C1E',
        white: '#fff',
        gray: '#313131',
        gray20: '#E5E5EA',
        gray40: '#C7C7CC',
        gray60: '#8E8E93',
        gray90: '#3A3A3C',
      },
      fontFamily: {
        pretendard: ['Pretendard-Regular', 'sans-serif'],
        pretendardBold: ['Pretendard-Bold', 'sans-serif'],
        pretendardExtraBold: ['Pretendard-ExtraBold', 'sans-serif'],
        pretendardBlack: ['Pretendard-Black', 'sans-serif'],
      },
      fontSize: {
        title3: ['22px', {fontWeight:'bold'}],
        headline1: ['17px', { lineHeight: '24px', fontWeight: 'bold' }],
        body1: ['17px', { lineHeight: '24px', fontWeight: '500' }],
        body2: ['15px', { lineHeight: '22px', fontWeight: '500' }],
        body3: ['13px', { lineHeight: '18px', fontWeight: '500' }],
        body4: ['11px', { lineHeight: '16px', fontWeight: '500' }]
      }
    },
  },
  plugins: [],
};