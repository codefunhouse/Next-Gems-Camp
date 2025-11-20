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
import { norfolkData } from "@/lib/dummyData/locationData";
import ApplyForm from "./ApplyForm";

const Canterbury = () => {
  const { openModal, closeModal } = useModal();

  return (
    <PublicPagesLayout>
      <HeroSection
        title={norfolkData.heroSection.title}
        subtitle={norfolkData.heroSection.subtitle}
        bgImage={norfolkData.heroSection.bgImageUrl}
        locationDesc={norfolkData.heroSection.location}
        locationDetails={norfolkData.heroSection.locationDetails}
        buttons={
          <Button
            label={norfolkData.heroSection.buttonText}
            endIcon={<ShortArrowRight />}
            classNames="!w-full !max-w-[194px]"
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
            title={norfolkData.discoverSandringham.title}
            content={norfolkData.discoverSandringham.description}
          />
        }
        rightContent={
          <ImageDisplayer
            data={norfolkData.discoverSandringham.images}
            autoSlide={true}
            autoSlideInterval={3000}
            className="my-8"
          />
        }
        background="white"
      />
      {/* Our Accomodation */}
      <OverviewComp
        title={norfolkData.accommodation.title}
        content={norfolkData.accommodation.description}
        bgImage={norfolkData.accommodation.bgImageUrl}
        bgImageAlt={norfolkData.accommodation.bgImageAlt}
      />

      <OurExcursion
        mainTitle={norfolkData.excursionCities.title}
        cities={norfolkData.excursionCities.citiesData}
      />
    </PublicPagesLayout>
  );
};

export default Canterbury;
