
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { GraduationCap, LayoutDashboard, BookOpen, Brain, Settings, Menu, X } from "lucide-react";
import { useState } from "react";

export const DashboardNav = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="h-screen flex-none w-64 bg-accent shadow-md hidden md:block">
      <div className="h-full flex flex-col">
        {/* Logo */}
        <div className="p-6 border-b">
          <div className="flex items-center space-x-2">
            <GraduationCap className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold">Better Classes</span>
          </div>
        </div>
        
        {/* Navigation Links */}
        <nav className="flex-1 p-4 space-y-2">
          <Link to="/dashboard">
            <Button variant="ghost" className="w-full justify-start gap-2 py-6 text-base">
              <LayoutDashboard className="h-5 w-5" />
              Dashboard
            </Button>
          </Link>
          <Link to="/courses">
            <Button variant="ghost" className="w-full justify-start gap-2 py-6 text-base">
              <BookOpen className="h-5 w-5" />
              Courses
            </Button>
          </Link>
          <Link to="/ai-tools">
            <Button variant="ghost" className="w-full justify-start gap-2 py-6 text-base">
              <Brain className="h-5 w-5" />
              AI Tools
            </Button>
          </Link>
          <Link to="/settings">
            <Button variant="ghost" className="w-full justify-start gap-2 py-6 text-base">
              <Settings className="h-5 w-5" />
              Settings
            </Button>
          </Link>
        </nav>
        
        {/* User Profile */}
        <div className="p-4 border-t">
          <div className="flex items-center space-x-3">
            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
              <span className="text-primary font-medium">PD</span>
            </div>
            <div>
              <p className="font-medium">Professor Davis</p>
              <p className="text-xs text-muted-foreground">Computer Science</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
