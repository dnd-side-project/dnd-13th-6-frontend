import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <Link href="/login" className="text-blue-500 hover:underline">
        로그인 페이지로 이동
      </Link>
      <Link href="/test" className="text-blue-500 hover:underline">
        RN통신 테스트 페이지
      </Link>
    </div>
  );
}
