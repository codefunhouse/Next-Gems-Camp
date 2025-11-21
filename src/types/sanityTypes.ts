import { HighlightItem } from "@/components/general/HighlightedText";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";

// Base interfaces
export interface HeroSection {
  title?: string;
  subtitle?: string;
  image?: SanityImageSource;
  buttonText?: string;
}

export interface ListItem {
  item?: string;
  nestedList?: ListItem[];
}

export interface ImageWithAlt {
  imageUrl?: SanityImageSource;
  alt?: string;
}

export interface LocationDetail {
  label?: string;
  value?: string;
  suffix?: string;
}

// Landing Page Interfaces
export interface Programme {
  title?: string;
  icon?: string;
  description?: string;
  imgUrl?: SanityImageSource;
}

export interface OurProgrammes {
  title?: string;
  textColors?: HighlightItem[];
  programmes?: Programme[];
}

export interface Feature {
  icon?: string;
  title?: string;
  desc?: string;
}

export interface WhyChooseUs {
  title?: string;
  features?: Feature[];
}

export interface TeachingApproach {
  icon?: string;
  title?: string;
  description?: string;
}

export interface TeachingApproaches {
  title: string;
  description: string;
  approaches: TeachingApproach[];
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface FAQs {
  title: string;
  questions: FAQ[];
}

export interface Review {
  title?: string;
  description?: string;
  reviewer?: string;
  image?: SanityImageSource;
}

export interface Reviews {
  title?: string;
  textColor: HighlightItem[];
  description?: string;
  reviews?: Review[];
}

export interface CTASectionProps {
  title?: string;
  subtitle?: string;
  buttonText?: string;
  buttonLink?: string;
}

export interface LandingPage {
  heroSection?: HeroSection;
  ourProgrammes?: OurProgrammes;
  whyChooseUs?: WhyChooseUs;
  teachingApproaches?: TeachingApproaches;
  faqs?: FAQs;
  reviews?: Reviews;
  ctaSection?: CTASectionProps;
}

// Parent Page Interfaces
export interface ParentHeroSection extends HeroSection {
  buttonText?: string;
  infoDetails?: string;
  bgImage?: SanityImageSource;
}

export interface LeftRightData {
  leftData?: {
    title?: string;
    lists?: ListItem[];
  };
  rightData?: ImageWithAlt;
}

export interface TravelVisasSection {
  mainTitle?: string;
  mainDesc?: string;
  section1?: LeftRightData;
  section2?: LeftRightData;
}

export interface SafeguardingSection {
  leftData?: {
    title?: string;
    list?: ListItem[];
  };
  rightData?: ImageWithAlt;
}

export interface WhatsIncluded {
  title?: string;
  description?: string;
  includedItems?: ListItem[];
}

export interface ParentCTA {
  title?: string;
  description?: string;
  buttonText?: string;
}

export interface ParentPage {
  heroSection?: ParentHeroSection;
  learningAndEnrichment?: LeftRightData;
  travelVisasAndTransfers?: TravelVisasSection;
  accommodationAndWelfare?: LeftRightData;
  safeguardingAndChildProtection?: SafeguardingSection;
  whatsIncluded?: WhatsIncluded;
  cta?: ParentCTA;
}

// Agent Page Interfaces
export interface AgentHeroSection extends HeroSection {
  buttonText?: string;
  infoDetails?: string;
  bgImage?: SanityImageSource;
}

export interface AgentListData {
  leftData?: {
    title?: string;
    lists?: ListItem[];
  };
  rightData?: ImageWithAlt;
}

export interface AgentSupport {
  leftData?: {
    title?: string;
    list?: ListItem[];
  };
  rightData?: ImageWithAlt;
}

export interface SafeguardingCompliance {
  leftData?: {
    title?: string;
    upperDesc?: string;
    list?: ListItem[];
  };
  rightData?: ImageWithAlt;
}

export interface AgentCTA {
  title?: string;
  description?: string;
  buttonText?: string;
}

export interface AgentPage {
  heroSection?: AgentHeroSection;
  whyPartnerWithUs?: AgentListData;
  programOverview?: AgentListData;
  travelAndTransfers?: AgentListData;
  safeguardingAndCompliance?: SafeguardingCompliance;
  agentSupport?: AgentSupport;
  cta?: AgentCTA;
}

// Location Page Interfaces
export interface LocationHeroSection {
  location?: string;
  title?: string;
  subtitle?: string;
  locationDetails?: LocationDetail[];
  buttonText?: string;
  bgImageUrl?: SanityImageSource;
}

export interface DiscoverSection {
  title?: string;
  description?: string;
  images?: Array<{
    image?: SanityImageSource;
  }>;
}

export interface Accommodation {
  title?: string;
  description?: string;
  bgImageUrl?: SanityImageSource;
  bgImageAlt?: string;
}

export interface CityImage {
  title?: string;
  imageUrl?: SanityImageSource;
}

export interface CityData {
  name?: string;
  images?: CityImage[];
}

export interface ExcursionCities {
  title?: string;
  tabs?: string[];
  citiesData?: CityData[];
}

export interface CanterburyPage {
  heroSection?: LocationHeroSection;
  discoverCanterbury?: DiscoverSection;
  accommodation?: Accommodation;
  excursionCities?: ExcursionCities;
}

export interface NorfolkPage {
  heroSection?: LocationHeroSection;
  discoverSandringham?: DiscoverSection;
  accommodation?: Accommodation;
  excursionCities?: ExcursionCities;
}

// Footer Interfaces
export interface FooterLink {
  text?: string;
  link?: string;
}

export interface QuickLinks {
  title?: string;
  links?: FooterLink[];
}

export interface ContactInfo {
  email?: string;
  phone?: string;
  location?: string;
}

export interface Contact {
  title?: string;
  contacts?: ContactInfo;
}

export interface SocialLink {
  icon?: string;
  link?: string;
}

export interface Socials {
  title?: string;
  socials?: SocialLink[];
}

export interface Footer {
  about?: string;
  quickLinks?: QuickLinks;
  contact?: Contact;
  socials?: Socials;
  copyrightText?: string;
}

// Main Site Content Interface
export interface SiteContent {
  landingPage?: LandingPage;
  parentPage?: ParentPage;
  agentPage?: AgentPage;
  canterburyPage?: CanterburyPage;
  norfolkPage?: NorfolkPage;
  footer?: Footer;
}

// Query Result Interfaces
export interface SiteContentQueryResult {
  siteContent: SiteContent;
}

export interface LandingPageQueryResult {
  landingPage: LandingPage;
}

export interface ParentPageQueryResult {
  parentPage: ParentPage;
}

export interface AgentPageQueryResult {
  agentPage: AgentPage;
}

export interface CanterburyPageQueryResult {
  canterburyPage: CanterburyPage;
}

export interface NorfolkPageQueryResult {
  norfolkPage: NorfolkPage;
}

export interface FooterQueryResult {
  footer: Footer;
}
