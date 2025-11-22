import { SiteContent } from "@/types/sanityTypes";
import { client } from "./sanity";

// Fetch all site content
export async function getSiteContent(): Promise<SiteContent> {
  const query = `*[_type == "siteContent"]`;

  const data = await client.fetch(query);
  return data;
}

export async function getLandingPage() {
  const query = `*[_type == "siteContent"]`;

  const data = await client.fetch(query);
  return data[0]?.landingPage;
}

export async function getParentPage() {
  const query = `*[_type == "siteContent"]`;

  const data = await client.fetch(query);
  return data[0]?.parentPage;
}

export async function getAgentPage() {
  const query = `*[_type == "siteContent"]`;

  const data = await client.fetch(query);
  return data[0]?.agentPage;
}
export async function getCanterburyPage() {
  const query = `*[_type == "siteContent"]`;

  const data = await client.fetch(query);
  return data[0]?.canterburyPage;
}
export async function getNorfolkPage() {
  const query = `*[_type == "siteContent"]`;

  const data = await client.fetch(query);
  return data[0]?.norfolkPage;
}
export async function getFooter() {
  const query = `*[_type == "siteContent"]`;

  const data = await client.fetch(query);
  return data[0]?.footer;
}
