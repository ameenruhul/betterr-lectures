
import React from "react";
import QuizBuilder from "../components/lecture/QuizBuilder";
import { FileText, Printer } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import PageLayout from "../components/layout/PageLayout";

const QuizBuilderPage = () => {
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
        Print Quiz
      </Button>
      <Button 
        variant="outline" 
        size="sm" 
        onClick={() => navigate("/quiz-solver")}
        className="flex items-center"
      >
        <FileText className="h-4 w-4 mr-2" />
        Quiz Solver
      </Button>
    </>
  );
  
  return (
    <PageLayout title="Quiz Builder" actionButtons={actionButtons}>
      <QuizBuilder />
    </PageLayout>
  );
};

export default QuizBuilderPage;
