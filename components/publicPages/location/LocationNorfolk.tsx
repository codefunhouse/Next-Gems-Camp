import Button from "@/components/general/Button";
import ShortArrowRight from "@/components/svgs/ShortArrowRight";
import { useModal } from "@/hooks/useModal";
import { useNorfolkPage } from "@/hooks/useSanityData";
import { norfolkData } from "@/lib/dummyData/locationData";
import {
  getSanityImagesArray,
  getSanityImageUrl,
} from "@/lib/sanity/getSanityImageUrl";
import ApplyForm from "../shared/ApplyForm";
import ContentCard from "../shared/ContentCard";
import HeroSection from "../shared/HeroSection";
import ImageDisplayer from "../shared/ImageDisplayer";
import OverviewComp from "../shared/OverviewComp";
import SplitSection from "../shared/SplitSection";
import OurExcursion from "./subComps/OurExcursion";

const Canterbury = () => {
  const { openModal, closeModal } = useModal();
  const { data } = useNorfolkPage();

  return (
    <>
      <HeroSection
        title={data?.heroSection?.title || norfolkData.heroSection.title}
        subtitle={
          data?.heroSection?.subtitle || norfolkData.heroSection.subtitle
        }
        bgImage={
          getSanityImageUrl(data?.heroSection?.bgImageUrl) ||
          norfolkData.heroSection.bgImageUrl
        }
        locationDesc={
          data?.heroSection?.location || norfolkData.heroSection.location
        }
        locationDetails={
          data?.heroSection?.locationDetails ||
          norfolkData.heroSection.locationDetails
        }
        buttons={
          <Button
            label={
              data?.heroSection?.buttonText ||
              norfolkData.heroSection.buttonText
            }
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
            title={
              data?.discoverSandringham?.title ||
              norfolkData.discoverSandringham.title
            }
            content={
              data?.discoverSandringham?.description ||
              norfolkData.discoverSandringham.description
            }
          />
        }
        rightContent={
          <ImageDisplayer
            data={
              getSanityImagesArray(
                data?.discoverSandringham?.images?.map((item) => ({
                  src: item?.image,
                }))
              ) || norfolkData.discoverSandringham.images
            }
            autoSlide={true}
            autoSlideInterval={3000}
            className="my-8"
          />
        }
        background="white"
      />
      {/* Our Accomodation */}
      <OverviewComp
        title={data?.accommodation?.title || norfolkData.accommodation.title}
        content={
          data?.accommodation?.description ||
          norfolkData.accommodation.description
        }
        bgImage={
          getSanityImageUrl(data?.accommodation?.bgImageUrl) ||
          norfolkData.accommodation.bgImageUrl
        }
        bgImageAlt={
          data?.accommodation?.bgImageAlt ||
          norfolkData.accommodation.bgImageAlt
        }
      />

      <OurExcursion
        mainTitle={
          data?.excursionCities?.title || norfolkData.excursionCities.title
        }
        tabs={data?.excursionCities?.tabs || norfolkData.excursionCities.tabs}
        cities={
          data?.excursionCities?.citiesData ||
          norfolkData.excursionCities.citiesData
        }
      />
    </>
  );
};

export default Canterbury;
