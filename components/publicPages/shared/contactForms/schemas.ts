import * as z from "zod";

export const parentFormSchema = z.object({
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

export type ParentType = z.infer<typeof parentFormSchema>;

export const agentFormSchema = z.object({
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

export type AgentType = z.infer<typeof agentFormSchema>;
