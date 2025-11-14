import { Card, CardContent } from "@/components/ui/card";

function Overview() {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold mb-6 text-center">
            Discover Canterbury: A Historic Gem in the Heart of England
          </h2>
          <Card>
            <CardContent className="p-8 w-full">
              <p className="text-lg mb-4 whitespace-pre-line">
                {`Nestled in the picturesque county of Kent, Canterbury is a city where history, culture, and elegance come together. Famous for its magnificent Canterbury Cathedral, a UNESCO World Heritage site, the city blends medieval charm with modern sophistication. Stroll along cobbled streets and explore boutique shops, artisan cafes, and gourmet restaurants.\n\nEnjoy a leisurely punt along the River Stour or relax in the city’s quaint squares and gardens. With its Roman walls, historic churches, and museums, Canterbury offers rich cultural experiences for all ages. Just a short train ride from London, the city combines accessibility with an exclusive, boutique atmosphere—perfect for families seeking a luxury cultural immersion in England.`}
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}

export default Overview;
