import PublicPagesLayout from "@/components/general/PublicPagesLayout";
import CTASection from "@/components/landing/CTASection";
import ImageDisplayer from "@/components/landing/subComps/ImageDisplayer";
import OverviewComp from "@/components/landing/subComps/OverviewComp";
import HeroSection from "@/components/location/second/HeroSection";
import { norfolkImages } from "@/lib/dummyData/locationData";
import { Book, Building2, Coffee, Users } from "lucide-react";

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
  return (
    <PublicPagesLayout>
      {/* Hero Section */}
      <HeroSection />

      {/* Overview Section */}
      <OverviewComp
        title="Discover Sandringham: Coastal Elegance and Historic Charm"
        content={`Located on England's stunning Norfolk coast, Sandringham and its surrounding area offer a rare combination of history, natural beauty, and refined charm. Famous for the Royal Sandringham Estate, this region blends stately elegance with scenic landscapes, from rolling countryside to pristine beaches along the North Sea.
          
        Students can enjoy coastal walks, nature trails, and wildlife spotting while discovering charming nearby villages and historic landmarks. The area also offers opportunities for cultural excursions, sailing, and leisure activities in a safe and tranquil environment, providing a luxurious and immersive English experience where students can explore England's heritage and coastline in style.`}
      />

      <ImageDisplayer
        title="Sandringham & Norfolk Coast"
        data={norfolkImages["Sandringham & Norfolk Coast"]}
        autoSlide={true}
        autoSlideInterval={3000}
        className="my-8"
      />
      <ImageDisplayer
        title="London"
        data={norfolkImages.London}
        autoSlide={true}
        autoSlideInterval={3000}
        className="my-8"
      />
      <ImageDisplayer
        title="Cambridge"
        data={norfolkImages.Cambridge}
        autoSlide={true}
        autoSlideInterval={3000}
        className="my-8"
      />

      <CTASection />
    </PublicPagesLayout>
  );
};

export default Canterbury;
