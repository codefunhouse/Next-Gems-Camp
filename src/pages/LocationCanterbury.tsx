import Button from "@/components/general/Button";
import PublicPagesLayout from "@/components/general/PublicPagesLayout";
import HeroSection from "@/components/landing/HeroSection";
import ImageDisplayer from "@/components/landing/subComps/ImageDisplayer";
import OverviewComp from "@/components/landing/subComps/OverviewComp";
import ShortArrowRight from "@/components/svgs/ShortArrowRight";
import {
  canterburyData,
  canterburyImageData,
} from "@/lib/dummyData/locationData";

const LocationCambridge = () => {
  return (
    <PublicPagesLayout>
      <HeroSection
        title={canterburyData.heroSection.title}
        subtitle={canterburyData.heroSection.subtitle}
        bgImage={canterburyData.heroSection.bgImageUrl}
        locationDesc={canterburyData.heroSection.location}
        locationDetails={canterburyData.heroSection.locationDetails}
        buttons={
          <Button
            label={canterburyData.heroSection.buttonText}
            endIcon={<ShortArrowRight />}
            classNames="!w-full !max-w-[194px]"
            buttonType="sec"
          />
        }
      />

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
    </PublicPagesLayout>
  );
};

export default LocationCambridge;
