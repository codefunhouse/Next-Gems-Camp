function HeroSection() {
  return (
    <section className="relative pt-24 pb-16 bg-gradient-to-br from-hero-start to-hero-end text-white">
      <div
        className="absolute inset-0 opacity-20 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1600&h=600&fit=crop')",
        }}
      />
      <div className="relative z-10 container mx-auto px-4 text-center">
        <h1 className="text-5xl md:text-6xl font-bold mb-6">
          Why Choose Elite Summer Academy
        </h1>
        <p className="text-xl max-w-3xl mx-auto opacity-90">
          Discover what makes our summer programs the premier choice for
          ambitious students worldwide
        </p>
      </div>
    </section>
  );
}

export default HeroSection;
