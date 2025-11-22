import Home from "@/components/publicPages/landing/Home";
import { useLandingPage } from "@/hooks/useSanityData";
import { LandingPage } from "@/types/sanityTypes";

function LandingPageMain() {
  const { data } = useLandingPage();
  return (
    <>
      <Home data={data as LandingPage} />
    </>
  );
}

export default LandingPageMain;
