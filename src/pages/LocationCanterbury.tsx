import PublicPagesLayout from "@/components/general/PublicPagesLayout";
import CTASection from "@/components/landing/CTASection";
import ImageDisplayer from "@/components/landing/subComps/ImageDisplayer";
import OverviewComp from "@/components/landing/subComps/OverviewComp";
import HeroSection from "@/components/location/first/HeroSection";
import { canterburyImageData } from "@/lib/dummyData/locationData";

const LocationCambridge = () => {
  return (
    <PublicPagesLayout>
      {/* Hero Section */}
      <HeroSection />
      {/* Overview Section */}
      <OverviewComp
        title="Discover Canterbury: A Historic Gem in the Heart of England"
        content={
          "Canterbury, a historic city in Kent, England, is renowned for its stunning medieval architecture, including the iconic Canterbury Cathedral. The city offers a rich cultural experience with its charming streets, historic landmarks, and vibrant arts scene.\n\nStudents can explore the city's heritage, enjoy riverside walks, and participate in various cultural and educational activities. Canterbury provides a unique blend of history and modernity, making it an ideal location for immersive learning and exploration."
        }
      />
      <ImageDisplayer
        data={canterburyImageData}
        autoSlide={true}
        autoSlideInterval={3000}
        className="my-8"
      />

      <CTASection />
    </PublicPagesLayout>
  );
};

export default LocationCambridge;
