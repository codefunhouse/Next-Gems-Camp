import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { GraduationCap } from "lucide-react";

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-secondary/95 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2 text-secondary-foreground hover:text-primary transition-colors">
            <GraduationCap className="h-8 w-8 text-primary" />
            <span className="font-bold text-xl">Elite Summer Academy</span>
          </Link>
          
          <div className="hidden md:flex items-center gap-6">
            <Link to="/" className="text-secondary-foreground hover:text-primary transition-colors">Home</Link>
            <Link to="/locations/oxford" className="text-secondary-foreground hover:text-primary transition-colors">Locations</Link>
            <Link to="/about" className="text-secondary-foreground hover:text-primary transition-colors">Why Us</Link>
            <Link to="/parents" className="text-secondary-foreground hover:text-primary transition-colors">Info for Parents</Link>
            <Link to="/apply">
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">Apply Now</Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
