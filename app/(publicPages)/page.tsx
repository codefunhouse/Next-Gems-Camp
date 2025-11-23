import Home from "@/components/publicPages/landing/Home";
import { getLandingPage } from "@/lib/sanityFns/sanityQueries";

async function LandingPageMain() {
  const data = await getLandingPage();
  return (
    <>
      <Home data={data} />
    </>
  );
}

export default LandingPageMain;
