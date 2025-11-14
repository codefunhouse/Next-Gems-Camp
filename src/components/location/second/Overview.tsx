import { Card, CardContent } from "@/components/ui/card";

function Overview() {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold mb-6 text-center max-w-3xl mx-auto">
            Discover Sandringham: Coastal Elegance and Historic Charm
          </h2>
          <Card>
            <CardContent className="p-8">
              <p className="text-lg mb-4 whitespace-pre-line">
                {`Located on England’s stunning Norfolk coast, Sandringham and its surrounding area offer a rare combination of history, natural beauty, and refined charm. Famous for the Royal Sandringham Estate, this region blends stately elegance with scenic landscapes, from rolling countryside to pristine beaches along the North Sea.\n\nStudents can enjoy coastal walks, nature trails, and wildlife spotting while discovering charming nearby villages and historic landmarks. The area also offers opportunities for cultural excursions, sailing, and leisure activities in a safe and tranquil environment, providing a luxurious and immersive English experience where students can explore England’s heritage and coastline in style.`}
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}

export default Overview;
