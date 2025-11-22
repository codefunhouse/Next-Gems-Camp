// lib/sanity.ts
import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";
// Import the type
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";

export const client = createClient({
  projectId: import.meta.env.VITE_SANITY_PROJECT_ID,
  dataset: import.meta.env.VITE_SANITY_DATASET || "production",
  useCdn: true,
  apiVersion: "2024-01-01",
});

const builder = imageUrlBuilder(client);

// Use the SanityImageSource type for the 'source' parameter
export const urlFor = (source: SanityImageSource) => {
  return builder.image(source);
};
