
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  BookOpen, 
  GraduationCap, 
  FileQuestion, 
  CheckSquare, 
  FileText, 
  ClipboardList,
  BookMarked,
  NotebookPen,
  Microscope,
  Sparkles,
  ChevronDown,
  Library,
  PanelLeft,
  ChevronUp,
  Home
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import ContentUploader from "@/components/lecture/ContentUploader";
import LectureNavigation from "@/components/lecture/LectureNavigation";
import WorkspaceToolButton from "@/components/lecture/WorkspaceToolButton";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

interface SharedCourseSidebarProps {
  onCloseSidebar?: () => void;
}

const SharedCourseSidebar = ({ onCloseSidebar }: SharedCourseSidebarProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [toolsExpanded, setToolsExpanded] = useState(true);
  
  const handleBackToLectures = () => {
    navigate("/dashboard");
  };

  const handleToolClick = (path: string) => {
    navigate(path);
    if (onCloseSidebar && window.innerWidth < 768) {
      onCloseSidebar();
    }
  };

  const toolItems = [
    {
      icon: BookOpen,
      label: "Lesson Plan",
      path: "/lesson-plan",
      color: "text-blue-500"
    },
    {
      icon: GraduationCap,
      label: "Lecture Prep",
      path: "/lecture-prep",
      color: "text-indigo-500"
    },
    {
      icon: FileQuestion,
      label: "Create Quiz",
      path: "/quiz-builder",
      color: "text-purple-500"
    },
    {
      icon: CheckSquare,
      label: "Quiz Solver",
      path: "/quiz-solver",
      color: "text-violet-500"
    },
    {
      icon: ClipboardList,
      label: "Assignment Generator",
      path: "/assignment-generator",
      color: "text-pink-500"
    },
    {
      icon: BookMarked,
      label: "Assignment Solver",
      path: "/assignment-solver",
      color: "text-rose-500"
    },
    {
      icon: NotebookPen,
      label: "Study Guide",
      path: "/study-guide",
      color: "text-amber-500"
    },
    {
      icon: Microscope,
      label: "Research",
      path: "/research",
      color: "text-emerald-500"
    }
  ];

  return (
    <div className="h-full flex flex-col bg-gray-50/60 overflow-hidden">
      {/* Header section with brand and back button */}
      <div className="p-4 border-b bg-white">
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={handleBackToLectures} 
          className="flex items-center w-full text-gray-700 hover:text-primary transition-colors -ml-2 mb-2 group"
        >
          <Home className="h-4 w-4 mr-2 text-primary group-hover:translate-x-[-2px] transition-transform" />
          <span className="font-medium">Back to Dashboard</span>
        </Button>
        
        <div className="flex items-center gap-2 pl-1">
          <Library className="h-5 w-5 text-primary" />
          <h2 className="text-lg font-bold text-gray-800">Better Lectures</h2>
        </div>
      </div>

      {/* Content Uploader Section */}
      <ContentUploader 
        courseId="tools"
        lectureId="shared" 
        documentTitle="AI Teaching Tools"
        onBackClick={handleBackToLectures}
      />

      {/* Lecture Navigation */}
      <LectureNavigation 
        lectureId="shared"
        onCloseSidebar={onCloseSidebar}
      />
      
      {/* Workspace Tools Section */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <div 
          className="flex items-center justify-between p-4 border-b cursor-pointer bg-white hover:bg-gray-50 transition-colors"
          onClick={() => setToolsExpanded(!toolsExpanded)}
        >
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-primary" />
            <h3 className="font-semibold text-sm text-gray-700">AI TEACHING TOOLS</h3>
          </div>
          {toolsExpanded ? (
            <ChevronUp className="h-4 w-4 text-gray-500" />
          ) : (
            <ChevronDown className="h-4 w-4 text-gray-500" />
          )}
        </div>

        {toolsExpanded && (
          <div className="p-3 space-y-3 overflow-y-auto bg-gray-50/30">
            <div className="grid grid-cols-2 gap-3">
              {toolItems.map((tool) => (
                <WorkspaceToolButton
                  key={tool.label}
                  icon={tool.icon}
                  label={tool.label}
                  onClick={() => handleToolClick(tool.path)}
                  className={cn(
                    "transition-transform hover:translate-y-[-2px]",
                    window.location.pathname === tool.path && "ring-2 ring-primary/20 bg-primary/5"
                  )}
                  iconClassName={tool.color}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SharedCourseSidebar;
