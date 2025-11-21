import BagIcon from "@/components/svgs/BagIcon";
import BallIcon from "@/components/svgs/BallIcon";
import ExpertEduIcon from "@/components/svgs/ExpertEduIcon";
import GlobeIcon from "@/components/svgs/GlobeIcon";
import InstagramIcon from "@/components/svgs/InstagramIcon";
import InteractiveIcon from "@/components/svgs/InteractiveIcon";
import LaptopIcon from "@/components/svgs/LaptopIcon";
import PaletteIcon from "@/components/svgs/PaletteIcon";
import RealWorldCommIcon from "@/components/svgs/RealWorldCommIcon";
import TikTokIcon from "@/components/svgs/TikTokIcon";
import TwitterIcon from "@/components/svgs/TwitterIcon";

export const landingPageDummyData = {
  heroSection: {
    title:
      "Discover England's premier luxury summer camp where language, culture, and adventure inspire global confidence.",
    subtitle:
      "Give your child the gift of world-class English tuition, exclusive excursions, and lifelong international friendships, all in the heart of England.",
    image:
      "https://res.cloudinary.com/dg8uxees3/image/upload/v1763476384/home_hero_bg_1_yrxif7.webp",
  },

  ourProgrammes: {
    title: "Our Pathway Programmes",
    programmes: [
      {
        title: "Tech & Innovation",
        icon: <LaptopIcon />,
        description:
          "Step into the future with hands-on digital skills. From coding and app design to robotics and AI, students explore real-world technology challenges and unleash their creativity through interactive projects guided by expert mentors.",
        imgUrl:
          "https://res.cloudinary.com/dg8uxees3/image/upload/v1763657630/pathway_img_1a_sfkif1.webp",
      },
      {
        title: "Business & Enterprise",
        icon: <BagIcon />,
        description:
          "Learn to think like an entrepreneur. Students develop leadership, teamwork, and creative problem-solving skills through exciting business simulations and real-world case studies—building confidence to lead in tomorrow's global economy.",
        imgUrl:
          "https://res.cloudinary.com/dg8uxees3/image/upload/v1763476385/pathway_img_2_izfx8m.webp",
      },
      {
        title: "Sports Leadership",
        icon: <BallIcon />,
        description:
          "Train, compete, and grow. Combining professional coaching with English communication and teamwork, this pathway helps students build discipline, confidence, and leadership both on and off the field.",
        imgUrl:
          "https://res.cloudinary.com/dg8uxees3/image/upload/v1763476385/pathway_img_3_hjythu.webp",
      },
      {
        title: "Creative Arts & Media",
        icon: <PaletteIcon />,
        description:
          "Ignite your imagination through film, design, performance, and visual arts. Students express their ideas, collaborate across cultures, and create portfolio-worthy projects that showcase their unique talent and voice.",
        imgUrl:
          "https://res.cloudinary.com/dg8uxees3/image/upload/v1763476385/pathway_4_xtihrh.webp",
      },
    ],
  },

  whyChooseUs: {
    title: "Why Choose Next Gems?",
    features: [
      {
        icon: "🎓",
        title: "Accredited English Tuition",
        desc: "Qualified teachers delivering 30 hours of certified language learning.",
      },
      {
        icon: "🏨",
        title: "Luxury & Safety Assured",
        desc: "Premium accommodation, nutritious meals, and 24/7 care.",
      },
      {
        icon: "👥",
        title: "Small Groups, Big Progress",
        desc: "Personalised learning that builds confidence and results.",
      },
      {
        icon: "🌍",
        title: "Global Friendships",
        desc: "An international mix of students sharing cultures and experiences.",
      },
      {
        icon: "🛣️",
        title: "Four Inspiring Pathways",
        desc: "Choose from Tech, Business, Sport, or Arts.",
      },
      {
        icon: "🏰",
        title: "Explore Iconic England",
        desc: "Unforgettable excursions to London, Oxford, and beyond.",
      },
      {
        icon: "👩‍🏫",
        title: "Exceptional Staff Team",
        desc: "Expert teachers and caring mentors supporting every step.",
      },
      {
        icon: "✅",
        title: "Trusted Worldwide",
        desc: "The premium choice for families and agents seeking excellence.",
      },
    ],
  },

  teachingApproaches: {
    title: "Our Teaching Approaches",
    description:
      "At Next Gems Summer Camp, we believe learning flourishes when it is engaging, personalised, and inspired by real-world experiences. Our expert teachers guide every student to grow in confidence, skill, and curiosity, making every lesson meaningful and memorable.",
    approaches: [
      {
        icon: <InteractiveIcon className="group-hover:stroke-blue-primary" />,
        title: "Interactive & Engaging Lessons",
        description:
          "Dynamic, student-centered classes use discussions, role-plays, and projects to make learning practical and fun.",
      },
      {
        icon: <RealWorldCommIcon />,
        title: "Real-World Communication",
        description:
          "English is practised beyond the classroom through cultural immersion, collaborative projects, and exciting excursions.",
      },
      {
        icon: <GlobeIcon />,
        title: "Personalised Learning",
        description:
          "Small groups ensure each student receives tailored guidance, accelerating progress and building confidence.",
      },
      {
        icon: <ExpertEduIcon />,
        title: "Expert & Caring Educators",
        description:
          "Qualified, experienced teachers provide professional instruction, mentorship, and support every step of the way.",
      },
    ],
  },

  faqs: {
    title: "Quick FAQ for Parents",
    questions: [
      {
        question: "When is the camp?",
        answer:
          "Next Gems Summer Camp runs from July 6th – August 16th, 2026, in 2-week cycles.",
      },
      {
        question: "Is the camp safe?",
        answer:
          "Yes. We provide 24/7 supervision, premium secure accommodation, and strict health and safety protocols.",
      },
      {
        question: "What is included in the camp fee?",
        answer:
          "Tuition, accommodation, meals, pathway activities, excursions, and full pastoral care are all included.",
      },
      {
        question: "What is the quality of teaching?",
        answer:
          "All lessons are delivered by fully qualified, experienced teachers in small groups, ensuring measurable progress in English.",
      },
      {
        question: "Where is the camp and what facilities are provided?",
        answer:
          "The camps are located in Canterbury and Norfolk, England, offering premium accommodation, modern classrooms, sports facilities, and cultural excursion opportunities.",
      },
      {
        question: "What activities and pathways are available?",
        answer:
          "Students choose from Tech, Business, Sport, or Creative Arts pathways, alongside cultural, sports, and leisure activities.",
      },
      {
        question: "How do I enrol and what are the deadlines?",
        answer:
          "Register online via our website. Spaces are limited, so early booking is recommended. Visa guidance is provided for international students.",
      },
    ],
  },

  reviews: {
    title: "What Families Say About Us",
    description:
      "Discover what our students have to say about their transformative learning journey",
    reviews: [
      {
        title: "A transformative experience for our daughter",
        description:
          "Our daughter came home more confident, independent, and inspired. The English lessons were excellent, but it was the friendships and cultural activities that truly made it special. Next Gems delivered everything they promised — luxury, learning, and care.",
        reviewer: "Emma T., Parent (Italy)",
        image: "https://tinyurl.com/4875uffb",
      },
      {
        title: "Safe, structured, and truly international",
        description:
          "As a parent, I was impressed by how well-organised and personal the experience was. Small group sizes meant our son was always supported, and he loved meeting students from all over the world. Worth every penny.",
        reviewer: "David L., Parent (United Arab Emirates)",
        image:
          "https://elements-resized.envatousercontent.com/envato-dam-assets-production/EVA/TRX/a6/05/35/4f/0a/v1_E10/E109PUOG.jpg?w=1400&cf_fit=scale-down&mark-alpha=18&mark=https%3A%2F%2Felements-assets.envato.com%2Fstatic%2Fwatermark4.png&q=85&format=auto&s=af102d0868170a863e5d0d3f123ee9183780cf958559210f44532a220eed79ed",
      },
      {
        title: "Our top recommendation for premium families",
        description:
          "Next Gems has become our go-to summer camp partner in England. The team's attention to detail, communication, and high academic standards make it a standout choice for families seeking quality and safety.",
        reviewer: "Sophie R., Education Agent (France)",
        image:
          "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop",
      },
      {
        title: "A benchmark for luxury summer programs",
        description:
          "Everything about Next Gems speaks of quality — from accommodation and teaching to the cultural excursions. Our students return with glowing feedback year after year.",
        reviewer: "Luis M., Study Abroad Consultant (Spain)",
        image:
          "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop",
      },
      {
        title: "The best summer of my life!",
        description:
          "I improved my English so much and made friends from Japan, Brazil, and Saudi Arabia! The teachers were amazing, and the trips around England were unforgettable.",
        reviewer: "Mia K., Student (Germany, Age 15)",
        image:
          "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop",
      },
      {
        title: "Fun, learning, and adventure all in one",
        description:
          "I chose the Tech specialism and got to build my own app while exploring London on weekends. It was both exciting and challenging — I can't wait to come back next summer!",
        reviewer: "Omar A., Student (Kuwait, Age 16)",
        image:
          "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop",
      },
    ],
  },

  ctaSection: {
    title: "Ready to Start Your Journey?",
    subtitle: "Join thousands of students from around the world",
    buttonText: "Register Now",
    buttonLink: "/apply",
  },

  footerData: {
    quickLinks: {
      title: "Quick Links",
      links: [
        {
          text: "Home",
          link: "/",
        },

        {
          text: "Canterbury",
          link: "locations/canterbury",
        },
        {
          text: "Norfolk",
          link: "locations/norfolk",
        },
        {
          text: "Parent Info",
          link: "/info/parents",
        },
        {
          text: "Agent Info",
          link: "/info/agents",
        },
      ],
    },
    contact: {
      title: "Contact",
      contacts: {
        email: "hello@nextgemscamp.com",
        phone: "+44 7836 376328, +44 7919 357819",
        location: "London, UK",
      },
    },
    socials: {
      title: "Socials",
      socials: [
        {
          icon: <InstagramIcon />,
          link: "instagram.com/nextgemscamp",
        },
        {
          icon: <TikTokIcon />,
          link: "https://www.tiktok.com/@nextgemscamp?_r=1&_t=ZN-91X1uiUJOA2",
        },
        {
          icon: <TwitterIcon />,
          link: "",
        },
      ],
    },
    copyrightText: "© 2026 Next Gems Camps. All rights reserved.",
  },
};
