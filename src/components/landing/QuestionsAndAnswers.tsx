import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "What is included in the course fee?",
    answer:
      "The course fee includes all tuition, accommodation, meals, course materials, excursions, and a certificate of completion.",
  },
  {
    question: "What is the class size?",
    answer:
      "We maintain small class sizes with an average of 8 students per class to ensure personalized attention from tutors.",
  },
  {
    question: "Are airport transfers provided?",
    answer:
      "Yes, we offer optional airport transfer services from major UK airports for an additional fee.",
  },
  {
    question: "What qualifications do the tutors have?",
    answer:
      "All our tutors are experienced academics from top universities with advanced degrees and passion for teaching.",
  },
];

function QuestionsAndAnswers() {
  return (
    <section className="py-20 bg-muted">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12">
          Frequently Asked Questions
        </h2>
        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent>{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}

export default QuestionsAndAnswers;
