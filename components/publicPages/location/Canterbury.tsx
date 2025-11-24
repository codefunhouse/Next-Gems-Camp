"use client";

import Button from "@/components/general/Button";
import ShortArrowRight from "@/components/svgs/ShortArrowRight";
import { useModal } from "@/hooks/useModal";
import { canterburyData } from "@/lib/dummyData/locationData";
import {
  getSanityImagesArray,
  getSanityImageUrl,
} from "@/lib/sanityFns/getSanityImageUrl";
import { CanterburyPage } from "@/types/sanityTypes";
import ApplyForm from "../shared/contactForms/ApplyForm";
import ContentCard from "../shared/ContentCard";
import HeroSection from "../shared/HeroSection";
import ImageDisplayer from "../shared/ImageDisplayer";
import OverviewComp from "../shared/OverviewComp";
import SplitSection from "../shared/SplitSection";
import OurExcursion from "./subComps/OurExcursion";

const Caterbury = ({ data }: { data: CanterburyPage }) => {
  const { openModal, closeModal } = useModal();
  console.log("Canterbury Data: ", data);

  return (
    <>
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
    </>
  );
};

export default Caterbury;
