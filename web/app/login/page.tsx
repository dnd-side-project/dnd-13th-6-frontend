import Image from 'next/image';
import Link from 'next/link';
import Logo from '@/public/assets/LOGO.svg';
import AppleLogo from '@/public/assets/apple/AppleMedium.svg'
export default function Login() {
  const APPLE_LOGIN_URL =
    process.env.NEXT_PUBLIC_APPLE_LOGIN_URL || '/api/auth/apple';

  return (
    <div className="relative min-h-screen w-full">

      <div className="absolute top-[25%] left-1/2 -translate-x-1/2">
        <div className="flex w-[48vw] max-w-[157px] items-center justify-center text-center">
          <Logo title="logo" className="h-auto w-full" />
        </div>
      </div>

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[calc(100vw-5vw)] max-w-[400px] flex flex-col gap-4">
        {/* Apple 로그인 버튼 */}
        <Link
          href={APPLE_LOGIN_URL}
          className="flex h-[56px] w-full items-center justify-center rounded-lg bg-white px-4 text-black"
        >
          <AppleLogo title="appleLogo"/>
          <span className="font-semibold text-[19px]">Sign in with Apple</span>
        </Link>

        {/* Kakao 로그인 버튼 */}
        <Link
          href={
            process.env.NEXT_PUBLIC_LOGIN_URL ||
            'https://kauth.kakao.com/oauth/authorize?client_id=3255efd2af839833b26a422ca203c180&redirect_uri=https://api.runky.store/api/auth/dev/login/oauth2/code/kakao&response_type=code'
          }
          className="relative h-[56px] w-full"
        >
          <Image
            src="/assets/kakao_login_large_wide.png"
            alt="카카오 로그인"
            fill={true}
            priority
            className="object-cover rounded-lg"
          />
        </Link>
      </div>
    </div>
  );
}

