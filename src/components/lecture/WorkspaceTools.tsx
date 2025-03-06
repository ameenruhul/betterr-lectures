
import React, { useState } from "react";
import WorkspaceToolButton from "./WorkspaceToolButton";
import { 
  BookOpen, 
  GraduationCap, 
  FileQuestion, 
  CheckSquare, 
  FileText, 
  Brain, 
  NotebookPen, 
  Microscope,
  Sparkles
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import LessonPlanAI from "./LessonPlanAI";
import LecturePrep from "./LecturePrep";
import QuizBuilder from "./QuizBuilder";
import QuizSolver from "./QuizSolver";

const WorkspaceTools = () => {
  const { toast } = useToast();
  const [activeTool, setActiveTool] = useState<string | null>(null);
  
  const handleToolClick = (toolName: string) => {
    setActiveTool(toolName);
  };
  
  const handleCloseTool = () => {
    setActiveTool(null);
  };
  
  // If a tool is active, render that tool
  if (activeTool === "Lesson Plan") {
    return <LessonPlanAI />;
  }
  
  if (activeTool === "Lecture Prep") {
    return <LecturePrep />;
  }
  
  if (activeTool === "Create Quiz") {
    return <QuizBuilder />;
  }
  
  if (activeTool === "Quiz Solver") {
    return <QuizSolver />;
  }
  
  // If no tool is active, render the tool grid
  return (
    <div className="flex-1 p-4 space-y-4 overflow-y-auto bg-gray-50">
      <h3 className="font-semibold mb-2 text-sm text-gray-500 flex items-center">
        <Sparkles className="h-4 w-4 mr-2 text-primary" />
        WORKSPACE TOOLS
      </h3>
      
      <div className="grid grid-cols-2 gap-3">
        <WorkspaceToolButton 
          icon={BookOpen} 
          label="Lesson Plan" 
          onClick={() => handleToolClick("Lesson Plan")}
        />
        <WorkspaceToolButton 
          icon={GraduationCap} 
          label="Lecture Prep" 
          onClick={() => handleToolClick("Lecture Prep")}
        />
        <WorkspaceToolButton 
          icon={FileQuestion} 
          label="Create Quiz" 
          onClick={() => handleToolClick("Create Quiz")}
        />
        <WorkspaceToolButton 
          icon={CheckSquare} 
          label="Quiz Solver" 
          onClick={() => handleToolClick("Quiz Solver")}
        />
        <WorkspaceToolButton 
          icon={FileText} 
          label="Assignment" 
          onClick={() => {
            toast({
              title: "Assignment Creator",
              description: "This feature is coming soon!",
            });
          }}
        />
        <WorkspaceToolButton 
          icon={Brain} 
          label="Assignment Help" 
          onClick={() => {
            toast({
              title: "Assignment Helper",
              description: "This feature is coming soon!",
            });
          }}
        />
        <WorkspaceToolButton 
          icon={NotebookPen} 
          label="Study Guide" 
          onClick={() => {
            toast({
              title: "Study Guide Creator",
              description: "This feature is coming soon!",
            });
          }}
        />
        <WorkspaceToolButton 
          icon={Microscope} 
          label="Research" 
          onClick={() => {
            toast({
              title: "Research Tool",
              description: "This feature is coming soon!",
            });
          }}
        />
      </div>
    </div>
  );
};

export default WorkspaceTools;
