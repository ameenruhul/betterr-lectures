
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
  Sparkles,
  ClipboardList,
  BookMarked,
  PanelLeft
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
          icon={PanelLeft} 
          label="Lectures Panel" 
          onClick={() => handleToolClick("/lectures-panel")}
          path="/lectures-panel"
          iconClassName="text-teal-500"
        />
        <WorkspaceToolButton 
          icon={BookOpen} 
          label="Lesson Plan" 
          onClick={() => handleToolClick("/lesson-plan")}
          path="/lesson-plan"
        />
        <WorkspaceToolButton 
          icon={GraduationCap} 
          label="Lecture Prep" 
          onClick={() => handleToolClick("/lecture-prep")}
          path="/lecture-prep"
        />
        <WorkspaceToolButton 
          icon={FileQuestion} 
          label="Create Quiz" 
          onClick={() => handleToolClick("/quiz-builder")}
          path="/quiz-builder"
        />
        <WorkspaceToolButton 
          icon={CheckSquare} 
          label="Quiz Solver" 
          onClick={() => handleToolClick("/quiz-solver")}
          path="/quiz-solver"
        />
        <WorkspaceToolButton 
          icon={ClipboardList} 
          label="Assignment Generator" 
          onClick={() => handleToolClick("/assignment-generator")}
          path="/assignment-generator"
        />
        <WorkspaceToolButton 
          icon={BookMarked} 
          label="Assignment Solver" 
          onClick={() => handleToolClick("/assignment-solver")}
          path="/assignment-solver"
        />
        <WorkspaceToolButton 
          icon={NotebookPen} 
          label="Study Guide" 
          onClick={() => handleToolClick("/study-guide")}
          path="/study-guide"
        />
        <WorkspaceToolButton 
          icon={Microscope} 
          label="Research" 
          onClick={() => handleToolClick("/research")}
          path="/research"
        />
      </div>
    </div>
  );
};

export default WorkspaceTools;
