import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQCompProps {
  faqs: FAQItem[];
  className?: string;
  initialVisibleCount?: number;
}

const FAQComp = ({
  faqs,
  className = "",
  initialVisibleCount = 7,
}: FAQCompProps) => {
  const [showAll, setShowAll] = useState(false);

  const visibleFaqs = showAll ? faqs : faqs.slice(0, initialVisibleCount);
  const hasMoreFaqs = faqs.length > initialVisibleCount;

  return (
    <div className={className}>
      <Accordion type="single" collapsible className="w-full">
        {visibleFaqs.map((faq, index) => (
          <AccordionItem key={index} value={`item-${index}`}>
            <AccordionTrigger className="text-left text-base sm:text-xl">
              {faq.question}
            </AccordionTrigger>
            <AccordionContent className="text-base">
              {faq.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      {hasMoreFaqs && (
        <div className="flex justify-center mt-6">
          <Button
            variant="outline"
            onClick={() => setShowAll(!showAll)}
            className="px-8"
          >
            {showAll ? "See Less" : "See All"}
          </Button>
        </div>
      )}
    </div>
  );
};

export default FAQComp;
