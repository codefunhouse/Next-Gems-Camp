import { Card, CardContent } from "@/components/ui/card";

interface ListItem {
  text: string;
  nestedList?: ListItem[];
}

interface Subsection {
  title: string;
  list: ListItem[];
}

interface WhatToExpectCardProps {
  title: string;
  list?: ListItem[];
  description?: string;
  subsections?: Subsection[];
  className?: string;
}

// Recursive component for rendering nested lists
function NestedList({ items }: { items: ListItem[] }) {
  return (
    <ul className="space-y-2 text-muted-foreground list-disc list-inside pl-4">
      {items.map((item, itemIdx) => (
        <li key={itemIdx}>
          {item.text}
          {item.nestedList && (
            <div className="pl-6 mt-2">
              <NestedList items={item.nestedList} />
            </div>
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
  subsections,
  className = "",
}: WhatToExpectCardProps) {
  return (
    <Card className={`border-0 shadow-md ${className}`}>
      <CardContent className="p-6 flex flex-col gap-4">
        <h3 className="text-2xl font-semibold">{title}</h3>
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
      </CardContent>
    </Card>
  );
}

export default WhatToExpectCard;
