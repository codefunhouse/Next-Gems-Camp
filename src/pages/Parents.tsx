import PublicPagesLayout from "@/components/general/PublicPagesLayout";
import ContactCTA from "@/components/info/parents/ContactCTA";
import HeroSection from "@/components/info/parents/HeroSection";
import WhatsIncludedSection from "@/components/info/parents/WhatsIncluded";
import WhatToExpect from "@/components/info/parents/WhatToExpect";
import QuestionsAndAnswers from "@/components/landing/QuestionsAndAnswers";
import { FileText, Heart, Home, Phone, Shield, Users } from "lucide-react";

const safetyFeatures = [
  {
    icon: Shield,
    title: "24/7 Supervision",
    description:
      "Experienced staff provide round-the-clock care and supervision",
  },
  {
    icon: Heart,
    title: "Welfare Support",
    description: "Dedicated welfare team available for any concerns or issues",
  },
  {
    icon: Phone,
    title: "Regular Communication",
    description:
      "Daily updates and easy contact with your child throughout the program",
  },
  {
    icon: Users,
    title: "Background Checks",
    description:
      "All staff undergo comprehensive DBS checks and safeguarding training",
  },
  {
    icon: Home,
    title: "Safe Accommodation",
    description: "Secure, comfortable rooms in prestigious college settings",
  },
  {
    icon: FileText,
    title: "Insurance Coverage",
    description: "Comprehensive insurance included for all participants",
  },
];

const faqs = [
  {
    question: "What is included in the program fee?",
    answer:
      "The program fee includes tuition, accommodation, meals, activities, course materials, excursions, and insurance. Airport transfers can be arranged for an additional fee.",
  },
  {
    question: "How do you ensure student safety?",
    answer:
      "We have comprehensive safeguarding policies, 24/7 supervision, vetted staff, secure accommodation, and regular welfare checks. Parents receive daily updates and can contact us anytime.",
  },
  {
    question: "What is the typical class size?",
    answer:
      "We maintain small class sizes, typically 8-12 students, to ensure personalized attention and meaningful interaction with tutors.",
  },
  {
    question: "Can students with dietary restrictions be accommodated?",
    answer:
      "Yes, we can accommodate most dietary requirements including vegetarian, vegan, halal, kosher, and allergy-specific needs. Please inform us during the application process.",
  },
  {
    question: "What happens if my child becomes homesick or unwell?",
    answer:
      "Our welfare team is experienced in supporting homesick students. Medical facilities are available on-site, and we maintain contact with parents if any concerns arise.",
  },
  {
    question: "What qualifications do the tutors have?",
    answer:
      "Our tutors are from leading universities worldwide, holding advanced degrees in their subjects. Many are current academics or doctoral candidates at Oxford, Cambridge, and other prestigious institutions.",
  },
  {
    question: "Is there free time for students to socialize?",
    answer:
      "Yes, the program balances academic study with social activities, excursions, and free time. Students participate in evening activities and weekend trips.",
  },
  {
    question: "What is your cancellation policy?",
    answer:
      "We offer flexible cancellation policies with full refunds up to 60 days before the program start. Please refer to our terms and conditions for complete details.",
  },
];

const Parents = () => {
  return (
    <PublicPagesLayout>
      {/* Hero Section */}
      <HeroSection />

      {/* What to Expect Section */}
      <WhatToExpect />

      <WhatsIncludedSection />
      {/* FAQ Section */}
      <QuestionsAndAnswers />

      {/* Contact CTA */}
      <ContactCTA />
    </PublicPagesLayout>
  );
};

export default Parents;
