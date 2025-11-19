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
import { Book, Building2, Coffee, Users } from "lucide-react";
import ApplyForm from "./ApplyForm";

const highlights = [
  {
    icon: Building2,
    title: "Historic College",
    description:
      "Study in authentic Oxford college buildings with centuries of academic heritage",
  },
  {
    icon: Book,
    title: "World-Class Libraries",
    description:
      "Access to the Bodleian Library and college libraries for research",
  },
  {
    icon: Users,
    title: "Student Life",
    description:
      "Experience genuine Oxford student life with formal dinners and traditions",
  },
  {
    icon: Coffee,
    title: "City Center",
    description: "Walking distance to museums, cafes, and historic landmarks",
  },
];

const courses = [
  { name: "Medicine", ages: "16-18", weeks: "2 weeks" },
  { name: "Law", ages: "16-18", weeks: "2 weeks" },
  { name: "Business & Economics", ages: "15-18", weeks: "2-4 weeks" },
  { name: "Engineering", ages: "16-18", weeks: "2 weeks" },
  { name: "English Literature", ages: "13-18", weeks: "2 weeks" },
  { name: "Mathematics", ages: "13-18", weeks: "2 weeks" },
];
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
        images={norfolkData.excursionCities.cities}
        location={norfolkData.excursionCities.location}
      />
    </PublicPagesLayout>
  );
};

export default Canterbury;
