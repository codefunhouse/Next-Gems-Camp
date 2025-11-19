import { twMerge } from "tailwind-merge";

interface ContentCardProps {
  title: string;
  content: string;
  className?: string;
}

function ContentCard({ title, content, className }: ContentCardProps) {
  return (
    <div
      className={twMerge(
        "w-full max-w-[510px] flex flex-col items-center sm:items-stretch gap-3",
        className
      )}
    >
      <h2 className="max-w-[340px]">{title}</h2>
      <p className="text-base sm:text-lg whitespace-pre-line break-words">
        {content}
      </p>
    </div>
  );
}

export default ContentCard;
