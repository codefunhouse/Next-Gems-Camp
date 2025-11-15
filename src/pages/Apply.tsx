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
  parentFirstName: z
    .string()
    .min(2, "First name must be at least 2 characters")
    .max(50, "First name must be less than 50 characters"),
  parentLastName: z
    .string()
    .min(2, "Last name must be at least 2 characters")
    .max(50, "Last name must be less than 50 characters"),
  parentEmail: z
    .string()
    .email("Invalid email address")
    .max(255, "Email must be less than 255 characters"),
  parentPhone: z
    .string()
    .min(10, "Phone number must be at least 10 characters")
    .max(15, "Phone number must be less than 15 characters"),

  studentAge: z.string().min(1, "Please select an age group"),

  programmeLocation: z.string().min(1, "Please select a location"),
  subjectInterest: z.string().min(1, "Please select a subject"),

  whereHearAboutUs: z
    .string()
    .min(10, "Please provide more details (at least 10 characters)")
    .max(500, "Response must be less than 500 characters"),
  whyOurProgramme: z
    .string()
    .max(500, "Response must be less than 500 characters")
    .optional()
    .or(z.literal("")),
});

const Apply = () => {
  const [submitted, setSubmitted] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      parentFirstName: "",
      parentLastName: "",
      parentEmail: "",
      parentPhone: "",
      studentAge: "",
      programmeLocation: "",
      subjectInterest: "",
      whereHearAboutUs: "",
      whyOurProgramme: "",
    },
    mode: "onChange",
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log("Submitted!");
    console.log("Application submitted:", values);
    setSubmitted(true);
    toast({
      title: "Application Submitted!",
      description:
        "We'll review your application and contact you within 3 business days.",
    });
  };

  console.log("Watched values", form.watch());
  console.log("is valid: ", form.formState.isValid);
  console.log("Form errors:", form.formState.errors);

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
        bgImage="https://tinyurl.com/2yb9pjbk"
        title="Register Now!"
        subtitle=" Take the first step towards an unforgettable summer of academic
            excellence"
      />

      {/* Form Section */}
      <section className="py-12 sm:py-16 bg-background">
        <div className="container mx-auto px-5 sm:px-8">
          <Card className="max-w-3xl mx-auto px-0 sm:px-8 py-4">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl">Register Here</CardTitle>
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
                  {/* Parent/Guardian Information */}
                  <div className="flex flex-col gap-4">
                    <h3 className="text-xl font-semibold">
                      Parent/Guardian Information
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="parentFirstName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Parent/Guardian First Name *</FormLabel>
                            <FormControl>
                              <Input placeholder="Jane" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="parentLastName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Parent/Guardian Last Name *</FormLabel>
                            <FormControl>
                              <Input placeholder="Smith" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

                      <FormField
                        control={form.control}
                        name="parentPhone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>
                              Parent/Guardian Phone Number *
                            </FormLabel>
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
                  </div>

                  {/* Student Information */}
                  <div>
                    <h3 className="text-xl font-semibold mb-4">
                      Student Information
                    </h3>

                    <div className="mt-4">
                      <FormField
                        control={form.control}
                        name="studentAge"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Age Group *</FormLabel>
                            <Select
                              onValueChange={(value) => {
                                field.onChange(value);
                                form.trigger(); // Force validation after select change
                              }}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select age group" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="9-12">9-12 years</SelectItem>
                                <SelectItem value="13-17">
                                  13-17 years
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
                        name="programmeLocation"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Preferred Location *</FormLabel>
                            <Select
                              onValueChange={(value) => {
                                field.onChange(value);
                                form.trigger(); // Force validation after select change
                              }}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select location" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="norfolk">Norfolk</SelectItem>
                                <SelectItem value="canterbury">
                                  Canterbury
                                </SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="subjectInterest"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Subject Interest *</FormLabel>
                            <Select
                              onValueChange={(value) => {
                                field.onChange(value);
                                form.trigger(); // Force validation after select change
                              }}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select subject" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="sports">Sports</SelectItem>
                                <SelectItem value="enterprise">
                                  Enterprise
                                </SelectItem>
                                <SelectItem value="media">Media</SelectItem>
                                <SelectItem value="technology">
                                  Technology
                                </SelectItem>
                              </SelectContent>
                            </Select>
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
                      name="whereHearAboutUs"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Where did you hear about us? *</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Where did you hear about us"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="whyOurProgramme"
                      render={({ field }) => (
                        <FormItem className="mt-4">
                          <FormLabel>
                            Why do you want to attend our programme (optional)?
                          </FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Tell us why you want to attend our program"
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
                      isDisabled={!form.formState.isValid}
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
