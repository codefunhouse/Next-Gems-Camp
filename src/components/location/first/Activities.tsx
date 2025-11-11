import { Card, CardContent } from "@/components/ui/card";

function Activities() {
  return (
    <section className="py-20 bg-muted">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12">
          Activities & Excursions
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold mb-4 text-primary">
                Cultural Activities
              </h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>• Punting on the River Cam</li>
                <li>• Visit to King's College Chapel</li>
                <li>• Fitzwilliam Museum tour</li>
                <li>• Mathematical Bridge exploration</li>
                <li>• Trinity College Library visit</li>
                <li>• Cambridge market shopping</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold mb-4 text-primary">
                Day Trips
              </h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>• London sightseeing and museums</li>
                <li>• Ely Cathedral visit</li>
                <li>• Imperial War Museum Duxford</li>
                <li>• Wimpole Estate country house</li>
                <li>• Grafham Water outdoor activities</li>
                <li>• Historic Bury St Edmunds</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}

export default Activities;
