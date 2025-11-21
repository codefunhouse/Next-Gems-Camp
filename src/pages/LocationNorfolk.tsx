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
import { useNorfolkPage } from "@/hooks/useSanityData";
import { norfolkData } from "@/lib/dummyData/locationData";
import {
  getSanityImagesArray,
  getSanityImageUrl,
} from "@/lib/sanity/getSanityImageUrl";
import ApplyForm from "./ApplyForm";

const Canterbury = () => {
  const { openModal, closeModal } = useModal();
  const { data } = useNorfolkPage();

  return (
    <PublicPagesLayout>
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
                data?.discoverSandringham?.images?.map((item, idx) => ({
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
    </PublicPagesLayout>
  );
};

export default Canterbury;
