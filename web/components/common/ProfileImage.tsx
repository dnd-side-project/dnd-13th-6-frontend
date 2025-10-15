import Image from 'next/image';

interface Props {
  profileImageUrl: string;
  isRunning?: boolean;
  alt: string;
  onClick: () => void;
}

function ProfileImage({
  profileImageUrl,
  isRunning = false,
  alt,
  onClick
}: Props) {
  return (
    <button
      onClick={onClick}
      className="relative h-15 w-15 shrink-0 rounded-full"
    >
      {isRunning ? (
        // Gradient border container
        <div
          className={`h-full w-full rounded-full ${isRunning ? 'bg-gradient-to-r from-[#32FF76] to-[#6EE7FF]' : 'bg-[#cacaca]'} p-0.5`}
        >
          <div className="flex h-full w-full items-center justify-center overflow-hidden rounded-full bg-[#cacaca]">
            <Image src={profileImageUrl} width={48} height={48} alt={alt} />
          </div>
        </div>
      ) : (
        // No gradient - normal image
        <Image
          src={profileImageUrl}
          fill={true}
          className="h-full w-full rounded-full object-cover"
          alt={alt}
        />
      )}
    </button>
  );
}

export default ProfileImage;
