import { useState } from "react";

function HeroSection() {
  const [age, setAge] = useState("15");
  const [subject, setSubject] = useState("");
  const [location, setLocation] = useState("");
  return (
    <section className="relative py-20 flex items-center justify-center bg-gradient-to-br from-hero-start to-hero-end text-white">
      <div
        className="absolute inset-0 opacity-20 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1562774053-701939374585?w=1600&h=900&fit=crop')",
        }}
      />
      <div className="relative z-10 container mx-auto px-4 text-center">
        <h1 className="font-bold mb-6 animate-fade-in">Next Gems Camp</h1>
        <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto opacity-90">
          Nurturing independent thought through award-winning exceptional
          education. Choose from over 40 subjects for ages 9-24.
        </p>
      </div>
    </section>
  );
}

export default HeroSection;
