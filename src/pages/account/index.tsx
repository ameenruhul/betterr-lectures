
import React from "react";
import { useNavigate, Outlet } from "react-router-dom";
import { DashboardHeader } from "@/components/DashboardHeader";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ResizablePanelGroup, ResizablePanel } from "@/components/ui/resizable";
import { AccountSidebar } from "@/components/account/AccountSidebar";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const AccountPage = () => {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen bg-accent/30">
      <DashboardHeader />
      
      <div className="container py-6 space-y-6">
        <div className="flex items-center gap-4">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => navigate("/dashboard")}
            className="flex items-center gap-1"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Dashboard
          </Button>
          <h1 className="text-2xl font-bold">Account Settings</h1>
        </div>
        
        <ResizablePanelGroup direction="horizontal" className="min-h-[600px] rounded-lg border">
          <ResizablePanel defaultSize={25} minSize={20} maxSize={30}>
            <AccountSidebar />
          </ResizablePanel>
          
          <ResizablePanel defaultSize={75}>
            <div className="p-6 h-full overflow-auto">
              <Outlet />
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </div>
  );
};

export default AccountPage;
