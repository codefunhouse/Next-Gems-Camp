import CTASection from "../landing/CTASection";
import Footer from "./Footer";
import Navbar from "./Navbar";

function PublicPagesLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="pt-[3.1rem] sm:pt-[3.25rem] max-w-[90rem] mx-auto">
        <Navbar />
        <main className="min-h-screen flex flex-col">{children}</main>

        <CTASection />
        <Footer />
      </div>
    </>
  );
}

export default PublicPagesLayout;
