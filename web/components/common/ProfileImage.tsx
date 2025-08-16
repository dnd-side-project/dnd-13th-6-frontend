import Image from 'next/image'
import { profile } from 'node:console';
 
interface Props {
  profileImageUrl: string;
  isRunning?: boolean,
  width: number,
  height: number,
  alt: string,
  onClick:() => void
}

function ProfileImage({
  profileImageUrl,
  isRunning= false,
  width,
  height,
  alt,
  onClick
}: Props) {

  return (
    <button onClick={onClick} className={`rounded-full relative w-16 h-16 ${isRunning ? 'bg-gradient-to-r from-[#32FF76] to-[#6EE7FF] ' : ''}`}>
      <Image
        src={profileImageUrl}
        fill={true}
        className="p-1 w-full rounded-full"
        alt={alt}
      />
    </button>
  )
}

export default ProfileImage