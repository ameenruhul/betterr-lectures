import { Button } from "@/components/ui/button";
import { GraduationCap } from "lucide-react";
import { Link } from "react-router-dom";

export const Navbar = () => {
  return (
    <nav className="border-b bg-white">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center space-x-2">
          <GraduationCap className="h-8 w-8 text-primary" />
          <span className="text-xl font-bold">Better Classes</span>
        </div>
        <div className="flex items-center space-x-4">
          <Link to="#" className="text-sm text-gray-500 hover:text-gray-900">
            Features
          </Link>
          <Link to="#" className="text-sm text-gray-500 hover:text-gray-900">
            Pricing
          </Link>
          <Button size="sm">Get Started</Button>
        </div>
      </div>
    </nav>
  );
};