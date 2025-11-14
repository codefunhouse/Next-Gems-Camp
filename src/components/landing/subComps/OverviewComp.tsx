import { Card, CardContent } from "@/components/ui/card";

interface OverviewCompProps {
  title: string;
  content: string;
  className?: string;
  cardClassName?: string;
}

function OverviewComp({
  title,
  content,
  className = "",
  cardClassName = "",
}: OverviewCompProps) {
  return (
    <section className={`py-20 bg-background ${className}`}>
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold mb-6 text-center max-w-3xl mx-auto">
            {title}
          </h2>
          <Card className={cardClassName}>
            <CardContent className="p-8 w-full">
              <p className="text-lg mb-4 whitespace-pre-line break-words">
                {content}
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}

export default OverviewComp;
