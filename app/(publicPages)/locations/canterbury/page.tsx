import Canterbury from "@/components/publicPages/location/Canterbury";
import { getCanterburyPage } from "@/utils/sanityFns/sanity.queries";

async function CanterburyPage() {
  const data = await getCanterburyPage();
  return (
    <>
      <Canterbury data={data} />
    </>
  );
}

export default CanterburyPage;
