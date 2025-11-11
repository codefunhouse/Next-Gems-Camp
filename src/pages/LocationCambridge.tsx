import Footer from "@/components/Footer";
import Activities from "@/components/location/first/Activities";
import Courses from "@/components/location/first/Courses";
import HeroSection from "@/components/location/first/HeroSection";
import Highlights from "@/components/location/first/Highlights";
import LocationCTASection from "@/components/location/first/LocationCTASection";
import Overview from "@/components/location/first/Overview";
import TravelSection from "@/components/location/first/TravelSection";
import Navbar from "@/components/Navbar";

const LocationCambridge = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Hero Section */}
      <HeroSection />

      {/* Overview Section */}
      <Overview />

      {/* Highlights Section */}
      <Highlights />

      {/* Courses Section */}
      <Courses />

      {/* Activities Section */}
      <Activities />

      {/* Travel Section */}
      <TravelSection />
      {/* CTA Section */}
      <LocationCTASection />

      <Footer />
    </div>
  );
};

export default LocationCambridge;
