
import React from "react";
import AssignmentSolver from "../components/lecture/AssignmentSolver";
import { ArrowLeft, FileText, Printer, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const AssignmentSolverPage = () => {
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
          <h1 className="text-xl font-semibold">Assignment Solver</h1>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => window.print()}
            className="flex items-center"
          >
            <Printer className="h-4 w-4 mr-2" />
            Print Solutions
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            className="flex items-center"
          >
            <Upload className="h-4 w-4 mr-2" />
            Upload Assignment
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => navigate("/assignment-generator")}
            className="flex items-center"
          >
            <FileText className="h-4 w-4 mr-2" />
            Assignment Generator
          </Button>
        </div>
      </div>
      <div className="flex-1">
        <AssignmentSolver />
      </div>
    </div>
  );
};

export default AssignmentSolverPage;
