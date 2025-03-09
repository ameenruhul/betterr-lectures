
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
import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle
} from "@/components/ui/resizable";

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
    <div className="min-h-screen bg-white flex overflow-hidden">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-black/20 z-10"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}
      
      {/* Main Content with Resizable Panels */}
      <ResizablePanelGroup direction="horizontal" className="w-full">
        {/* Sidebar Panel */}
        {sidebarOpen && (
          <>
            <ResizablePanel 
              defaultSize={20} 
              minSize={15} 
              maxSize={30}
              className="border-r h-full z-10 md:static fixed"
            >
              <SharedCourseSidebar onCloseSidebar={() => setSidebarOpen(false)} />
            </ResizablePanel>
            
            <ResizableHandle withHandle />
          </>
        )}
        
        {/* Content Panel */}
        <ResizablePanel defaultSize={sidebarOpen ? 80 : 100}>
          <div className="flex-1 flex flex-col overflow-hidden h-full">
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
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
};

export default PageLayout;
