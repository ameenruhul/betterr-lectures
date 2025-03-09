
import React from "react";
import StudyGuideComponent from "../components/lecture/StudyGuide";
import { ArrowLeft, FileText, Printer, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const StudyGuidePage = () => {
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
          <h1 className="text-xl font-semibold">Study Guide Creator</h1>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => window.print()}
            className="flex items-center"
          >
            <Printer className="h-4 w-4 mr-2" />
            Print Guide
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => navigate("/research")}
            className="flex items-center"
          >
            <BookOpen className="h-4 w-4 mr-2" />
            Research Tool
          </Button>
        </div>
      </div>
      <div className="flex-1">
        <StudyGuideComponent />
      </div>
    </div>
  );
};

export default StudyGuidePage;
