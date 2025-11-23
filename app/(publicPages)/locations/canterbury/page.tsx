import Canterbury from "@/components/publicPages/location/Canterbury";
import { getCanterburyPage } from "@/lib/sanityFns/sanityQueries";

async function CanterburyPage() {
  const data = await getCanterburyPage();
  return (
    <>
      <Canterbury data={data} />
    </>
  );
}

export default CanterburyPage;
