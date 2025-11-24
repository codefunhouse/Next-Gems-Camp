"use client";
import CircularCancel from "@/components/svgs/CircularCancel";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { twMerge } from "tailwind-merge";
import { formData, formTabs } from "./formData";

const ApplyForm = ({
  onClick,
  activeTab = 0,
  setActiveTab,
}: {
  onClick?: () => void;
  activeTab?: number;
  setActiveTab?: (val: number) => void;
}) => {
  // const [activeTab, setActiveTab] = useState<number | undefined>(formType || 0);

  const currentForm = formData[activeTab as number];

  return (
    <div className="relative mt-5">
      <Card className="w-full max-w-full sm:max-w-3xl sm:mx-auto px-0 sm:px-8 py-4 rounded-4xl max-h-[95vh] sm:max-h-[90vh]">
        <button
          className="absolute z-10 left-1/2 -translate-x-1/2 -top-5"
          onClick={onClick}
          type="button"
        >
          <CircularCancel />
        </button>
        <CardHeader className="flex flex-col gap-y-1.5 items-center text-center">
          <h5 className="font-medium!">{currentForm.title}</h5>
          <p className="text-[#16161680] max-w-[328px]">{currentForm.desc}</p>
        </CardHeader>
        {/* Tabs */}
        <div className="flex gap-2 items-center w-full max-w-screen sm:max-w-[600px] sm:mx-auto scroll-smooth noScrollbar overflow-x-auto">
          {formTabs.map((tab, idx) => (
            <button
              key={idx}
              className={twMerge(
                "border border-[#E2E2E2] rounded-full gap-1.5 py-1.5 px-4 text-base sm:text-lg flex items-center shrink-0 cursor-pointer",
                activeTab === idx &&
                  "border-blue-primary bg-[#15B1FB29] transition-all"
              )}
              onClick={() => {
                setActiveTab?.(idx);
              }}
            >
              {tab.name}
            </button>
          ))}
        </div>
        <CardContent className="">{currentForm.form}</CardContent>
      </Card>
    </div>
  );
};

export default ApplyForm;
