import Image from "next/image";
import { twMerge } from "tailwind-merge";

interface ImageContentCardProps {
  imageUrl: string;
  alt: string;
  className?: string;
}

function ImageContentCard({ imageUrl, alt, className }: ImageContentCardProps) {
  return (
    <div className={twMerge("w-full max-w-[529px] rounded-4xl", className)}>
      <Image
        src={imageUrl}
        alt={alt}
        width={539}
        height={423}
        className="object-cover rounded-4xl aspect-529/423 w-full h-full"
      />
    </div>
  );
}

export default ImageContentCard;
