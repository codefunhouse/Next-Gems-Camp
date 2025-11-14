import { twMerge } from "tailwind-merge";

function HeroSection({
  title,
  subtitle,
  className,
  bgImage,
}: {
  title: string;
  subtitle: string;
  className?: string;
  bgImage: string;
}) {
  return (
    <section
      className={twMerge(
        "relative py-40 flex items-center justify-center bg-gradient-to-br from-hero-start to-hero-end text-white",
        className
      )}
    >
      <div
        className="absolute inset-0 opacity-20 bg-cover bg-center"
        style={{
          backgroundImage: `url('${bgImage}')`,
        }}
      />
      <div className="relative z-10 container mx-auto px-4 text-center max-w-5xl">
        <h1 className="font-bold mb-6 animate-fade-in">{title}</h1>
        <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto opacity-90">
          {subtitle}
        </p>
      </div>
    </section>
  );
}

export default HeroSection;
