
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Menu,
  X,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import SharedCourseSidebar from "../lecture/SharedCourseSidebar";
import BackNavigation from "./BackNavigation";

interface PageLayoutProps {
  children: React.ReactNode;
  title: string;
  actionButtons?: React.ReactNode;
  isLoading?: boolean;
}

const PageLayout = ({ 
  children, 
  title, 
  actionButtons, 
  isLoading = false 
}: PageLayoutProps) => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  
  // Set sidebar closed by default on mobile
  useEffect(() => {
    if (window.innerWidth < 768) {
      setSidebarOpen(false);
    }
  }, []);
  
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  
  return (
    <div className="min-h-screen bg-white flex">
      {/* Sidebar with transition */}
      <div 
        className={cn(
          "border-r transition-all duration-300 z-10 fixed md:static h-full",
          sidebarOpen ? "w-64" : "w-0 -ml-64 md:w-0 md:ml-0"
        )}
      >
        <SharedCourseSidebar onCloseSidebar={() => setSidebarOpen(false)} />
      </div>
      
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-black/20 z-10"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="p-4 border-b flex items-center justify-between bg-white shadow-sm">
          <div className="flex items-center">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={toggleSidebar}
              className="mr-2 transition-colors hover:bg-gray-100"
              aria-label={sidebarOpen ? "Close sidebar" : "Open sidebar"}
            >
              {sidebarOpen ? (
                <ChevronLeft className="h-5 w-5 text-gray-700" />
              ) : (
                <Menu className="h-5 w-5 text-gray-700" />
              )}
            </Button>
            <h1 className="text-xl font-semibold text-gray-800">{title}</h1>
          </div>
          
          {actionButtons && (
            <div className="flex items-center space-x-2">
              {actionButtons}
            </div>
          )}
        </div>
        
        {/* Content */}
        <div className="flex-1 overflow-auto p-6 bg-gray-50/30">
          {isLoading ? (
            <div className="h-full flex flex-col items-center justify-center">
              <div className="w-10 h-10 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
              <p className="mt-4 text-gray-500">Loading content...</p>
            </div>
          ) : (
            children
          )}
        </div>
      </div>
    </div>
  );
};

export default PageLayout;
