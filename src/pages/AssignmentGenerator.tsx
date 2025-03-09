
import React from "react";
import AssignmentGenerator from "../components/lecture/AssignmentGenerator";
import { ArrowLeft, FileText, Printer } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const AssignmentGeneratorPage = () => {
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
          <h1 className="text-xl font-semibold">Assignment Generator</h1>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => window.print()}
            className="flex items-center"
          >
            <Printer className="h-4 w-4 mr-2" />
            Print Assignment
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => navigate("/assignment-solver")}
            className="flex items-center"
          >
            <FileText className="h-4 w-4 mr-2" />
            Assignment Solver
          </Button>
        </div>
      </div>
      <div className="flex-1">
        <AssignmentGenerator />
      </div>
    </div>
  );
};

export default AssignmentGeneratorPage;
