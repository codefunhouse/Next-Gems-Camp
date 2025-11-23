import { sanityFetch } from "@/sanity/lib/live";
import {
  AgentPage,
  CanterburyPage,
  Footer,
  LandingPage,
  NorfolkPage,
  ParentPage,
} from "@/types/sanityTypes";

// Fetch all site content

export async function getLandingPage(): Promise<LandingPage> {
  const query = `*[_type == "siteContent"]`;

  const data = await sanityFetch({ query: query });
  return data?.data[0]?.landingPage;
}

export async function getParentPage(): Promise<ParentPage> {
  const query = `*[_type == "siteContent"]`;

  const data = await sanityFetch({ query: query });
  return data?.data[0]?.parentPage;
}

export async function getAgentPage(): Promise<AgentPage> {
  const query = `*[_type == "siteContent"]`;

  const data = await sanityFetch({ query: query });
  return data?.data[0]?.agentPage;
}
export async function getCanterburyPage(): Promise<CanterburyPage> {
  const query = `*[_type == "siteContent"]`;

  const data = await sanityFetch({ query: query });
  return data?.data[0]?.canterburyPage;
}
export async function getNorfolkPage(): Promise<NorfolkPage> {
  const query = `*[_type == "siteContent"]`;

  const data = await sanityFetch({ query: query });
  return data?.data[0]?.norfolkPage;
}
export async function getFooter(): Promise<Footer> {
  const query = `*[_type == "siteContent"]`;

  const data = await sanityFetch({ query: query });
  return data?.data[0]?.footer;
}
