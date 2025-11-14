import Button from "@/components/general/Button";

function ContactCTA() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center flex flex-col gap-4 items-center">
          {/* Header */}
          <div className="">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Give Your Child a Summer 2026 to Remember
            </h2>
            <p className="text-lg">
              Limited places — secure your child's spot today!
            </p>
          </div>

          {/* Button */}
          <Button label="📝 Register Now" classNames="max-w-[180px]" />

          {/* Contact Info */}
          <div className="bg-white/10 rounded-xl p-6">
            <p className="mb-4">
              Our friendly Admissions Team is here to help with registration,
              visa support, and travel planning.
            </p>
            <div className="flex flex-col sm:flex-row justify-center items-center space-y-3 sm:space-y-0 sm:space-x-8">
              <div className="flex items-center space-x-2">
                <span>📞</span>
                <span className="font-semibold">+44 (0)1234 567890</span>
              </div>
              <div className="flex items-center space-x-2">
                <span>📧</span>
                <span className="font-semibold">hello@nextgemscamp.com</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ContactCTA;
