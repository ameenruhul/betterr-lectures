
import React from "react";
import ResearchComponent from "../components/lecture/Research";
import { NotebookPen, Printer } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import PageLayout from "../components/layout/PageLayout";

const ResearchPage = () => {
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
    </>
  );
  
  return (
    <PageLayout title="Research Tool" actionButtons={actionButtons}>
      <ResearchComponent />
    </PageLayout>
  );
};

export default ResearchPage;
