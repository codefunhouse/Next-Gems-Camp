import { AgentPage, LandingPage, ParentPage } from "./sanityTypes";

export interface CustomSVGProps {
  className?: string;
  fill?: string;
  stroke?: string;
  innerClassStyles?: string;
}

export interface InfoProps {
  data: AgentPage;
  landingPageData: LandingPage;
}

export interface InfoParentsProps {
  data: ParentPage;
  landingPageData: LandingPage;
}
