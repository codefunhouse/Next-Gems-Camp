import Norkfolk from "@/components/publicPages/location/Norfolk";
import { getNorfolkPage } from "@/utils/sanityFns/sanity.queries";

async function NorfolkPage() {
  const data = await getNorfolkPage();
  return (
    <>
      <Norkfolk data={data} />
    </>
  );
}

export default NorfolkPage;
