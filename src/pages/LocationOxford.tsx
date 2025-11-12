import PublicPagesLayout from "@/components/general/PublicPagesLayout";
import Courses from "@/components/location/second/Courses";
import HeroSection from "@/components/location/second/HeroSection";
import Highlights from "@/components/location/second/Highlights";
import Overview from "@/components/location/second/Overview";
import SecondLocationCTA from "@/components/location/second/SecondLocationCTA";
import TravelSection from "@/components/location/second/TravelSection";
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
const LocationOxford = () => {
  return (
    <PublicPagesLayout>
      {/* Hero Section */}
      <HeroSection />

      {/* Overview Section */}
      <Overview />

      {/* Highlights Section */}
      <Highlights />

      {/* Courses Section */}
      <Courses />

      {/* Travel Section */}
      <TravelSection />

      {/* CTA Section */}
      <SecondLocationCTA />
    </PublicPagesLayout>
  );
};

export default LocationOxford;
