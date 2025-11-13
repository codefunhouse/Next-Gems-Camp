import { MapPin } from "lucide-react";

function HeroSection() {
  return (
    <section className="relative pt-24 sm:pt-44 pb-16 sm:pb-40 bg-gradient-to-br from-hero-start to-hero-end text-white">
      <div
        className="absolute inset-0 opacity-30 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1520986606214-8b456906c813?w=1600&h=600&fit=crop')",
        }}
      />
      <div className="relative z-10 container mx-auto px-4">
        <div className="flex items-center gap-2 mb-4 justify-center">
          <MapPin className="h-6 w-6" />
          <span className="text-lg">Cambridge, England</span>
        </div>
        <h1 className="text-5xl md:text-6xl font-bold mb-6 text-center">
          Cambridge Summer Programs
        </h1>
        <p className="text-xl max-w-3xl mx-auto text-center opacity-90">
          Experience academic excellence at the University of Cambridge, a
          beacon of learning since 1209
        </p>
      </div>
    </section>
  );
}

export default HeroSection;
