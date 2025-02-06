import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export const DashboardHeader = () => {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Welcome back, Professor</h1>
        <p className="text-muted-foreground">
          Here's what's happening with your courses today.
        </p>
      </div>
      
      <div className="flex items-center space-x-2">
        <Button className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          New Course
        </Button>
      </div>
    </div>
  );
};