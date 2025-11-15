import { Card, CardContent } from "@/components/ui/card";

interface ImageContentCardProps {
  imageUrl: string;
  alt: string;
  className?: string;
}

function ImageContentCard({
  imageUrl,
  alt,
  className = "",
}: ImageContentCardProps) {
  return (
    <Card className={`border-0 shadow-md ${className}`}>
      <CardContent className="p-0 w-full max-w-[400px]">
        {/* Image with fixed width and height */}
        <img
          src={imageUrl}
          alt={alt}
          width={500} // Fixed width
          height={400} // Fixed height
          className="object-cover rounded-md aspect-[500/400] w-full h-full"
        />
      </CardContent>
    </Card>
  );
}

export default ImageContentCard;
