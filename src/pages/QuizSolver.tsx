
import React from "react";
import QuizSolver from "../components/lecture/QuizSolver";
import { FileText, Printer, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import PageLayout from "../components/layout/PageLayout";

const QuizSolverPage = () => {
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
        Upload Quiz
      </Button>
      <Button 
        variant="outline" 
        size="sm" 
        onClick={() => navigate("/quiz-builder")}
        className="flex items-center"
      >
        <FileText className="h-4 w-4 mr-2" />
        Quiz Builder
      </Button>
    </>
  );
  
  return (
    <PageLayout title="Quiz Solver" actionButtons={actionButtons}>
      <QuizSolver />
    </PageLayout>
  );
};

export default QuizSolverPage;
