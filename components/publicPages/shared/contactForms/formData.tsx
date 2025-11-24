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

export const dateOptions = [
  {
    label: "6th Jul 2026 - 20th Jul 2026, Cycle 1",
    value: "6th Jul 2026 - 20th Jul 2026, Cycle 1",
  },
  {
    label: "20th Jul 2026 - 3rd Aug 2026, Cycle 2",
    value: "20th Jul 2026 - 3rd Aug 2026, Cycle 2",
  },
  {
    label: "3rd Aug 2026 - 17th Aug 2026, Cycle 3",
    value: "3rd Aug 2026 - 17th Aug 2026, Cycle 3",
  },
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
