import {
  useAgentPage,
  useLandingPage,
  useParentPage,
} from "@/hooks/useSanityData";
import CTASection from "../landing/CTASection";
import Footer from "./Footer";
import Navbar from "./Navbar";

function PublicPagesLayout({ children }: { children: React.ReactNode }) {
  const { data } = useLandingPage();
  const { data: parentsData } = useParentPage();
  const { data: agentsData } = useAgentPage();
  return (
    <>
      <div className="pt-[3.1rem] sm:pt-[3.25rem] max-w-[90rem] mx-auto">
        <Navbar />
        <main className="min-h-screen flex flex-col">{children}</main>

        <CTASection
          landingPageCTA={data?.ctaSection}
          parentsCTA={parentsData?.cta}
          agentsCTA={agentsData?.cta}
        />
        <Footer />
      </div>
    </>
  );
}

export default PublicPagesLayout;
