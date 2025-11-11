import { Card, CardContent } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Shield, Heart, Phone, FileText, Users, Home } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";

const Parents = () => {
  const safetyFeatures = [
    {
      icon: Shield,
      title: "24/7 Supervision",
      description: "Experienced staff provide round-the-clock care and supervision"
    },
    {
      icon: Heart,
      title: "Welfare Support",
      description: "Dedicated welfare team available for any concerns or issues"
    },
    {
      icon: Phone,
      title: "Regular Communication",
      description: "Daily updates and easy contact with your child throughout the program"
    },
    {
      icon: Users,
      title: "Background Checks",
      description: "All staff undergo comprehensive DBS checks and safeguarding training"
    },
    {
      icon: Home,
      title: "Safe Accommodation",
      description: "Secure, comfortable rooms in prestigious college settings"
    },
    {
      icon: FileText,
      title: "Insurance Coverage",
      description: "Comprehensive insurance included for all participants"
    }
  ];

  const faqs = [
    {
      question: "What is included in the program fee?",
      answer: "The program fee includes tuition, accommodation, meals, activities, course materials, excursions, and insurance. Airport transfers can be arranged for an additional fee."
    },
    {
      question: "How do you ensure student safety?",
      answer: "We have comprehensive safeguarding policies, 24/7 supervision, vetted staff, secure accommodation, and regular welfare checks. Parents receive daily updates and can contact us anytime."
    },
    {
      question: "What is the typical class size?",
      answer: "We maintain small class sizes, typically 8-12 students, to ensure personalized attention and meaningful interaction with tutors."
    },
    {
      question: "Can students with dietary restrictions be accommodated?",
      answer: "Yes, we can accommodate most dietary requirements including vegetarian, vegan, halal, kosher, and allergy-specific needs. Please inform us during the application process."
    },
    {
      question: "What happens if my child becomes homesick or unwell?",
      answer: "Our welfare team is experienced in supporting homesick students. Medical facilities are available on-site, and we maintain contact with parents if any concerns arise."
    },
    {
      question: "What qualifications do the tutors have?",
      answer: "Our tutors are from leading universities worldwide, holding advanced degrees in their subjects. Many are current academics or doctoral candidates at Oxford, Cambridge, and other prestigious institutions."
    },
    {
      question: "Is there free time for students to socialize?",
      answer: "Yes, the program balances academic study with social activities, excursions, and free time. Students participate in evening activities and weekend trips."
    },
    {
      question: "What is your cancellation policy?",
      answer: "We offer flexible cancellation policies with full refunds up to 60 days before the program start. Please refer to our terms and conditions for complete details."
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-24 pb-16 bg-gradient-to-br from-hero-start to-hero-end text-white">
        <div 
          className="absolute inset-0 opacity-20 bg-cover bg-center"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1491841573634-28140fc7ced7?w=1600&h=600&fit=crop')"
          }}
        />
        <div className="relative z-10 container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">Information for Parents</h1>
          <p className="text-xl max-w-3xl mx-auto opacity-90">
            Everything you need to know about keeping your child safe, happy, and academically challenged
          </p>
        </div>
      </section>

      {/* Safety Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-4">Your Child's Safety is Our Priority</h2>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            We understand the trust you place in us. Our comprehensive safeguarding measures ensure a secure and nurturing environment.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {safetyFeatures.map((feature, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <feature.icon className="h-12 w-12 text-primary mb-4" />
                  <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* What to Expect Section */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">What to Expect</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-2xl font-semibold mb-4 text-primary">Before Arrival</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Comprehensive pre-arrival information pack</li>
                  <li>• Welcome call to address any concerns</li>
                  <li>• Packing list and travel arrangements</li>
                  <li>• Medical and dietary requirements confirmation</li>
                  <li>• Emergency contact procedures</li>
                </ul>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <h3 className="text-2xl font-semibold mb-4 text-primary">During the Program</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Daily academic sessions with expert tutors</li>
                  <li>• Structured social and recreational activities</li>
                  <li>• Educational excursions and cultural visits</li>
                  <li>• Regular welfare checks and support</li>
                  <li>• Photo updates on social media channels</li>
                </ul>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <h3 className="text-2xl font-semibold mb-4 text-primary">Communication</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• 24/7 emergency contact line for parents</li>
                  <li>• Weekly progress reports from tutors</li>
                  <li>• Photo galleries of activities and excursions</li>
                  <li>• Direct communication with welfare team</li>
                  <li>• End-of-program certificates and feedback</li>
                </ul>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <h3 className="text-2xl font-semibold mb-4 text-primary">After the Program</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Detailed academic report and assessment</li>
                  <li>• Certificate of completion</li>
                  <li>• University application guidance if requested</li>
                  <li>• Alumni network access</li>
                  <li>• Feedback survey and testimonials</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">Frequently Asked Questions</h2>
          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`} className="border rounded-lg px-6">
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

      {/* Contact CTA */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Still Have Questions?</h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Our admissions team is here to help. Contact us for a personal consultation about your child's summer experience.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary">
              Schedule a Call
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
              Download Brochure
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Parents;
