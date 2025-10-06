import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['picsum.photos', 'runky-bucket.s3.ap-northeast-2.amazonaws.com']
  }
  /* config options here */
};

export default nextConfig;