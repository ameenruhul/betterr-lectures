
import React from "react";
import AssignmentGenerator from "../components/lecture/AssignmentGenerator";
import { FileText, Printer } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import PageLayout from "../components/layout/PageLayout";

const AssignmentGeneratorPage = () => {
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
    </>
  );
  
  return (
    <PageLayout title="Assignment Generator" actionButtons={actionButtons}>
      <AssignmentGenerator />
    </PageLayout>
  );
};

export default AssignmentGeneratorPage;
