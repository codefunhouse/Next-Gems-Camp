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
import { useCanterburyPage } from "@/hooks/useSanityData";
import { canterburyData } from "@/lib/dummyData/locationData";
import {
  getSanityImagesArray,
  getSanityImageUrl,
} from "@/lib/sanity/getSanityImageUrl";
import ApplyForm from "./ApplyForm";

const LocationCaterbury = () => {
  const { openModal, closeModal } = useModal();
  const { data } = useCanterburyPage();

  return (
    <PublicPagesLayout>
      <HeroSection
        title={data?.heroSection?.title || canterburyData.heroSection.title}
        subtitle={
          data?.heroSection?.subtitle || canterburyData.heroSection.subtitle
        }
        bgImage={
          getSanityImageUrl(data?.heroSection?.bgImageUrl) ||
          canterburyData.heroSection.bgImageUrl
        }
        locationDesc={
          data?.heroSection?.location || canterburyData.heroSection.location
        }
        locationDetails={
          data?.heroSection?.locationDetails ||
          canterburyData.heroSection.locationDetails
        }
        buttons={
          <Button
            label={
              data?.heroSection?.buttonText ||
              canterburyData.heroSection.buttonText
            }
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
            title={
              data?.discoverCanterbury?.title ||
              canterburyData.discoverCanterbury.title
            }
            content={
              data?.discoverCanterbury?.description ||
              canterburyData.discoverCanterbury.description
            }
          />
        }
        rightContent={
          <ImageDisplayer
            data={
              getSanityImagesArray(
                data?.discoverCanterbury?.images?.map((item, idx) => ({
                  src: item?.image,
                  alt: `image-${idx}`,
                }))
              ) || canterburyData.discoverCanterbury.images
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
        title={data?.accommodation?.title || canterburyData.accommodation.title}
        content={
          data?.accommodation?.description ||
          canterburyData.accommodation.description
        }
        bgImage={
          getSanityImageUrl(data?.accommodation?.bgImageUrl) ||
          canterburyData.accommodation.bgImageUrl
        }
        bgImageAlt={
          data?.accommodation?.bgImageAlt ||
          canterburyData.accommodation.bgImageAlt
        }
      />
      {/* Our Excursion Cities */}
      <OurExcursion
        mainTitle={
          data?.excursionCities?.title || canterburyData.excursionCities.title
        }
        tabs={
          data?.excursionCities?.tabs || canterburyData.excursionCities.tabs
        }
        cities={
          data?.excursionCities?.citiesData ||
          canterburyData.excursionCities.citiesData
        }
      />
    </PublicPagesLayout>
  );
};

export default LocationCaterbury;
