
import React from "react";
import ResearchComponent from "../components/lecture/Research";
import { ArrowLeft, FileText, Printer, NotebookPen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const ResearchPage = () => {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <div className="p-4 border-b flex items-center justify-between">
        <div className="flex items-center">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => navigate(-1)}
            className="mr-2"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <h1 className="text-xl font-semibold">Research Tool</h1>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => window.print()}
            className="flex items-center"
          >
            <Printer className="h-4 w-4 mr-2" />
            Print Research
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => navigate("/study-guide")}
            className="flex items-center"
          >
            <NotebookPen className="h-4 w-4 mr-2" />
            Study Guide Creator
          </Button>
        </div>
      </div>
      <div className="flex-1">
        <ResearchComponent />
      </div>
    </div>
  );
};

export default ResearchPage;
