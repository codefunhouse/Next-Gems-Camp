import {
  getAgentPage,
  getLandingPage,
  getParentPage,
} from "@/lib/sanityFns/sanity.queries";
import CTASection from "../publicPages/shared/CTASection";
import Footer from "./Footer";
import Navbar from "./Navbar";

async function PublicPagesLayoutContainer({
  children,
}: {
  children: React.ReactNode;
}) {
  const data = await getLandingPage();
  const parentsData = await getParentPage();
  const agentsData = await getAgentPage();
  return (
    <>
      <div className="pt-[3.1rem] sm:pt-13 max-w-360 mx-auto">
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

export default PublicPagesLayoutContainer;
