
import React from "react";
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
import { useNavigate } from "react-router-dom";

const WorkspaceTools = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const handleToolClick = (path: string) => {
    navigate(path);
  };
  
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
          onClick={() => handleToolClick("/lesson-plan")}
        />
        <WorkspaceToolButton 
          icon={GraduationCap} 
          label="Lecture Prep" 
          onClick={() => handleToolClick("/lecture-prep")}
        />
        <WorkspaceToolButton 
          icon={FileQuestion} 
          label="Create Quiz" 
          onClick={() => handleToolClick("/quiz-builder")}
        />
        <WorkspaceToolButton 
          icon={CheckSquare} 
          label="Quiz Solver" 
          onClick={() => handleToolClick("/quiz-solver")}
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
