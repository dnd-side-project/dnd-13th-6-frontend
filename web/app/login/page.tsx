import Image from 'next/image';
import Link from 'next/link';
import Logo from '@/public/assets/LOGO.svg';
export default function Login() {
  return (
    <div className="relative min-h-screen w-full">
      {/* 로고 영역 */}
      <div className="absolute top-[25%] left-1/2 -translate-x-1/2">
        <div className="flex w-[48vw] max-w-[157px] items-center justify-center text-center">
          <Logo title="logo" className="h-auto w-full" />
        </div>
      </div>

      {/* 로그인 버튼 - 화면 정중앙 */}
      <Link
        href={
          process.env.NEXT_PUBLIC_LOGIN_URL ||
          `https://kauth.kakao.com/oauth/authorize?client_id=3255efd2af839833b26a422ca203c180&redirect_uri=https://api.runky.store/api/auth/login/oauth2/code/kakao&response_type=code`
        }
        className="absolute top-1/2 left-1/2 h-[13vw] max-h-[100px] w-[calc(100vw-5vw)] max-w-[400px] -translate-x-1/2 -translate-y-1/2"
      >
        <Image
          src="/assets/kakao_login_large_wide.png"
          alt="카카오 로그인"
          fill
          priority
          className="object-contain"
        />
      </Link>
      <Link
        href={
          process.env.NEXT_PUBLIC_LOGIN_URL ||
          `https://appleid.apple.com/auth/authorize?client_id=api.runky.store&redirect_uri=https://api.runky.store/api/auth/login/oauth2/code/apple&response_type=code&response_mode=form_post&scope=name%20email`
        }
        className="absolute top-[60%] px-2 flex items-center rounded-lg left-1/2 h-[13vw] max-h-[100px] w-[calc(100vw-12vw)] max-w-[400px] -translate-x-1/2 -translate-y-1/2 bg-white text-black"
      >
        
        <Image
          src="/assets/apple-logo.png"
          alt="카카오 로그인"
          width="36"
          height="36"
          priority
          className="object-contain"
        />
        <div className='text-center flex-grow mr-5'> 애플 로그인</div>
      </Link>
    </div>
  );
}
