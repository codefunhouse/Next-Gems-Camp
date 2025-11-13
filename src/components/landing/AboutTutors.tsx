import { Card, CardContent } from "@/components/ui/card";
const tutors = [
  {
    name: "Dr. Amanda H",
    credentials: "DPhil Literature, University of Oxford",
    description:
      "Specializes in Medieval English literature and poetry. Published author with extensive teaching experience.",
    image:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&h=150&fit=crop",
  },
  {
    name: "Dr. Kieron W",
    credentials: "DPhil English Literature, University of Oxford",
    description:
      "Award-winning poet and creative writing specialist. Former poet in residence at prestigious institutions.",
    image:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop",
  },
  {
    name: "Prof. Sarah M",
    credentials: "PhD Physics, University of Cambridge",
    description:
      "Research physicist with 15 years of teaching experience. Published extensively in quantum mechanics.",
    image:
      "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=150&h=150&fit=crop",
  },
];

function AboutTutors() {
  return (
    <section className="py-20 bg-muted">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-6">
          Exceptional Tutors
        </h2>
        <p className="text-center text-lg text-muted-foreground mb-12 max-w-3xl mx-auto">
          Our tutors are expert academics, passionate about their subjects, and
          here to guide you towards success.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {tutors.map((tutor, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6 text-center">
                <img
                  src={tutor.image}
                  alt={tutor.name}
                  className="w-32 h-32 rounded-full object-cover mx-auto mb-4"
                />
                <h3 className="text-xl font-semibold mb-2">{tutor.name}</h3>
                <p className="text-sm text-primary mb-3">{tutor.credentials}</p>
                <p className="text-muted-foreground">{tutor.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

export default AboutTutors;
