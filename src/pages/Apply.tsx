import Button from "@/components/general/Button";
import PublicPagesLayout from "@/components/general/PublicPagesLayout";
import HeroSection from "@/components/landing/HeroSection";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

const formSchema = z.object({
  firstName: z
    .string()
    .min(2, "First name must be at least 2 characters")
    .max(50),
  lastName: z
    .string()
    .min(2, "Last name must be at least 2 characters")
    .max(50),
  email: z.string().email("Invalid email address").max(255),
  phone: z
    .string()
    .min(10, "Phone number must be at least 10 characters")
    .max(20),
  age: z.string().min(1, "Please select an age"),
  location: z.string().min(1, "Please select a location"),
  subject: z.string().min(1, "Please select a subject"),
  parentName: z
    .string()
    .min(2, "Parent name must be at least 2 characters")
    .max(100),
  parentEmail: z.string().email("Invalid email address").max(255),
  medicalInfo: z.string().max(500).optional(),
  motivation: z
    .string()
    .min(50, "Please tell us more (at least 50 characters)")
    .max(1000),
});

const Apply = () => {
  const [submitted, setSubmitted] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      age: "",
      location: "",
      subject: "",
      parentName: "",
      parentEmail: "",
      medicalInfo: "",
      motivation: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log("Application submitted:", values);
    setSubmitted(true);
    toast({
      title: "Application Submitted!",
      description:
        "We'll review your application and contact you within 3 business days.",
    });
  };

  if (submitted) {
    return (
      <PublicPagesLayout>
        <div className="flex-1 flex items-center justify-center bg-muted pt-16">
          <Card className="max-w-2xl mx-4">
            <CardContent className="p-12 text-center">
              <CheckCircle className="h-16 w-16 text-primary mx-auto mb-6" />
              <h1 className="text-3xl font-bold mb-4">Application Received!</h1>
              <p className="text-lg text-muted-foreground mb-6">
                Thank you for applying to Elite Summer Academy. We've received
                your application and will review it carefully.
              </p>
              <p className="text-muted-foreground mb-8">
                You'll receive a confirmation email shortly, and our admissions
                team will contact you within 3 business days with next steps.
              </p>
              <Button
                label="Return to Home"
                onClick={() => (window.location.href = "/")}
              />
            </CardContent>
          </Card>
        </div>
      </PublicPagesLayout>
    );
  }

  return (
    <PublicPagesLayout>
      {/* Hero Section */}

      <HeroSection
        bgImage="https://elements-resized.envatousercontent.com/envato-dam-assets-production/EVA/TRX/a3/ca/98/e0/be/v1_E10/E10ALOYS.jpg?w=1400&cf_fit=scale-down&mark-alpha=18&mark=https%3A%2F%2Felements-assets.envato.com%2Fstatic%2Fwatermark4.png&q=85&format=auto&s=e6c573dff18585b338b01b908949b00288ef797f4b4debeef6ff7057c15f17d8"
        title="Register Now!"
        subtitle=" Take the first step towards an unforgettable summer of academic
            excellence"
      />

      {/* Form Section */}
      <section className="py-12 bg-background">
        <div className="container mx-auto px-5 sm:px-8">
          <Card className="max-w-3xl mx-auto px-5 sm:px-8 py-4">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl">Application Form</CardTitle>
              <p className="text-muted-foreground">
                Please complete all fields. Applications are reviewed on a
                rolling basis.
              </p>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-6"
                >
                  {/* Student Information */}
                  <div>
                    <h3 className="text-xl font-semibold mb-4">
                      Student Information
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="firstName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>First Name *</FormLabel>
                            <FormControl>
                              <Input placeholder="John" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="lastName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Last Name *</FormLabel>
                            <FormControl>
                              <Input placeholder="Smith" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Student Email *</FormLabel>
                            <FormControl>
                              <Input
                                type="email"
                                placeholder="john@example.com"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Phone Number *</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="+44 20 1234 5678"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="mt-4">
                      <FormField
                        control={form.control}
                        name="age"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Age Group *</FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select age group" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="9-12">9-12 years</SelectItem>
                                <SelectItem value="13-15">
                                  13-15 years
                                </SelectItem>
                                <SelectItem value="16-18">
                                  16-18 years
                                </SelectItem>
                                <SelectItem value="18-24">
                                  18-24 years
                                </SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>

                  {/* Program Selection */}
                  <div>
                    <h3 className="text-xl font-semibold mb-4">
                      Program Selection
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="location"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Preferred Location *</FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select location" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="oxford">Oxford</SelectItem>
                                <SelectItem value="cambridge">
                                  Cambridge
                                </SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="subject"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Subject Interest *</FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select subject" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="medicine">
                                  Medicine
                                </SelectItem>
                                <SelectItem value="law">Law</SelectItem>
                                <SelectItem value="business">
                                  Business & Economics
                                </SelectItem>
                                <SelectItem value="engineering">
                                  Engineering
                                </SelectItem>
                                <SelectItem value="literature">
                                  English Literature
                                </SelectItem>
                                <SelectItem value="mathematics">
                                  Mathematics
                                </SelectItem>
                                <SelectItem value="sciences">
                                  Natural Sciences
                                </SelectItem>
                                <SelectItem value="history">History</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>

                  {/* Parent/Guardian Information */}
                  <div>
                    <h3 className="text-xl font-semibold mb-4">
                      Parent/Guardian Information
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="parentName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Parent/Guardian Name *</FormLabel>
                            <FormControl>
                              <Input placeholder="Jane Smith" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="parentEmail"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Parent/Guardian Email *</FormLabel>
                            <FormControl>
                              <Input
                                type="email"
                                placeholder="jane@example.com"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>

                  {/* Additional Information */}
                  <div>
                    <h3 className="text-xl font-semibold mb-4">
                      Additional Information
                    </h3>
                    <FormField
                      control={form.control}
                      name="medicalInfo"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            Medical Information or Dietary Requirements
                          </FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Any allergies, medical conditions, or dietary requirements we should be aware of..."
                              className="min-h-[80px]"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="motivation"
                      render={({ field }) => (
                        <FormItem className="mt-4">
                          <FormLabel>
                            Why do you want to attend this program? *
                          </FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Tell us about your academic interests and what you hope to gain from this program..."
                              className="min-h-[120px]"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="flex gap-4">
                    <Button
                      label=" Submit Application"
                      classNames="max-w-[300px] mx-auto"
                    />
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </section>
    </PublicPagesLayout>
  );
};

export default Apply;
