"use client";
import Button from "@/components/general/Button";
import { useModal } from "@/hooks/useModal";
import { CTASectionProps } from "@/types/sanityTypes";
import { commonSectionStyles } from "@/utils/constants/commonStyles";
import { agentsInfoData, parentInfoData } from "@/utils/dummyData/infoData";
import { landingPageDummyData } from "@/utils/dummyData/landingPage";
import { usePathname } from "next/navigation";
import { twMerge } from "tailwind-merge";
import ApplyForm from "./ApplyForm";
import BgImage from "./BgImage";

function CTASection({
  landingPageCTA,
  parentsCTA,
  agentsCTA,
}: {
  landingPageCTA?: CTASectionProps;
  parentsCTA?: CTASectionProps;
  agentsCTA?: CTASectionProps;
}) {
  const pathname = usePathname();
  const isParentRoute = pathname === "/info/parents";
  const isAgentRoute = pathname === "/info/agents";
  const { openModal, closeModal } = useModal();
  return (
    <section
      className={twMerge(
        "py-20 bg-blue-primary text-white relative",
        commonSectionStyles
      )}
    >
      <BgImage
        src="/images/cta_bg_img.jpg"
        alt="vivid blurred colourful wallpaper"
        overlayStyles="bg-transparent"
        className="bg-blue-primary opacity-40"
      />
      <div className="relative z-10 mx-auto px-4 text-center flex flex-col items-center w-full max-w-[790px] gap-3">
        <h1 className="">
          {isParentRoute
            ? parentsCTA?.title || parentInfoData.cta.title
            : isAgentRoute
              ? agentsCTA?.title || agentsInfoData.cta.title
              : landingPageCTA?.title || landingPageDummyData.ctaSection.title}
        </h1>
        <p className="text-base sm:text-lg max-w-[598px]">
          {isParentRoute
            ? parentsCTA?.subtitle || parentInfoData.cta.description
            : isAgentRoute
              ? agentsCTA?.subtitle || agentsInfoData.cta.description
              : landingPageCTA?.subtitle ||
                landingPageDummyData.ctaSection.subtitle}
        </p>
        <Button
          label={
            isParentRoute
              ? parentsCTA?.buttonText || parentInfoData.cta.buttonText
              : isAgentRoute
                ? parentsCTA?.buttonText || agentsInfoData.cta.buttonText
                : landingPageCTA?.buttonText ||
                  landingPageDummyData.ctaSection.buttonText
          }
          classNames="max-w-[200px] w-full mt-3"
          onClick={() => openModal(<ApplyForm onClick={() => closeModal()} />)}
          buttonType="sec"
        />
      </div>
    </section>
  );
}

export default CTASection;
