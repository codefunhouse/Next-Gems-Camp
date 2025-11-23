import Parents from "@/components/publicPages/info/Parents";
import { getLandingPage, getParentPage } from "@/lib/sanityFns/sanity.queries";

async function ParentsPage() {
  const data = await getParentPage();
  const landingPageData = await getLandingPage();
  return (
    <>
      <Parents data={data} landingPageData={landingPageData} />
    </>
  );
}

export default ParentsPage;
