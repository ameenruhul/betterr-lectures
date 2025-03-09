
import React from "react";
import AssignmentSolver from "../components/lecture/AssignmentSolver";
import { FileText, Printer, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import PageLayout from "../components/layout/PageLayout";

const AssignmentSolverPage = () => {
  const navigate = useNavigate();
  
  const actionButtons = (
    <>
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
    </>
  );
  
  return (
    <PageLayout title="Assignment Solver" actionButtons={actionButtons}>
      <AssignmentSolver />
    </PageLayout>
  );
};

export default AssignmentSolverPage;
