
import { Button } from "@/components/ui/button";
import { Plus, Bell, Search, Menu, Settings, GraduationCap, BookOpen, Brain, LayoutDashboard, HelpCircle } from "lucide-react";
import { Link } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import PathwayTooltip from "./onboarding/PathwayTooltip";
import { useOnboarding } from "@/contexts/OnboardingContext";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useState } from "react";

export const DashboardHeader = () => {
  const { isGuidedMode, currentStep, isFirstTime, toggleGuidedMode } = useOnboarding();
  const [showNotifications, setShowNotifications] = useState(false);

  const handleToggleGuidedMode = () => {
    console.log("Toggling guided mode from", isGuidedMode, "to", !isGuidedMode);
    toggleGuidedMode();
  };

  return (
    <div className="border-b bg-white py-4">
      <div className="flex items-center justify-between px-6">
        <div className="flex items-center space-x-2">
          <GraduationCap className="h-8 w-8 text-primary" />
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Welcome to Better Lectures</h1>
            <p className="text-muted-foreground">
              Here's what's happening with your courses today.
            </p>
          </div>
        </div>
        
        <div className="flex items-center space-x-3">
          {/* Notification Icon */}
          <DropdownMenu open={showNotifications} onOpenChange={setShowNotifications}>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full relative">
                <Bell className="h-5 w-5" />
                <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-primary"></span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
              <DropdownMenuLabel>Notifications</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <div className="p-4">
                <div className="mb-3 p-3 bg-accent/50 rounded-md">
                  <p className="font-medium text-sm">New AI features available</p>
                  <p className="text-xs text-muted-foreground mt-1">Try our enhanced lecture generation tools today.</p>
                </div>
                <div className="p-3 bg-accent/50 rounded-md">
                  <p className="font-medium text-sm">Course feedback available</p>
                  <p className="text-xs text-muted-foreground mt-1">Students have reviewed your latest course materials.</p>
                </div>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
          
          {/* Guide Icon Toggle */}
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className={`rounded-full ${isGuidedMode ? 'text-primary' : ''}`}
                  onClick={handleToggleGuidedMode}
                >
                  <HelpCircle className="h-5 w-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>{isGuidedMode ? 'Disable guided mode' : 'Enable guided mode'}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          
          <div className="relative md:block hidden">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input 
              type="text" 
              placeholder="Search..." 
              className="pl-9 pr-4 py-2 rounded-full text-sm border border-input focus:outline-none focus:ring-2 focus:ring-primary/20 w-[200px]" 
            />
          </div>
          <Link to="/courses/create">
            <PathwayTooltip 
              content="Begin your teaching journey by creating a new course. Click to start the guided tour."
              position="bottom"
              step={1}
              className="w-72"
              nextStep="course-create"
              navigateTo="/courses/create"
              forceShow={(currentStep === 'dashboard' || currentStep === 'new-course') && isFirstTime && isGuidedMode}
            >
              <Button className="items-center gap-2 hidden md:inline-flex">
                <Plus className="h-4 w-4" />
                New Course
              </Button>
            </PathwayTooltip>
          </Link>
          
          {/* Hamburger Menu Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>Navigation</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <Link to="/dashboard">
                <DropdownMenuItem>
                  <LayoutDashboard className="mr-2 h-4 w-4" />
                  <span>Dashboard</span>
                </DropdownMenuItem>
              </Link>
              <Link to="/courses">
                <DropdownMenuItem>
                  <BookOpen className="mr-2 h-4 w-4" />
                  <span>Courses</span>
                </DropdownMenuItem>
              </Link>
              <Link to="/ai-tools">
                <DropdownMenuItem>
                  <Brain className="mr-2 h-4 w-4" />
                  <span>AI Tools</span>
                </DropdownMenuItem>
              </Link>
              <Link to="/settings">
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
              </Link>
              <DropdownMenuSeparator />
              <DropdownMenuLabel>Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <div className="flex items-center">
                  <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center mr-2">
                    <span className="text-primary font-medium">PD</span>
                  </div>
                  <div>
                    <p className="font-medium">Professor Davis</p>
                    <p className="text-xs text-muted-foreground">Computer Science</p>
                  </div>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem className="md:hidden">
                <Link to="/courses/create" className="flex items-center w-full">
                  <Plus className="mr-2 h-4 w-4" />
                  <span>New Course</span>
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
};
