
import { Button } from "@/components/ui/button";
import { Plus, Bell, Search } from "lucide-react";
import { Link } from "react-router-dom";

export const DashboardHeader = () => {
  return (
    <div className="border-b bg-white py-4">
      <div className="flex items-center justify-between px-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Welcome to Better Lectures</h1>
          <p className="text-muted-foreground">
            Here's what's happening with your courses today.
          </p>
        </div>
        
        <div className="flex items-center space-x-3">
          <div className="relative">
            <Button variant="ghost" size="icon" className="rounded-full">
              <Bell className="h-5 w-5" />
              <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-primary"></span>
            </Button>
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input 
              type="text" 
              placeholder="Search..." 
              className="pl-9 pr-4 py-2 rounded-full text-sm border border-input focus:outline-none focus:ring-2 focus:ring-primary/20 w-[200px]" 
            />
          </div>
          <Link to="/courses/create">
            <Button className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              New Course
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};
