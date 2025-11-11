import { Card, CardContent } from "@/components/ui/card";

function Overview() {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold mb-6 text-center">
            The Oxford Experience
          </h2>
          <Card>
            <CardContent className="p-8">
              <p className="text-lg mb-4">
                Oxford has been a center of academic excellence for over 900
                years. Our summer programs allow students to experience life at
                one of the world's most prestigious universities, studying in
                historic college buildings and learning from Oxford tutors.
              </p>
              <p className="text-lg mb-4">
                Students stay in authentic Oxford college accommodation, dine in
                historic dining halls, and enjoy the unique traditions of Oxford
                student life. The city itself is a living classroom, with
                world-class museums, libraries, and architectural wonders at
                every turn.
              </p>
              <p className="text-lg">
                Beyond academics, students explore Oxford's rich cultural
                heritage, from punting on the river to visiting the famous
                Bodleian Library and Ashmolean Museum. Weekend excursions to
                London, Stratford-upon-Avon, and other historic sites complete
                the experience.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}

export default Overview;
