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
      <CardContent className="p-0 w-full max-w-[300px]">
        {/* Image with fixed width and height */}
        <img
          src={imageUrl}
          alt={alt}
          width={500} // Fixed width
          height={500} // Fixed height
          className="object-cover rounded-md aspect-square w-full h-full"
        />
      </CardContent>
    </Card>
  );
}

export default ImageContentCard;
