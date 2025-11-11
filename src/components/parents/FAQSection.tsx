import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "What is included in the program fee?",
    answer:
      "The program fee includes tuition, accommodation, meals, activities, course materials, excursions, and insurance. Airport transfers can be arranged for an additional fee.",
  },
  {
    question: "How do you ensure student safety?",
    answer:
      "We have comprehensive safeguarding policies, 24/7 supervision, vetted staff, secure accommodation, and regular welfare checks. Parents receive daily updates and can contact us anytime.",
  },
  {
    question: "What is the typical class size?",
    answer:
      "We maintain small class sizes, typically 8-12 students, to ensure personalized attention and meaningful interaction with tutors.",
  },
  {
    question: "Can students with dietary restrictions be accommodated?",
    answer:
      "Yes, we can accommodate most dietary requirements including vegetarian, vegan, halal, kosher, and allergy-specific needs. Please inform us during the application process.",
  },
  {
    question: "What happens if my child becomes homesick or unwell?",
    answer:
      "Our welfare team is experienced in supporting homesick students. Medical facilities are available on-site, and we maintain contact with parents if any concerns arise.",
  },
  {
    question: "What qualifications do the tutors have?",
    answer:
      "Our tutors are from leading universities worldwide, holding advanced degrees in their subjects. Many are current academics or doctoral candidates at Oxford, Cambridge, and other prestigious institutions.",
  },
  {
    question: "Is there free time for students to socialize?",
    answer:
      "Yes, the program balances academic study with social activities, excursions, and free time. Students participate in evening activities and weekend trips.",
  },
  {
    question: "What is your cancellation policy?",
    answer:
      "We offer flexible cancellation policies with full refunds up to 60 days before the program start. Please refer to our terms and conditions for complete details.",
  },
];

function FAQSection() {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12">
          Frequently Asked Questions
        </h2>
        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="border rounded-lg px-6"
              >
                <AccordionTrigger className="text-left font-semibold">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}

export default FAQSection;
