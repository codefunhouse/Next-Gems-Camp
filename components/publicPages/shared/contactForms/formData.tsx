import AgentForm from "./AgentForm";
import ParentForm from "./ParentForm";

export const programmeOptions = [
  { label: "Sports", value: "sports" },
  { label: "Enterprise", value: "enterprise" },
  { label: "Media", value: "media" },
  { label: "Technology", value: "technology" },
];

export const locationOptions = [
  { label: "Norfolk", value: "norfolk" },
  { label: "Canterbury", value: "canterbury" },
];

export const ageOptions = [
  { label: "9–11", value: "9-11" },
  { label: "12–14", value: "12-14" },
  { label: "15–17", value: "15-17" },
];

// optional type if you want
export type SelectOption = {
  label: string;
  value: string;
};

export const formData = [
  {
    form: <ParentForm />,
    title: "Parents Register Here!",
    desc: "  Please complete all fields. Applications are reviewed on a rolling basis.",
  },
  {
    form: <AgentForm />,
    title: "Agents Register Here!",
    desc: "  Please complete all fields. Applications are reviewed on a rolling basis.",
  },
];

export const formTabs = [
  {
    name: "Parents",
    value: "parent",
  },
  {
    name: "Agents",
    value: "agents",
  },
];
