
import React from "react";
import StudyGuideComponent from "../components/lecture/StudyGuide";
import { BookOpen, Printer } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import PageLayout from "../components/layout/PageLayout";

const StudyGuidePage = () => {
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
    </>
  );
  
  return (
    <PageLayout title="Study Guide Creator" actionButtons={actionButtons}>
      <StudyGuideComponent />
    </PageLayout>
  );
};

export default StudyGuidePage;
