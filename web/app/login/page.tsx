import Image from 'next/image';
import Link from 'next/link';

export default function Login() {
  return (
    <div className="w-full min-h-screen flex flex-col items-center">
      {/* 로고 - 버튼 위쪽 */}
      <div className="absolute mt-[266px] flex flex-col items-center">
        <Image alt="LOGO" src="/assets/LOGO.png" width={157} height={51} />
      </div>

      {/* 로그인 버튼 - 화면 정중앙 */}
      <div className="flex items-center justify-center w-full h-full mt-[465px]">
        <div className="h-[100px] w-[calc(100vw-30px)] relative">
          <Link href={'/login/terms'}>
            <Image
              src="/assets/kakao_login_large_wide.png"
              alt="카카오 로그인"
              fill
              priority
              className="object-contain"
            />
          </Link>
        </div>
      </div>
    </div>
  );
}
