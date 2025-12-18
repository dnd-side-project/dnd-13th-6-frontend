import Image from 'next/image';

export default function Loading() {
  return (
    <div className="relative min-h-screen w-full bg-background flex items-center justify-center">
      <div className="animate-pulse">
        <Image
          src="/assets/LOGO.svg"
          alt="Loading..."
          width={157}
          height={50}
          className="h-auto w-full opacity-50"
        />
      </div>
    </div>
  );
}
