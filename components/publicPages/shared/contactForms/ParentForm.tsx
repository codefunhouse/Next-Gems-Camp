"use client";
import Button from "@/components/general/Button";
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
import { useState } from "react";
import { useForm } from "react-hook-form";
import { parentFormSchema, ParentType } from "./schemas";

function ParentForm() {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { toast } = useToast();

  const form = useForm<ParentType>({
    resolver: zodResolver(parentFormSchema),
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

  const contactUsUrl = process.env.NEXT_PUBLIC_CONTACT_URL || "";

  const onSubmit = async (values: ParentType) => {
    setIsLoading(true);
    try {
      const response = await fetch(`${contactUsUrl}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error(`An unknown error occurred!`);
      }

      const actualData = await response.json();

      if (!actualData?.success) {
        throw new Error(`Something went wrong`);
      }

      toast({
        title: "Application Submitted!",
        description:
          "We'll review your application and contact you within 3 business days.",
      });

      setIsLoading(false);
      form.reset();
    } catch (error) {
      console.error("Error:", error);
      let errorMessage;
      if (error instanceof Error) {
        errorMessage = error?.message;
      } else {
        errorMessage = error as string;
      }
      toast({
        title: "Application Error",
        description: errorMessage,
        variant: "destructive",
      });
      setIsLoading(false);
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="space-y-8 max-h-[50vh] overflow-y-auto customScrollbar py-3 px-1">
          {/* Parent/Guardian Information */}
          <div className="flex flex-col gap-5">
            <p className="text-base sm:text-lg pb-[0.9rem] border-b border-b-[#EDEDED] font-medium">
              Parent/Guardian Information
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <FormField
                control={form.control}
                name="parentFirstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm">
                      Parent/Guardian First Name *
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="rounded-xl py-3 px-4"
                        placeholder="Jane"
                        {...field}
                      />
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
                    <FormLabel className="text-sm">
                      Parent/Guardian Last Name *
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="rounded-xl py-3 px-4"
                        placeholder="Smith"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <FormField
                control={form.control}
                name="parentEmail"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm">
                      Parent/Guardian Email *
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="rounded-xl py-3 px-4"
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
                    <FormLabel className="text-sm">
                      Parent/Guardian Phone Number *
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="rounded-xl py-3 px-4"
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
            <p className="text-base sm:text-lg pb-[0.9rem] border-b border-b-[#EDEDED] font-medium mb-4">
              Student Information
            </p>

            <div className="mt-5">
              <FormField
                control={form.control}
                name="studentAge"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm">Age Group *</FormLabel>
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
                        <SelectItem value="13-17">13-17 years</SelectItem>
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
            <p className="text-base sm:text-lg pb-[0.9rem] border-b border-b-[#EDEDED] font-medium mb-4">
              Program Selection
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <FormField
                control={form.control}
                name="programmeLocation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm">
                      Preferred Location *
                    </FormLabel>
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
                        <SelectItem value="canterbury">Canterbury</SelectItem>
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
                    <FormLabel className="text-sm">
                      Subject Interest *
                    </FormLabel>
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
                        <SelectItem value="enterprise">Enterprise</SelectItem>
                        <SelectItem value="media">Media</SelectItem>
                        <SelectItem value="technology">Technology</SelectItem>
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
            <p className="text-base sm:text-lg pb-[0.9rem] border-b border-b-[#EDEDED] font-medium mb-4">
              Additional Information
            </p>
            <FormField
              control={form.control}
              name="whereHearAboutUs"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm">
                    Where did you hear about us? *
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="rounded-xl py-3 px-4"
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
                  <FormLabel className="text-sm">
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
        </div>

        <div className="flex gap-5 mt-8">
          <Button
            label=" Submit Application"
            classNames="max-w-[180px] mx-auto"
            isDisabled={!form.formState.isValid}
            type="submit"
            isLoading={isLoading}
          />
        </div>
      </form>
    </Form>
  );
}

export default ParentForm;
