import {
  useAgentPage,
  useLandingPage,
  useParentPage,
} from "@/hooks/useSanityData";

import CTASection from "../publicPages/shared/CTASection";
import Footer from "./Footer";
import Navbar from "./Navbar";

function PublicPagesLayoutContainer({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data } = useLandingPage();
  const { data: parentsData } = useParentPage();
  const { data: agentsData } = useAgentPage();
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
