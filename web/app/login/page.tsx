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
      <div className="flex flex-col items-center justify-between  absolute top-1/2 left-1/2  -translate-x-1/2 -translate-y-1/2 gap-10">
      <Link
        href={
          process.env.NEXT_PUBLIC_LOGIN_URL ||
          `https://kauth.kakao.com/oauth/authorize?client_id=3255efd2af839833b26a422ca203c180&redirect_uri=https://api.runky.store/api/auth/login/oauth2/code/kakao&response_type=code`
        }
        className="flex items-center  h-[13vw] max-h-[60px] rounded-lg px-3 w-[calc(100vw-5vw)] max-w-[400px]  !bg-[#FEE500] text-black font-semibold text-lg"
      >
        <Image
          src="/assets/kakao-icon.svg"
          alt="카카오 로그인"
          width={24}
          height={24}
        />
         <div className='text-center flex-grow mr-5'> 카카오 로그인</div>
      </Link>
      <Link
        href={
          process.env.NEXT_PUBLIC_LOGIN_URL ||
          `https://appleid.apple.com/auth/authorize?client_id=api.runky.store&redirect_uri=https://api.runky.store/api/auth/login/oauth2/code/apple&response_type=code&response_mode=form_post&scope=name%20email`
        }
        className="flex items-center  h-[13vw] max-h-[60px] rounded-lg px-2 w-[calc(100vw-5vw)] max-w-[400px]  bg-white text-black font-semibold text-lg"
      >
        
        <Image
          src="/assets/apple-logo.png"
          alt="애플 로그인"
          width="36"
          height="36"
          className="object-contain"
        />
        <div className='text-center flex-grow mr-5'> 애플 로그인</div>
      </Link>

      </div>
    </div>
  );
}
