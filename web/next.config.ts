import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  //임시
  eslint: {
    ignoreDuringBuilds: true // 빌드 시 ESLint 경고/에러 무시
  },
  images: {
    domains: ['picsum.photos']
  }
  /* config options here */
};

export default nextConfig;
