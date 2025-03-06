
import React from "react";
import LessonPlanAI from "../components/lecture/LessonPlanAI";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const LessonPlanPage = () => {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <div className="p-4 border-b flex items-center">
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => navigate(-1)}
          className="mr-2"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
        <h1 className="text-xl font-semibold">Lesson Plan Creator</h1>
      </div>
      <div className="flex-1">
        <LessonPlanAI />
      </div>
    </div>
  );
};

export default LessonPlanPage;
