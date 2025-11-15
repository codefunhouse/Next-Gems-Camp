import { Card, CardContent } from "@/components/ui/card";

interface ListItem {
  item: string;
  nestedList?: string[]; // Optional nested list for items that have sub-items
}

interface WhatToExpectCardProps {
  title: string;
  list?: ListItem[]; // List as array of objects with item field
  description?: string;
  lowerDescription?: string;
  subsections?: { title: string; list: ListItem[] }[]; // Subsections with title and array of ListItem objects
  className?: string;
}

// Recursive component for rendering nested lists
function NestedList({ items }: { items: ListItem[] }) {
  return (
    <ul className="space-y-2 text-muted-foreground list-disc list-inside pl-4">
      {items.map((listItem, itemIdx) => (
        <li key={itemIdx}>
          {listItem.item}
          {/* Render nested list if it exists */}
          {listItem.nestedList && listItem.nestedList.length > 0 && (
            <ul className="mt-2 space-y-1 list-circle list-inside pl-6">
              {listItem.nestedList.map((nestedItem, nestedIdx) => (
                <li key={nestedIdx}>{nestedItem}</li>
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
  description,
  lowerDescription,
  subsections,
  className = "",
}: WhatToExpectCardProps) {
  return (
    <Card className={`border-0 shadow-none bg-transparent ${className}`}>
      <CardContent className="p-6 flex flex-col gap-4">
        <h3 className="text-center">{title}</h3>
        {description && <p className="text-muted-foreground">{description}</p>}

        {/* Main list (if no subsections) */}
        {list && !subsections && <NestedList items={list} />}

        {/* Subsections */}
        {subsections && (
          <div className="space-y-6">
            {subsections.map((subsection, subIdx) => (
              <div key={subIdx} className="space-y-3">
                <h4 className="text-lg font-semibold text-gray-800">
                  {subsection.title}
                </h4>
                <NestedList items={subsection.list} />
              </div>
            ))}
          </div>
        )}

        {lowerDescription && (
          <p className="text-muted-foreground">{lowerDescription}</p>
        )}
      </CardContent>
    </Card>
  );
}

export default WhatToExpectCard;
