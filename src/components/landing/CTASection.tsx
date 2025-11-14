import Button from "../general/Button";

function CTASection() {
  return (
    <section className="py-20 bg-blue-primary text-primary-foreground">
      <div className="container mx-auto px-4 text-center flex flex-col items-center">
        <h2 className="text-4xl font-bold mb-6">
          Ready to Start Your Journey?
        </h2>
        <p className="text-xl mb-8 opacity-90">
          Join thousands of students from around the world
        </p>
        <Button
          label="Apply Now for 2026"
          classNames="max-w-[200px] w-full"
          link="/apply"
        />
      </div>
    </section>
  );
}

export default CTASection;
