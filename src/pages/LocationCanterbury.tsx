import Button from "@/components/general/Button";
import PublicPagesLayout from "@/components/general/PublicPagesLayout";
import HeroSection from "@/components/landing/HeroSection";
import ContentCard from "@/components/landing/subComps/ContentCard";
import ImageDisplayer from "@/components/landing/subComps/ImageDisplayer";
import OverviewComp from "@/components/landing/subComps/OverviewComp";
import SplitSection from "@/components/landing/subComps/SplitSection";
import OurExcursion from "@/components/location/OurExcursion";
import ShortArrowRight from "@/components/svgs/ShortArrowRight";
import { useModal } from "@/hooks/useModal";
import { canterburyData } from "@/lib/dummyData/locationData";
import ApplyForm from "./ApplyForm";

const LocationCaterbury = () => {
  const { openModal, closeModal } = useModal();
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
            onClick={() =>
              openModal(<ApplyForm onClick={() => closeModal()} />)
            }
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
        bgImage={canterburyData.accommodation.bgImageUrl}
        bgImageAlt={canterburyData.accommodation.bgImageAlt}
      />
      {/* Our Excursion Cities */}
      <OurExcursion
        mainTitle={canterburyData.excursionCities.title}
        images={canterburyData.excursionCities.cities}
        location={canterburyData.excursionCities.location}
      />
    </PublicPagesLayout>
  );
};

export default LocationCaterbury;
