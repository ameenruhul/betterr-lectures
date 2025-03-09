
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  ArrowLeft,
  Menu,
  X
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import SharedCourseSidebar from "../lecture/SharedCourseSidebar";

interface PageLayoutProps {
  children: React.ReactNode;
  title: string;
  actionButtons?: React.ReactNode;
}

const PageLayout = ({ children, title, actionButtons }: PageLayoutProps) => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  
  return (
    <div className="min-h-screen bg-white flex">
      {/* Sidebar */}
      <div 
        className={cn(
          "bg-gray-50 border-r transition-all duration-300 z-10",
          sidebarOpen ? "w-64" : "w-0 -ml-64 md:w-20 md:ml-0"
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
        <div className="p-4 border-b flex items-center justify-between">
          <div className="flex items-center">
            {!sidebarOpen && (
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

export default PageLayout;
