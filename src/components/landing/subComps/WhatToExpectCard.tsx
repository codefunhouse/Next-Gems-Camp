import StarTickIcon from "@/components/svgs/StarTickIcon";
import { twMerge } from "tailwind-merge";

interface ListItem {
  item: string;
  nestedList?: { item: string }[]; // Optional nested list for items that have sub-items
}

interface WhatToExpectCardProps {
  title: string;
  list?: ListItem[]; // List as array of objects with item field
  description?: string;
  lowerDescription?: string;
  subsections?: { title: string; list: ListItem[] }[]; // Subsections with title and array of ListItem objects
  className?: string;
  headingStyles?: string;
}

// Recursive component for rendering nested lists
function NestedList({ items }: { items: ListItem[] }) {
  return (
    <ul className="space-y-2 list-none list-inside pl-4 text-base sm:text-lg">
      {items.map((listItem, itemIdx) => (
        <li key={itemIdx}>
          <p className="flex items-center gap-1.5">
            <StarTickIcon />
            {listItem.item}
          </p>
          {/* Render nested list if it exists */}
          {listItem.nestedList && listItem.nestedList.length > 0 && (
            <ul className="mt-2 space-y-1 list-disc pl-12">
              {listItem.nestedList.map((nestedItem, nestedIdx) => (
                <li key={nestedIdx}>{nestedItem.item}</li>
              ))}
            </ul>
          )}
        </li>
      ))}
    </ul>
  );
}

function WhatToExpectCard({
  title,
  list,
  subsections,
  className = "",
  headingStyles,
}: WhatToExpectCardProps) {
  return (
    <div
      className={twMerge("flex flex-col gap-4 w-full max-w-[502px]", className)}
    >
      <h1 className={twMerge("text-center sm:text-left", headingStyles)}>
        {title}
      </h1>

      {/* Main list (if no subsections) */}
      {list && !subsections && <NestedList items={list} />}
    </div>
  );
}

export default WhatToExpectCard;
