"use client";
import Button from "@/components/general/Button";
import CustomSelect, {
  SelectOption,
} from "@/components/general/formInputs/Select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { twMerge } from "tailwind-merge";
import { ageOptions, locationOptions, programmeOptions } from "./formData";
import { parentFormSchema, ParentType } from "./schemas";

function ParentForm() {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { toast } = useToast();

  const form = useForm<ParentType>({
    resolver: zodResolver(parentFormSchema),
    defaultValues: {
      parentName: "",
      email: "",
      phone: "",
      homeCountryAddress: "",

      location: "",
      programme: "",
      datesInterested: [],

      referralSource: "",

      childAgeGroups: [],
      childrenNames: "",
      childCount: "1",
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

  const renderLabel = ({
    label,
    required = true,
    className,
  }: {
    label: string;
    required?: boolean;
    className?: string;
  }) => (
    <FormLabel className={twMerge("text-sm", className)}>
      {label}
      {required && <span className="text-red-500">*</span>}
    </FormLabel>
  );

  const renderGroupLabel = ({
    label,
    className,
  }: {
    label: string;
    className?: string;
  }) => (
    <p
      className={twMerge(
        "text-base sm:text-lg pb-[0.9rem] border-b border-b-[#EDEDED] font-medium mb-4",
        className
      )}
    >
      {label}
    </p>
  );

  const commonGroupStyle = `w-full grid grid-cols-1 md:grid-cols-2 gap-5`;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="space-y-8 max-h-[50vh] overflow-y-auto customScrollbar py-3 px-1">
          {/* Parent/Guardian Information */}
          <div className="flex flex-col gap-5">
            {renderGroupLabel({ label: "Parent Information" })}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <FormField
                control={form.control}
                name="parentName"
                render={({ field }) => (
                  <FormItem>
                    {renderLabel({ label: "Name of Parent/Guardian" })}
                    <FormControl>
                      <Input className="" placeholder="Jane Smith" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    {renderLabel({
                      label: " Parent/Guardian Email",
                    })}
                    <FormControl>
                      <Input
                        className=""
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    {renderLabel({ label: "Parent/Guardian Phone Number" })}
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

              <FormField
                control={form.control}
                name="homeCountryAddress"
                render={({ field }) => (
                  <FormItem>
                    {renderLabel({
                      label: "Home Country Address",
                    })}
                    <FormControl>
                      <Input placeholder="jane@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          {/* Child Information */}
          <div>
            {renderGroupLabel({
              label: "Child Information",
            })}

            <div className={twMerge("", commonGroupStyle)}>
              <FormField
                control={form.control}
                name="childAgeGroups"
                render={({ field }) => (
                  <FormItem>
                    {renderLabel({
                      label: "Age(s) of Child(ren) (select all that apply)",
                    })}

                    <CustomSelect
                      {...field}
                      options={ageOptions}
                      placeholder="Select Ages"
                      mode="multiple"
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="childrenNames"
                render={({ field }) => (
                  <FormItem>
                    {renderLabel({
                      label: "Name(s) of Children",
                    })}

                    <Input
                      className=""
                      placeholder="Jane Smith, Mark Adams"
                      {...field}
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className={twMerge("col-span-2", commonGroupStyle)}>
              <FormField
                control={form.control}
                name="childCount"
                render={({ field }) => (
                  <FormItem>
                    {renderLabel({
                      label: "Number of children interested",
                    })}

                    <Input className="" placeholder="0" {...field} />
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          {/* Program Infomation */}
          <div>
            {renderGroupLabel({
              label: "Programme Infomation",
            })}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    {renderLabel({
                      label: "Programme Location",
                    })}

                    <CustomSelect
                      {...field}
                      options={locationOptions as SelectOption[]}
                      placeholder="Select Location"
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="programme"
                render={({ field }) => (
                  <FormItem>
                    {renderLabel({
                      label: "Programme Type",
                    })}

                    <CustomSelect
                      {...field}
                      options={programmeOptions}
                      placeholder="Select Programme"
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className={twMerge("col-span-2", commonGroupStyle)}>
              <FormField
                control={form.control}
                name="datesInterested"
                render={({ field }) => (
                  <FormItem>
                    {renderLabel({
                      label: "Interested Dates",
                    })}

                    <CustomSelect
                      {...field}
                      options={programmeOptions}
                      placeholder="Select Dates"
                      mode="multiple"
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          {/* Additional Information */}
          <div>
            {renderGroupLabel({
              label: "Additional Information",
            })}
            <div className={twMerge("col-span-2", commonGroupStyle)}>
              <FormField
                control={form.control}
                name="referralSource"
                render={({ field }) => (
                  <FormItem>
                    {renderLabel({
                      label: "Where did you hear about us?",
                      required: false,
                    })}
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
            </div>
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
