import { z } from "zod";

// Common validations that can be reused
const phoneRegex = /^\+?[1-9]\d{1,14}$/; // E.164 format: + followed by 1-15 digits
const nameRegex = /^[a-zA-Z\s\-'.]+$/;
const digitsOnlyRegex = /^\d+$/;

// Common schema parts
const commonFields = {
  email: z
    .string()
    .min(1, "Email address is required")
    .max(255, "Email must be less than 255 characters")
    .email("Please enter a valid email address")
    .transform((val) => val.trim().toLowerCase()),

  phone: z
    .string()
    .min(1, "Phone number is required")
    .max(20, "Phone number must be less than 20 characters")
    .refine((val) => {
      const cleaned = val.trim().replace(/[\s\-\(\)]/g, "");
      return phoneRegex.test(cleaned);
    }, "Please enter a valid phone number with country code (e.g., +1234567890)")
    .transform((val) => val.trim()),

  homeCountryAddress: z
    .string()
    .min(1, "Home country address is required")
    .min(5, "Address must be at least 5 characters long")
    .max(500, "Address must be less than 500 characters")
    .refine(
      (val) => !/(<script|javascript:|onload=|onerror=)/i.test(val),
      "Address contains invalid characters"
    )
    .transform((val) => val.trim()),

  location: z
    .string()
    .min(1, "Please select a location")
    .refine(
      (val) => ["norfolk", "canterbury"].includes(val),
      "Please select a valid location"
    ),

  programme: z
    .string()
    .min(1, "Please select a programme")
    .refine(
      (val) => ["enterprise", "sports", "media", "technology"].includes(val),
      "Please select a valid programme"
    ),

  datesInterested: z
    .array(z.string())
    .min(1, "Please select at least one date")
    .refine((dates) => {
      const validDates = [
        "6th Jul 2026 - 20th Jul 2026, Cycle 1",
        "20th Jul 2026 - 3rd Aug 2026, Cycle 2",
        "3rd Aug 2026 - 17th Aug 2026, Cycle 3",
      ];
      return dates.every((date) => validDates.includes(date));
    }, "Please select valid dates"),

  referralSource: z
    .string()
    .max(500, "Response must be less than 500 characters")
    .refine(
      (val) => !/(<script|javascript:|onload=|onerror=)/i.test(val),
      "Input contains invalid characters"
    )
    .or(z.literal(""))
    .transform((val) => val?.trim() || "")
    .optional(),
};

// Age group validation
const ageGroupSchema = z
  .array(z.string())
  .min(1, "Please select at least one age group")
  .refine((ages) => {
    const validAges = ["9-11", "12-14", "15-17"];
    return ages.every((age) => validAges.includes(age));
  }, "Please select valid age groups");

// Parent Form Schema
export const parentFormSchema = z.object({
  parentName: z
    .string()
    .min(1, "Parent name is required")
    .min(2, "Parent name must be at least 2 characters")
    .max(100, "Parent name must be less than 100 characters")
    .refine(
      (val) => nameRegex.test(val.trim()),
      "Parent name can only contain letters, spaces, hyphens, apostrophes, and periods"
    )
    .transform((val) => val.trim()),

  ...commonFields,

  childAgeGroups: ageGroupSchema,

  childrenNames: z
    .string()
    .min(1, "Children names are required")
    .min(2, "Children names must be at least 2 characters")
    .max(200, "Children names must be less than 200 characters")
    .refine(
      (val) => !/(<script|javascript:|onload=|onerror=)/i.test(val),
      "Names contain invalid characters"
    )
    .transform((val) => val.trim()),

  childCount: z
    .string()
    .min(1, "Child count is required")
    .refine(
      (val) => digitsOnlyRegex.test(val.trim()),
      "Child count must be a valid number"
    )
    .refine((val) => {
      const count = parseInt(val.trim());
      return count >= 1 && count <= 20;
    }, "Child count must be between 1 and 20")
    .transform((val) => val.trim()),
});

// Agent Form Schema
export const agentFormSchema = z.object({
  agentName: z
    .string()
    .min(1, "Agent name is required")
    .min(2, "Agent name must be at least 2 characters")
    .max(100, "Agent name must be less than 100 characters")
    .refine(
      (val) => nameRegex.test(val.trim()),
      "Agent name can only contain letters, spaces, hyphens, apostrophes, and periods"
    )
    .transform((val) => val.trim()),

  ...commonFields,

  studentAgeGroups: ageGroupSchema,

  companyName: z
    .string()
    .min(1, "Company name is required")
    .min(2, "Company name must be at least 2 characters")
    .max(100, "Company name must be less than 100 characters")
    .refine(
      (val) => !/(<script|javascript:|onload=|onerror=)/i.test(val),
      "Company name contains invalid characters"
    )
    .transform((val) => val.trim()),

  studentCount: z
    .string()
    .min(1, "Student count is required")
    .refine(
      (val) => digitsOnlyRegex.test(val.trim()),
      "Student count must be a valid number"
    )
    .refine((val) => {
      const count = parseInt(val.trim());
      return count >= 1 && count <= 100;
    }, "Student count must be between 1 and 100")
    .transform((val) => val.trim()),
});

// Combined schema with type discrimination
export const formSchema = z.discriminatedUnion("type", [
  z.object({
    type: z.literal("parent"),
    ...parentFormSchema.shape,
  }),
  z.object({
    type: z.literal("agent"),
    ...agentFormSchema.shape,
  }),
]);

// Type inference
export type ParentFormValues = z.infer<typeof parentFormSchema>;
export type AgentFormValues = z.infer<typeof agentFormSchema>;
export type FormValues = z.infer<typeof formSchema>;

// Default values
export const parentDefaultValues: ParentFormValues = {
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
};

export const agentDefaultValues: AgentFormValues = {
  agentName: "",
  email: "",
  phone: "",
  homeCountryAddress: "",
  location: "",
  programme: "",
  datesInterested: [],
  referralSource: "",
  studentAgeGroups: [],
  companyName: "",
  studentCount: "1",
};
