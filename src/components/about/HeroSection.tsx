function HeroSection() {
  return (
    <section className="relative pt-24 sm:pt-44 pb-16 sm:pb-40 bg-gradient-to-br from-hero-start to-hero-end text-white">
      <div
        className="absolute inset-0 opacity-20 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://plus.unsplash.com/premium_photo-1683887034552-4635692bb57c?q=80&w=1469&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
        }}
      />
      <div className="relative z-10 container mx-auto px-4 text-center">
        <h1 className="font-bold mb-6">Why Choose Elite Summer Academy</h1>
        <p className="text-xl max-w-3xl mx-auto opacity-90">
          Discover what makes our summer programs the premier choice for
          ambitious students worldwide
        </p>
      </div>
    </section>
  );
}

export default HeroSection;
