import { Card, CardContent } from "@/components/ui/card";

function Overview() {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold mb-6 text-center">
            The Cambridge Experience
          </h2>
          <Card>
            <CardContent className="p-8">
              <p className="text-lg mb-4">
                Cambridge University has produced more Nobel Prize winners than
                any other institution in the world. Our summer programs offer
                students the extraordinary opportunity to study at this iconic
                university, immersing themselves in its rich academic
                traditions.
              </p>
              <p className="text-lg mb-4">
                Students live in historic college buildings, many dating back
                centuries, and participate in the time-honored Cambridge
                traditions. Small group tutorials—Cambridge's signature teaching
                method—encourage critical thinking and in-depth discussion with
                expert tutors.
              </p>
              <p className="text-lg">
                The compact city center means everything is within easy reach.
                Students can punt along the River Cam, explore world-class
                museums, attend evensong at King's College Chapel, and cycle
                through the picturesque streets just like generations of
                Cambridge students before them.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}

export default Overview;
