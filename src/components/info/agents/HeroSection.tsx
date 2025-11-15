function HeroSection() {
  return (
    <section className="relative pt-24 sm:pt-44 pb-16 sm:pb-40 bg-gradient-to-br from-hero-start to-hero-end text-white">
      <div
        className="absolute inset-0 opacity-20 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1491841573634-28140fc7ced7?w=1600&h=600&fit=crop')",
        }}
      />
      <div className="relative z-10 container mx-auto px-4 text-center">
        <h1 className="font-bold mb-6">Information for Parents</h1>
        <p className="text-xl max-w-3xl mx-auto opacity-90">
          Everything you need to know about keeping your child safe, happy, and
          academically challenged
        </p>
      </div>
    </section>
  );
}

export default HeroSection;
