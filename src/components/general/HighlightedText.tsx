// components/general/HighlightedText.tsx
import { createElement } from "react";

type ValidWrapperTags =
  | "p"
  | "div"
  | "span"
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6"
  | "label"
  | "strong"
  | "em";

interface HighlightItem {
  text: string;
  color?: string;
  className?: string;
}

interface HighlightedTextProps {
  text: string;
  highlights: HighlightItem[];
  defaultHighlightClass?: string;
  wrapperTag?: ValidWrapperTags;
  className?: string;
}

export function HighlightedText({
  text,
  highlights,
  defaultHighlightClass = "font-medium",
  wrapperTag = "span",
  className = "",
}: HighlightedTextProps) {
  const parts = text.split(/(\s+)/);

  const highlightedContent = parts.map((part, index) => {
    const cleanPart = part.replace(/[^\w]/g, "").toLowerCase();

    const matchedHighlight = highlights.find((highlight) => {
      const cleanHighlight = highlight.text.replace(/[^\w]/g, "").toLowerCase();
      return cleanPart === cleanHighlight && cleanPart.length > 0;
    });

    if (matchedHighlight) {
      const highlightClass =
        matchedHighlight.className || defaultHighlightClass;

      return (
        <span
          key={index}
          className={highlightClass}
          style={
            matchedHighlight.color
              ? { color: matchedHighlight.color }
              : undefined
          }
        >
          {part}
        </span>
      );
    }

    return <span key={index}>{part}</span>;
  });

  return createElement(wrapperTag, { className }, highlightedContent);
}
