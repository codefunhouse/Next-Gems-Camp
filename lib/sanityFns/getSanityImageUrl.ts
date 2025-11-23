import { urlFor } from "@/sanity/lib/image";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";

/**
 * Convert Sanity image to optimized URL string
 * Returns empty string if no valid image
 */
export const getSanityImageUrl = (
  image: SanityImageSource | null | undefined | string,
  width: number = 1200,
  quality: number = 80
): string => {
  if (!image) return "";
  if (typeof image === "string") return image;

  try {
    return urlFor(image).width(width).quality(quality).url();
  } catch (error) {
    console.warn("Failed to convert Sanity image to URL:", error);
    return "";
  }
};

/**
 * Convert Sanity image with alt text
 * Returns null if no valid parameters
 */
export const getSanityImageWithAlt = (
  image: SanityImageSource | string | null | undefined,
  alt: string = "",
  width: number = 1200,
  quality: number = 80
): { src: string; alt: string } | null => {
  if (!image) return null;
  if (typeof image === "string") return { src: image, alt };

  try {
    const src = urlFor(image).width(width).quality(quality).url();

    return { src, alt };
  } catch (error) {
    console.warn("Failed to convert Sanity image with alt:", error);
    return null;
  }
};

/**
 * Convert array of Sanity images with alt text
 * Returns empty array if no valid images
 */
export const getSanityImagesArray = (
  images:
    | Array<{ src: SanityImageSource | string; alt?: string }>
    | null
    | undefined,
  width: number = 1200,
  quality: number = 80
): Array<{ src: string; alt: string }> => {
  if (!images || !Array.isArray(images)) return [];

  return images
    .map((item) => {
      if (!item.src) return null;
      if (typeof item === "string") return item;

      const imageWithAlt = getSanityImageWithAlt(
        item.src,
        item.alt || "",
        width,
        quality
      );
      return imageWithAlt;
    })
    .filter(Boolean) as Array<{ src: string; alt: string }>;
};
