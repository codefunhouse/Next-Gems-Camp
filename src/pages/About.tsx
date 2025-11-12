import AwardsSection from "@/components/about/AwardsSection";
import HeroSection from "@/components/about/HeroSection";
import MissionSection from "@/components/about/MissionSection";
import StatSection from "@/components/about/StatSection";
import ValuesSection from "@/components/about/ValuesSection";
import PublicPagesLayout from "@/components/general/PublicPagesLayout";
import {
  Award,
  BookOpen,
  Heart,
  Shield,
  TrendingUp,
  Users,
} from "lucide-react";

const values = [
  {
    icon: Award,
    title: "Excellence",
    description:
      "We maintain the highest academic standards with world-class tutors and rigorous curriculum design.",
  },
  {
    icon: Users,
    title: "Personalized Learning",
    description:
      "Small class sizes ensure individual attention and tailored educational experiences for each student.",
  },
  {
    icon: BookOpen,
    title: "Academic Rigor",
    description:
      "Our programs challenge students intellectually while fostering critical thinking and creativity.",
  },
  {
    icon: TrendingUp,
    title: "Future Success",
    description:
      "Alumni consistently gain admission to top universities worldwide and excel in their chosen fields.",
  },
  {
    icon: Heart,
    title: "Pastoral Care",
    description:
      "24/7 support and welfare ensure students feel safe, supported, and able to thrive.",
  },
  {
    icon: Shield,
    title: "Safety First",
    description:
      "Comprehensive safeguarding policies and experienced staff provide peace of mind for parents.",
  },
];

const stats = [
  { number: "15+", label: "Years of Excellence" },
  { number: "40+", label: "Academic Subjects" },
  { number: "100+", label: "Countries Represented" },
  { number: "95%", label: "Satisfaction Rate" },
];

const About = () => {
  return (
    <PublicPagesLayout>
      {/* Hero Section */}
      <HeroSection />

      {/* Stats Section */}
      <StatSection />

      {/* Mission Section */}
      <MissionSection />

      {/* Values Section */}
      <ValuesSection />

      {/* Awards Section */}
      <AwardsSection />
    </PublicPagesLayout>
  );
};

export default About;
