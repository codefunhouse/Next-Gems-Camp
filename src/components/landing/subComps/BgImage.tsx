import { twMerge } from "tailwind-merge";

interface BgImageProps {
  className?: string;
  overlayStyles?: string;
  src: string;
  alt: string;
}

function BgImage({ className, src, alt, overlayStyles }: BgImageProps) {
  return (
    <>
      <div className={twMerge("absolute inset-0 bg-black/70", className)}>
        <img
          width={3840}
          height={2364}
          src={src}
          alt={alt}
          className="w-full h-full object-cover aspect-[2.5] text-white"
        />
      </div>
      <div
        className={twMerge("absolute inset-0 bg-black/70", overlayStyles)}
      ></div>
    </>
  );
}

export default BgImage;
