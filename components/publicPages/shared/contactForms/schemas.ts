import * as z from "zod";

export const parentFormSchema = z.object({
  parentName: z
    .string()
    .min(2, "Parent name must be at least 2 characters")
    .max(100, "Parent name must be less than 100 characters"),
  email: z
    .string()
    .email("Invalid email address")
    .max(255, "Email must be less than 255 characters"),
  phone: z
    .string()
    .min(10, "Phone number must be at least 10 characters")
    .max(15, "Phone number must be less than 15 characters"),
  homeCountryAddress: z
    .string()
    .min(5, "Address must be at least 5 characters")
    .max(500, "Address must be less than 500 characters"),

  location: z.string().min(1, "Please select a location"),
  programme: z.string().min(1, "Please select a programme"),
  datesInterested: z
    .array(z.string())
    .min(1, "Please select at least one date"),

  referralSource: z
    .string()
    .max(500, "Response must be less than 500 characters")
    .optional()
    .or(z.literal("")),

  childAgeGroups: z
    .array(z.string())
    .min(1, "Please select at least one age group"),
  childrenNames: z
    .string()
    .min(2, "Children names must be at least 2 characters")
    .max(200, "Children names must be less than 200 characters"),
  childCount: z
    .string()
    .min(1, "Child count is required")
    .regex(/^\d+$/, "Child count must be a valid number")
    .refine((val) => {
      const num = parseInt(val);
      return num >= 1 && num <= 20;
    }, "Child count must be between 1 and 20"),
});

export type ParentType = z.infer<typeof parentFormSchema>;

export const agentFormSchema = z.object({
  agentName: z
    .string()
    .min(2, "Agent name must be at least 2 characters")
    .max(100, "Agent name must be less than 100 characters"),
  email: z
    .string()
    .email("Invalid email address")
    .max(255, "Email must be less than 255 characters"),
  phone: z
    .string()
    .min(10, "Phone number must be at least 10 characters")
    .max(15, "Phone number must be less than 15 characters"),
  homeCountryAddress: z
    .string()
    .min(5, "Address must be at least 5 characters")
    .max(500, "Address must be less than 500 characters"),

  location: z.string().min(1, "Please select a location"),
  programme: z.string().min(1, "Please select a programme"),
  datesInterested: z
    .array(z.string())
    .min(1, "Please select at least one date"),

  referralSource: z
    .string()
    .max(500, "Response must be less than 500 characters")
    .optional()
    .or(z.literal("")),

  studentAgeGroups: z
    .array(z.string())
    .min(1, "Please select at least one age group"),
  companyName: z
    .string()
    .min(2, "Company name must be at least 2 characters")
    .max(100, "Company name must be less than 100 characters"),
  studentCount: z
    .string()
    .min(1, "Student count is required")
    .regex(/^\d+$/, "Student count must be a valid number")
    .refine((val) => {
      const num = parseInt(val);
      return num >= 1 && num <= 100;
    }, "Student count must be between 1 and 100"),
});

export type AgentFormValues = z.infer<typeof agentFormSchema>;

export type AgentType = z.infer<typeof agentFormSchema>;
