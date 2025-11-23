import Norkfolk from "@/components/publicPages/location/Norfolk";
import { getNorfolkPage } from "@/lib/sanityFns/sanityQueries";

async function NorfolkPage() {
  const data = await getNorfolkPage();
  return (
    <>
      <Norkfolk data={data} />
    </>
  );
}

export default NorfolkPage;
