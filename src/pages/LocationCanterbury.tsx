import Button from "@/components/general/Button";
import PublicPagesLayout from "@/components/general/PublicPagesLayout";
import HeroSection from "@/components/landing/HeroSection";
import ContentCard from "@/components/landing/subComps/ContentCard";
import ImageDisplayer from "@/components/landing/subComps/ImageDisplayer";
import OverviewComp from "@/components/landing/subComps/OverviewComp";
import SplitSection from "@/components/landing/subComps/SplitSection";
import ShortArrowRight from "@/components/svgs/ShortArrowRight";
import { canterburyData } from "@/lib/dummyData/locationData";

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
            classNames="!max-w-[194px]"
            buttonType="sec"
          />
        }
      />

      {/* Discover loation */}
      <SplitSection
        leftContent={
          <ContentCard
            title={canterburyData.discoverCanterbury.title}
            content={canterburyData.discoverCanterbury.description}
          />
        }
        rightContent={
          <ImageDisplayer
            data={canterburyData.discoverCanterbury.images}
            autoSlide={true}
            autoSlideInterval={3000}
            className="my-8"
          />
        }
        background="white"
      />

      {/* Our Accomodation */}
      <OverviewComp
        title={canterburyData.accommodation.title}
        content={canterburyData.accommodation.description}
        bgImage={canterburyData.accommodation.bgImageAlt}
        bgImageAlt={canterburyData.accommodation.bgImageAlt}
      />
    </PublicPagesLayout>
  );
};

export default LocationCambridge;
