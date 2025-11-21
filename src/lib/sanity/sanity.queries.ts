import { SiteContent } from "@/types/sanityTypes";
import { client } from "./sanity";

// Fetch all site content
export async function getSiteContent(): Promise<SiteContent> {
  const query = `*[_type == "siteContent"][0] {
    landingPage {
      heroSection {
        title,
        subtitle,
        image
      },
      ourProgrammes {
        title,
        programmes[] {
          title,
          icon,
          description,
          imgUrl
        }
      },
      whyChooseUs {
        title,
        features[] {
          icon,
          title,
          desc
        }
      },
      teachingApproaches {
        title,
        description,
        approaches[] {
          icon,
          title,
          description
        }
      },
      faqs {
        title,
        questions[] {
          question,
          answer
        }
      },
      reviews {
        title,
        description,
        reviews[] {
          title,
          description,
          reviewer,
          image
        }
      },
      ctaSection {
        title,
        subtitle,
        buttonText,
        buttonLink
      }
    },
    parentPage {
      heroSection {
        title,
        subtitle,
        buttonText,
        infoDetails,
        bgImage
      },
      learningAndEnrichment {
        leftData {
          title,
          lists[] {
            item
          }
        },
        rightData {
          imageUrl,
          alt
        }
      }
      // Add other parent page sections...
    },
    agentPage {
      // Add agent page fields...
    },
    canterburyPage {
      // Add canterbury page fields...
    },
    norfolkPage {
      // Add norfolk page fields...
    },
    footer {
      about,
      quickLinks {
        title,
        links[] {
          text,
          link
        }
      },
      contact {
        title,
        contacts {
          email,
          phone,
          location
        }
      },
      socials {
        title,
        socials[] {
          icon,
          link
        }
      },
      copyrightText
    }
  }`;

  const data = await client.fetch(query);
  return data;
}

// Fetch specific page content
export async function getLandingPage() {
  const query = `*[_type == "siteContent"][0] {
    landingPage {
      // Include all landing page fields
    }
  }`;

  const data = await client.fetch(query);
  return data.landingPage;
}

export async function getParentPage() {
  const query = `*[_type == "siteContent"][0] {
    parentPage {
      // Include all parent page fields
    }
  }`;

  const data = await client.fetch(query);
  return data.parentPage;
}
