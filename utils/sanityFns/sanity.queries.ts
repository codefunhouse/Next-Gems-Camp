import { sanityFetch } from "@/sanity/lib/live";

// Fetch all site content

export async function getLandingPage() {
  const query = `*[_type == "siteContent"]`;

  const data = await sanityFetch({ query: query });
  return data?.data[0]?.landingPage;
}

export async function getParentPage() {
  const query = `*[_type == "siteContent"]`;

  const data = await sanityFetch({ query: query });
  return data?.data[0]?.parentPage;
}

export async function getAgentPage() {
  const query = `*[_type == "siteContent"]`;

  const data = await sanityFetch({ query: query });
  return data?.data[0]?.agentPage;
}
export async function getCanterburyPage() {
  const query = `*[_type == "siteContent"]`;

  const data = await sanityFetch({ query: query });
  return data?.data[0]?.canterburyPage;
}
export async function getNorfolkPage() {
  const query = `*[_type == "siteContent"]`;

  const data = await sanityFetch({ query: query });
  return data?.data[0]?.norfolkPage;
}
export async function getFooter() {
  const query = `*[_type == "siteContent"]`;

  const data = await sanityFetch({ query: query });
  return data?.data[0]?.footer;
}
