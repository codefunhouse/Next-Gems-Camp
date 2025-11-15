import Button from "@/components/general/Button";
import { Link } from "react-router-dom";

function ContactCTA({ className = "" }: { className?: string }) {
  return (
    <section className={`py-16 bg-white ${className}`}>
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center flex flex-col gap-4 items-center">
          {/* Header */}
          <div className="">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              🤝 Become a Registered Agent
            </h2>
            <p className="text-lg">
              Join our global network of trusted partners. To register as an
              agent or request partnership details, please contact our
              international relations
            </p>
          </div>

          {/* Button */}

          {/* Contact Info */}
          <div className="bg-white/10 rounded-xl p-6">
            <div className="flex flex-col sm:flex-row justify-center items-center space-y-3 sm:space-y-0 sm:space-x-8">
              <div className="flex items-center space-x-2">
                <span>📞</span>
                <span className="font-semibold">+44 (0)1234 567890</span>
              </div>
              <div className="flex items-center space-x-2">
                <span>📧</span>
                <Link
                  to="mailto:hello@nextgemscamp.com"
                  className="font-semibold"
                >
                  hello@nextgemscamp.com
                </Link>
              </div>
            </div>
          </div>
          <Button
            label="Become a Partner"
            classNames="max-w-[180px]"
            link="/apply"
          />
        </div>
      </div>
    </section>
  );
}

export default ContactCTA;
