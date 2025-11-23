import Agents from "@/components/publicPages/info/Agents";
import { getAgentPage, getLandingPage } from "@/lib/sanityFns/sanity.queries";

async function AgentsPage() {
  const data = await getAgentPage();
  const landingPageData = await getLandingPage();
  return (
    <>
      <Agents data={data} landingPageData={landingPageData} />
    </>
  );
}

export default AgentsPage;
