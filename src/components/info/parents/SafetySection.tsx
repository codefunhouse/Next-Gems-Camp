import { Card, CardContent } from "@/components/ui/card";
import { FileText, Heart, Home, Phone, Shield, Users } from "lucide-react";

const safetyFeatures = [
  {
    icon: Shield,
    title: "24/7 Supervision",
    description:
      "Experienced staff provide round-the-clock care and supervision",
  },
  {
    icon: Heart,
    title: "Welfare Support",
    description: "Dedicated welfare team available for any concerns or issues",
  },
  {
    icon: Phone,
    title: "Regular Communication",
    description:
      "Daily updates and easy contact with your child throughout the program",
  },
  {
    icon: Users,
    title: "Background Checks",
    description:
      "All staff undergo comprehensive DBS checks and safeguarding training",
  },
  {
    icon: Home,
    title: "Safe Accommodation",
    description: "Secure, comfortable rooms in prestigious college settings",
  },
  {
    icon: FileText,
    title: "Insurance Coverage",
    description: "Comprehensive insurance included for all participants",
  },
];

function SafetySection() {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-4">
          Your Child's Safety is Our Priority
        </h2>
        <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
          We understand the trust you place in us. Our comprehensive
          safeguarding measures ensure a secure and nurturing environment.
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
  );
}

export default SafetySection;
