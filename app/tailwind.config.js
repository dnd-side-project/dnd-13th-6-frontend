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
        gray10: '#F2F2F7',
        gray20: '#E5E5EA',
        gray40: '#C7C7CC',
        gray50: '#AEAEB2',
        gray60: '#8E8E93',
        gray80: '#48484A',
        gray70: '#636366',
        gray90: '#3A3A3C',
        red:'#ff0000',
        orange: '#FF9500',
        yellow: '#FFCC00',
        green: '#34C759',
        mint: '#00C7BE',
        teal: '#5AC8FA',
        cyan: '#5AC8FA',
        blue: '#007AFF',
        purple: '#AF52DE',
        pink: '#FF2D92',
        brown: '#A2845E'
      },
      fontFamily: {
        pretendard: ['Pretendard-Regular', 'sans-serif'],
        pretendardBold: ['Pretendard-Bold', 'sans-serif'],
        pretendardExtraBold: ['Pretendard-ExtraBold', 'sans-serif'],
        pretendardBlack: ['Pretendard-Black', 'sans-serif'],
      },
      fontSize: {
        title3: ['22px', {fontWeight:'bold'}],
        headline: ['19px', { lineHeight: '150%', fontWeight: 'medium', letterSpacing: '-0.014em' }],
        headline1: ['17px', { lineHeight: '150%', fontWeight: 'bold', letterSpacing: '-0.014em' }],
        headline2: ['15px', { lineHeight: '150%', fontWeight: 'semibold', letterSpacing: '-0.014em' }],
        body1: ['17px', { lineHeight: '150%', fontWeight: 'regular', letterSpacing: '-0.025em' }],
        body2: ['15px', { lineHeight: '150%', fontWeight: 'regular', letterSpacing: '-0.025em' }],
        body3: ['13px', { lineHeight: '18px', fontWeight: '500' }],
        body4: ['11px', { lineHeight: '16px', fontWeight: '500' }]
      }
    },
  },
  plugins: [],
};