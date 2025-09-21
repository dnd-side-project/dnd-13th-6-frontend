import Image from 'next/image';
import Link from 'next/link';
const isDev = process.env.NEXT_PUBLIC_ENV === 'dev';
export default function Login() {
  return (
    <div className="relative min-h-screen w-full">
      {/* 로고 영역 */}
      <div className="absolute top-[25%] left-1/2 -translate-x-1/2">
        <div className="flex h-[15vw] max-h-[157px] w-[48vw] max-w-[157px] items-center justify-center text-center">
          <Image
            src="/assets/LOGO.svg"
            alt="로고"
            width={157}
            height={51}
            priority
            className="object-contain"
          />
        </div>
      </div>

      {/* 로그인 버튼 - 화면 정중앙 */}
      <Link
        href={
          process.env.NEXT_PUBLIC_LOGIN_URL ||
          'https://kauth.kakao.com/oauth/authorize?client_id=3255efd2af839833b26a422ca203c180&redirect_uri=https://api.runky.store/dev/api/auth/login/oauth2/code/kakao/local&response_type=code'
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
    </div>
  );
}
