const stats = [
  { number: "15+", label: "Years of Excellence" },
  { number: "40+", label: "Academic Subjects" },
  { number: "100+", label: "Countries Represented" },
  { number: "95%", label: "Satisfaction Rate" },
];

function StatSection() {
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-primary mb-2">
                {stat.number}
              </div>
              <div className="text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default StatSection;
