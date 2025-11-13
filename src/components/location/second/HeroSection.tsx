import { MapPin } from "lucide-react";

function HeroSection() {
  return (
    <section className="relative pt-24 sm:pt-44 pb-16 sm:pb-40 bg-gradient-to-br from-hero-start to-hero-end text-white">
      <div
        className="absolute inset-0 opacity-30 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1562774053-701939374585?w=1600&h=600&fit=crop')",
        }}
      />
      <div className="relative z-10 container mx-auto px-4">
        <div className="flex items-center gap-2 mb-4 justify-center">
          <MapPin className="h-6 w-6" />
          <span className="text-lg">Oxford, England</span>
        </div>
        <h1 className="text-5xl md:text-6xl font-bold mb-6 text-center">
          Oxford Summer Programs
        </h1>
        <p className="text-xl max-w-3xl mx-auto text-center opacity-90">
          Study at the prestigious University of Oxford, one of the world's most
          renowned academic institutions
        </p>
      </div>
    </section>
  );
}

export default HeroSection;
