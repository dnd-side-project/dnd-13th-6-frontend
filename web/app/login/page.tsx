import Image from 'next/image';

export default function Login() {
  return (
    <div className="w-full min-h-screen m-0 p-0 flex items-center justify-center bg-white">
      <div className="flex flex-col items-center gap-4">
        <div className="h-[110px] w-[110px] bg-[#f7f7f7] flex items-center justify-center px-[30px] text-center">
          LOGO
        </div>
        <div className="h-[100px] w-[calc(100vw-20px)] relative">
          <Image
            src="/assets/kakao_login_large_wide.png"
            alt="카카오 로그인"
            fill
            priority
            className="object-contain"
          />
        </div>
      </div>
    </div>
  );
}
