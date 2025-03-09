
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  ArrowLeft,
  Menu,
  X,
  Printer,
  BookOpen,
  NotebookPen,
  FileText,
  FileQuestion,
  CheckSquare,
  ClipboardList,
  BookMarked,
  Microscope
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface PageLayoutProps {
  children: React.ReactNode;
  title: string;
  actionButtons?: React.ReactNode;
}

const PageLayout = ({ children, title, actionButtons }: PageLayoutProps) => {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  
  const navigateTo = (path: string) => {
    navigate(path);
  };
  
  return (
    <div className="min-h-screen bg-white flex">
      {/* Sidebar */}
      <div 
        className={cn(
          "bg-gray-50 border-r transition-all duration-300 z-10",
          isSidebarOpen ? "w-64" : "w-0 -ml-64 md:w-20 md:ml-0"
        )}
      >
        <div className="h-full flex flex-col">
          <div className="p-4 border-b flex items-center justify-between">
            <h3 className={cn("font-semibold text-primary", isSidebarOpen ? "" : "hidden md:hidden")}>
              AI Teaching Tools
            </h3>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={toggleSidebar}
              className={cn("md:flex", isSidebarOpen ? "hidden md:flex" : "hidden")}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="flex-1 overflow-y-auto p-2">
            <div className="space-y-1">
              <SidebarItem 
                icon={BookOpen} 
                label="Lesson Plan" 
                path="/lesson-plan" 
                isCollapsed={!isSidebarOpen}
                onClick={() => navigateTo("/lesson-plan")}
              />
              <SidebarItem 
                icon={FileText} 
                label="Lecture Prep" 
                path="/lecture-prep" 
                isCollapsed={!isSidebarOpen}
                onClick={() => navigateTo("/lecture-prep")}
              />
              <SidebarItem 
                icon={FileQuestion} 
                label="Create Quiz" 
                path="/quiz-builder" 
                isCollapsed={!isSidebarOpen}
                onClick={() => navigateTo("/quiz-builder")}
              />
              <SidebarItem 
                icon={CheckSquare} 
                label="Quiz Solver" 
                path="/quiz-solver" 
                isCollapsed={!isSidebarOpen}
                onClick={() => navigateTo("/quiz-solver")}
              />
              <SidebarItem 
                icon={ClipboardList} 
                label="Assignment Generator" 
                path="/assignment-generator" 
                isCollapsed={!isSidebarOpen}
                onClick={() => navigateTo("/assignment-generator")}
              />
              <SidebarItem 
                icon={BookMarked} 
                label="Assignment Solver" 
                path="/assignment-solver" 
                isCollapsed={!isSidebarOpen}
                onClick={() => navigateTo("/assignment-solver")}
              />
              <SidebarItem 
                icon={NotebookPen} 
                label="Study Guide" 
                path="/study-guide" 
                isCollapsed={!isSidebarOpen}
                onClick={() => navigateTo("/study-guide")}
              />
              <SidebarItem 
                icon={Microscope} 
                label="Research" 
                path="/research" 
                isCollapsed={!isSidebarOpen}
                onClick={() => navigateTo("/research")}
              />
            </div>
          </div>
          
          <div className="p-4 border-t flex justify-center">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => navigateTo("/dashboard")}
              className={cn("w-full justify-center", isSidebarOpen ? "" : "px-2")}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              {isSidebarOpen && "Back to Dashboard"}
            </Button>
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="p-4 border-b flex items-center justify-between">
          <div className="flex items-center">
            {!isSidebarOpen && (
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={toggleSidebar}
                className="mr-2"
              >
                <Menu className="h-4 w-4" />
              </Button>
            )}
            <h1 className="text-xl font-semibold">{title}</h1>
          </div>
          
          {actionButtons && (
            <div className="flex items-center space-x-2">
              {actionButtons}
            </div>
          )}
        </div>
        
        {/* Content */}
        <div className="flex-1 overflow-auto">
          {children}
        </div>
      </div>
    </div>
  );
};

interface SidebarItemProps {
  icon: React.FC<any>;
  label: string;
  path: string;
  isCollapsed: boolean;
  onClick: () => void;
}

const SidebarItem = ({ icon: Icon, label, path, isCollapsed, onClick }: SidebarItemProps) => {
  const isActive = window.location.pathname === path;
  
  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={onClick}
      className={cn(
        "w-full flex items-center justify-start py-2 px-3 transition-all duration-200",
        isActive 
          ? "bg-primary/10 text-primary hover:bg-primary/15" 
          : "hover:bg-gray-100",
        isCollapsed ? "justify-center px-2" : ""
      )}
    >
      <Icon className={cn("h-5 w-5", isActive ? "text-primary" : "")} />
      {!isCollapsed && <span className="ml-2">{label}</span>}
    </Button>
  );
};

export default PageLayout;
