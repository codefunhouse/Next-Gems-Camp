import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import Button from "../general/Button";

function HeroSection() {
  const [age, setAge] = useState("15");
  const [subject, setSubject] = useState("");
  const [location, setLocation] = useState("");
  return (
    <section className="relative py-20 flex items-center justify-center bg-gradient-to-br from-hero-start to-hero-end text-white">
      <div
        className="absolute inset-0 opacity-20 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1562774053-701939374585?w=1600&h=900&fit=crop')",
        }}
      />
      <div className="relative z-10 container mx-auto px-4 text-center">
        <h1 className="font-bold mb-6 animate-fade-in">Next Gems Camp</h1>
        <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto opacity-90">
          Nurturing independent thought through award-winning exceptional
          education. Choose from over 40 subjects for ages 9-24.
        </p>

        {/* Course Finder */}
        <Card className="max-w-4xl mx-auto bg-white/95 backdrop-blur-sm">
          <CardContent className="p-6">
            <h2 className="text-2xl font-semibold mb-4 text-foreground">
              Find Your Course
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Select value={age} onValueChange={setAge}>
                <SelectTrigger>
                  <SelectValue placeholder="Age" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="9-12">9-12 years</SelectItem>
                  <SelectItem value="13-15">13-15 years</SelectItem>
                  <SelectItem value="15">15-18 years</SelectItem>
                  <SelectItem value="18-24">18-24 years</SelectItem>
                </SelectContent>
              </Select>

              <Select value={subject} onValueChange={setSubject}>
                <SelectTrigger>
                  <SelectValue placeholder="Subject" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="medicine">Medicine</SelectItem>
                  <SelectItem value="law">Law</SelectItem>
                  <SelectItem value="business">Business</SelectItem>
                  <SelectItem value="engineering">Engineering</SelectItem>
                  <SelectItem value="literature">Literature</SelectItem>
                </SelectContent>
              </Select>

              <Select value={location} onValueChange={setLocation}>
                <SelectTrigger>
                  <SelectValue placeholder="Location" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="oxford">Oxford</SelectItem>
                  <SelectItem value="cambridge">Cambridge</SelectItem>
                </SelectContent>
              </Select>

              <Button label="Search" />
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}

export default HeroSection;
