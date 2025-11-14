import { Card, CardContent } from "@/components/ui/card";

function WhatToExpect() {
  return (
    <section className="py-20 bg-muted">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12">What to Expect</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-2xl font-semibold mb-4 text-primary">
                Before Arrival
              </h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>• Comprehensive pre-arrival information pack</li>
                <li>• Welcome call to address any concerns</li>
                <li>• Packing list and travel arrangements</li>
                <li>• Medical and dietary requirements confirmation</li>
                <li>• Emergency contact procedures</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-2xl font-semibold mb-4 text-primary">
                During the Program
              </h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>• Daily academic sessions with expert tutors</li>
                <li>• Structured social and recreational activities</li>
                <li>• Educational excursions and cultural visits</li>
                <li>• Regular welfare checks and support</li>
                <li>• Photo updates on social media channels</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-2xl font-semibold mb-4 text-primary">
                Communication
              </h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>• 24/7 emergency contact line for parents</li>
                <li>• Weekly progress reports from tutors</li>
                <li>• Photo galleries of activities and excursions</li>
                <li>• Direct communication with welfare team</li>
                <li>• End-of-program certificates and feedback</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-2xl font-semibold mb-4 text-primary">
                After the Program
              </h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>• Detailed academic report and assessment</li>
                <li>• Certificate of completion</li>
                <li>• University application guidance if requested</li>
                <li>• Alumni network access</li>
                <li>• Feedback survey and testimonials</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}

export default WhatToExpect;
