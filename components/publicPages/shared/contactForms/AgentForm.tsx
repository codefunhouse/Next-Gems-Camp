"use client";
import Button from "@/components/general/Button";
import { CustomPhoneInput } from "@/components/general/formInputs/CustomPhoneInput";
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
import {
  ageOptions,
  dateOptions,
  locationOptions,
  programmeOptions,
} from "./formData";
import { commonGroupStyle, commonSectionStyles } from "./ParentForm";
import {
  agentDefaultValues,
  agentFormSchema,
  AgentFormValues,
} from "./schemas";

function AgentForm() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showDiscountPopup, setShowDiscountPopup] = useState<boolean>(false);

  const { toast } = useToast();

  const form = useForm<AgentFormValues>({
    resolver: zodResolver(agentFormSchema),
    defaultValues: agentDefaultValues,
  });

  const contactUsUrl = process.env.NEXT_PUBLIC_CONTACT_URL || "";

  const onSubmit = async (values: AgentFormValues) => {
    setIsLoading(true);
    try {
      const response = await fetch(`${contactUsUrl}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...values, type: "agent" }),
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
    subLabel,
  }: {
    label: string;
    subLabel?: string;
    required?: boolean;
    className?: string;
  }) => (
    <FormLabel className={twMerge("text-sm", className)}>
      {label}
      {subLabel && <span className="text-xs italic">{subLabel}</span>}
      {required && <span className="text-red-500">*</span>}
    </FormLabel>
  );

  const renderGroupLabel = ({
    label,
    className,
    showInfo,
  }: {
    label: string;
    className?: string;
    showInfo?: boolean;
  }) => (
    <div
      className={twMerge(
        "text-base sm:text-lg pb-[0.9rem] border-b border-b-[#EDEDED] font-medium mb-4 flex items-center gap-2",
        className
      )}
    >
      <p>{label}</p>
      {showInfo && (
        <div className="relative shrink-0">
          <span className="bg-blue-100 text-blue-600 w-6 h-6 rounded-full text-sm flex items-center justify-center hover:bg-blue-200 transition-colors font-bold italic">
            i
          </span>

          {showDiscountPopup && (
            <p className="absolute left-full bottom-full w-52 px-2 py-2 bg-black/90 text-white rounded-lg text-xs">
              We offer a discount for 10 or more students.
            </p>
          )}
        </div>
      )}
    </div>
  );

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="space-y-8 max-h-[60vh] overflow-y-auto customScrollbar py-3 px-3">
          {/* Agent Information */}
          <div className={twMerge(commonSectionStyles)}>
            {renderGroupLabel({ label: "Agent Information" })}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <FormField
                control={form.control}
                name="agentName"
                render={({ field }) => (
                  <FormItem>
                    {renderLabel({ label: "Name of Agent" })}
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
                      label: " Agent Email",
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
                    {renderLabel({ label: "Agent Phone Number" })}
                    <FormControl>
                      <CustomPhoneInput
                        {...field}
                        onChange={(val) => field.onChange(val)}
                        placeholder="Enter Phone Number"
                      />
                      {/* <Input
                        className="rounded-xl py-3 px-4"
                        placeholder="+44 20 1234 5678"
                        {...field}
                      /> */}
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
                      <Input placeholder="5, London Street" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className={commonSectionStyles}>
              <FormField
                control={form.control}
                name="companyName"
                render={({ field }) => (
                  <FormItem>
                    {renderLabel({
                      label: "Company/School Name",
                    })}

                    <Input className="" placeholder="Mark Edu Inc" {...field} />
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          {/* Student Information */}
          <div
            className={twMerge(commonSectionStyles)}
            onMouseEnter={() => {
              setShowDiscountPopup(true);
            }}
            onMouseLeave={() => {
              setShowDiscountPopup(false);
            }}
          >
            {renderGroupLabel({
              label: "Student Information",
              showInfo: true,
            })}

            <div className={twMerge("", commonGroupStyle)}>
              <FormField
                control={form.control}
                name="studentAgeGroups"
                render={({ field }) => (
                  <FormItem>
                    {renderLabel({
                      label: "Age(s) of Student(s)",
                      subLabel: "(select all that apply)",
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
                name="studentCount"
                render={({ field }) => (
                  <FormItem>
                    {renderLabel({
                      label: "Number of students interested",
                    })}

                    <Input className="" placeholder="0" {...field} />
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          {/* Program Infomation */}
          <div className={twMerge(commonSectionStyles)}>
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
                      options={dateOptions}
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
          <div className={twMerge(commonSectionStyles)}>
            {renderGroupLabel({
              label: "Additional Information",
            })}
            <div className={twMerge("", commonGroupStyle)}>
              <FormField
                control={form.control}
                name="referralSource"
                render={({ field }) => (
                  <FormItem className="col-span-2">
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

          {/* Button */}
          <div className="flex gap-5 mt-8">
            <Button
              label=" Submit Application"
              classNames="max-w-[180px] mx-auto"
              isDisabled={!form.formState.isValid}
              type="submit"
              isLoading={isLoading}
            />
          </div>
        </div>
      </form>
    </Form>
  );
}

export default AgentForm;
