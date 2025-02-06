import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { GraduationCap, LayoutDashboard, BookOpen, Brain, Settings } from "lucide-react";

export const DashboardNav = () => {
  return (
    <nav className="border-b bg-white">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center space-x-2">
          <GraduationCap className="h-8 w-8 text-primary" />
          <span className="text-xl font-bold">Better Classes</span>
        </div>
        
        <div className="hidden md:flex items-center space-x-4">
          <Button variant="ghost" className="flex items-center gap-2">
            <LayoutDashboard className="h-4 w-4" />
            Dashboard
          </Button>
          <Button variant="ghost" className="flex items-center gap-2">
            <BookOpen className="h-4 w-4" />
            Courses
          </Button>
          <Button variant="ghost" className="flex items-center gap-2">
            <Brain className="h-4 w-4" />
            AI Tools
          </Button>
          <Button variant="ghost" className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            Settings
          </Button>
        </div>

        <div className="flex items-center space-x-4">
          <Button size="sm">New Course</Button>
        </div>
      </div>
    </nav>
  );
};