import PublicPagesLayout from "@/components/general/PublicPagesLayout";
import CTASection from "@/components/landing/CTASection";
import ImageDisplayer from "@/components/landing/subComps/ImageDisplayer";
import HeroSection from "@/components/location/first/HeroSection";
import Overview from "@/components/location/first/Overview";
import { canterburyImageData } from "@/lib/dummyData/locationData";

const LocationCambridge = () => {
  return (
    <PublicPagesLayout>
      {/* Hero Section */}
      <HeroSection />
      {/* Overview Section */}
      <Overview />
      <ImageDisplayer
        data={canterburyImageData}
        autoSlide={true}
        autoSlideInterval={3000}
        className="my-8"
      />
      ;
      <CTASection />
    </PublicPagesLayout>
  );
};

export default LocationCambridge;
