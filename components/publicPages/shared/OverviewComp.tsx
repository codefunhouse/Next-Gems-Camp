import BgImage from "./BgImage";

interface OverviewCompProps {
  title: string;
  content: string;
  className?: string;
  cardClassName?: string;
  bgImage: string;
  bgImageAlt?: string;
}

function OverviewComp({
  title,
  content,
  className = "",
  bgImage,
  bgImageAlt,
}: OverviewCompProps) {
  return (
    <section className={`py-[3.7rem] relative ${className}`}>
      <BgImage
        src={bgImage}
        alt={bgImageAlt || "title"}
        overlayStyles="bg-[#000000CC]"
      />
      <div className="relative z-10 mx-auto px-4 w-full max-w-[721px] flex flex-col gap-1.5 items-center text-white">
        <h1 className="text-center">{title}</h1>
        <p className="text-base sm:text-lg whitespace-pre-line wrap-break-word">
          {content}
        </p>
      </div>
    </section>
  );
}

export default OverviewComp;
