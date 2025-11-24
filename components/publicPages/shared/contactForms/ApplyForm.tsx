"use client";
import CircularCancel from "@/components/svgs/CircularCancel";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useState } from "react";
import { twMerge } from "tailwind-merge";
import { formData, formTabs } from "./formData";

const ApplyForm = ({ onClick }: { onClick?: () => void }) => {
  const [activeTab, setActiveTab] = useState<number>(0);

  const currentForm = formData[activeTab as number];

  return (
    <div className="relative mt-5 w-full">
      <Card className="w-[90vw] sm:w-[80vw] md:w-[50vw] mx-auto px-0 md:px-8 py-6 gap-3 rounded-4xl max-h-[95vh] sm:max-h-[90vh] overflow-hidden">
        <button
          className="absolute z-10 left-1/2 -translate-x-1/2 -top-5"
          onClick={onClick}
          type="button"
        >
          <CircularCancel />
        </button>
        <CardHeader className="flex flex-col gap-y-2 items-center text-center mt-4">
          <h5 className="font-medium!">{currentForm.title}</h5>
          <p className="text-[#16161680] max-w-[328px]">{currentForm.desc}</p>
        </CardHeader>
        {/* Tabs */}
        <div className="flex items-center gap-3 mx-auto">
          {formTabs.map((tab, idx) => (
            <button
              key={idx}
              className={twMerge(
                "border border-[#E2E2E2] rounded-full gap-1.5 py-1 px-4 text-sm flex items-center shrink-0 cursor-pointer",
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
        <CardContent className="pb-16">{currentForm.form}</CardContent>
      </Card>
    </div>
  );
};

export default ApplyForm;
