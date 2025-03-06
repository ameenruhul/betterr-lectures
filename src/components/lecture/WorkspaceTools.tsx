
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

const WorkspaceTools = () => {
  const { toast } = useToast();
  
  const handleToolClick = (toolName: string) => {
    toast({
      title: `${toolName} tool activated`,
      description: "This feature is coming soon!",
    });
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
          onClick={() => handleToolClick("Quiz Creator")}
        />
        <WorkspaceToolButton 
          icon={CheckSquare} 
          label="Quiz Solver" 
          onClick={() => handleToolClick("Quiz Solver")}
        />
        <WorkspaceToolButton 
          icon={FileText} 
          label="Assignment" 
          onClick={() => handleToolClick("Assignment Creator")}
        />
        <WorkspaceToolButton 
          icon={Brain} 
          label="Assignment Help" 
          onClick={() => handleToolClick("Assignment Helper")}
        />
        <WorkspaceToolButton 
          icon={NotebookPen} 
          label="Study Guide" 
          onClick={() => handleToolClick("Study Guide Creator")}
        />
        <WorkspaceToolButton 
          icon={Microscope} 
          label="Research" 
          onClick={() => handleToolClick("Research Tool")}
        />
      </div>
    </div>
  );
};

export default WorkspaceTools;
