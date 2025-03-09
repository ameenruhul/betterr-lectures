
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { 
  BookOpen, 
  FileQuestion, 
  CheckSquare, 
  FileText, 
  ClipboardList,
  BookMarked,
  NotebookPen,
  Microscope,
  Sparkles,
  ChevronDown,
  ChevronUp,
  PanelLeft,
  LayoutDashboard
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import ContentUploader from "@/components/lecture/ContentUploader";
import LectureNavigation from "@/components/lecture/LectureNavigation";
import WorkspaceToolButton from "@/components/lecture/WorkspaceToolButton";
import { cn } from "@/lib/utils";
import Logo from "@/components/ui/Logo";

interface SharedCourseSidebarProps {
  onCloseSidebar?: () => void;
}

const SharedCourseSidebar = ({ 
  onCloseSidebar
}: SharedCourseSidebarProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [toolsExpanded, setToolsExpanded] = useState(true);
  
  const handleBackToDashboard = () => {
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
      icon: PanelLeft,
      label: "Lecture Editor",
      path: "/lectures-panel",
      color: "text-teal-500"
    },
    {
      icon: BookOpen,
      label: "Lesson Plan",
      path: "/lesson-plan",
      color: "text-blue-500"
    },
    {
      icon: FileQuestion,
      label: "Create Quiz",
      path: "/quiz-builder",
      color: "text-purple-500"
    },
    {
      icon: ClipboardList,
      label: "Assignment Generator",
      path: "/assignment-generator",
      color: "text-pink-500"
    },
    {
      icon: FileText,
      label: "Study Guide",
      path: "/study-guide",
      color: "text-amber-500"
    }
  ];

  const toolCategories = [
    {
      title: "LECTURE PREPARATION",
      tools: [toolItems[0], toolItems[1]]
    },
    {
      title: "ASSESSMENT TOOLS",
      tools: [toolItems[2], toolItems[3]]
    },
    {
      title: "STUDENT RESOURCES",
      tools: [toolItems[4]]
    }
  ];

  return (
    <div className="h-full flex flex-col bg-gray-50/60 overflow-hidden">
      <div className="p-4 border-b bg-white">
        <div className="flex items-center justify-between mb-4">
          <Logo variant="default" />
        </div>
        
        <Button 
          variant="outline" 
          size="sm" 
          onClick={handleBackToDashboard} 
          className="flex items-center w-full text-gray-700 hover:text-primary transition-colors mb-1 group"
        >
          <LayoutDashboard className="h-4 w-4 mr-2 text-primary group-hover:translate-x-[-2px] transition-transform" />
          <span className="font-medium">Dashboard</span>
        </Button>
      </div>

      <ContentUploader 
        courseId="tools"
        lectureId="shared" 
        documentTitle="Current Lecture"
        onBackClick={handleBackToDashboard}
      />

      <LectureNavigation 
        lectureId="shared"
        onCloseSidebar={onCloseSidebar}
      />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <div 
          className="flex items-center justify-between p-4 border-b cursor-pointer bg-white hover:bg-gray-50 transition-colors"
          onClick={() => setToolsExpanded(!toolsExpanded)}
        >
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-primary" />
            <h3 className="font-semibold text-sm text-gray-700">TEACHING TOOLS</h3>
          </div>
          {toolsExpanded ? (
            <ChevronUp className="h-4 w-4 text-gray-500" />
          ) : (
            <ChevronDown className="h-4 w-4 text-gray-500" />
          )}
        </div>

        {toolsExpanded && (
          <div className="p-3 space-y-4 overflow-y-auto bg-gray-50/30">
            {toolCategories.map((category, index) => (
              <div key={category.title} className="space-y-3">
                <h4 className="text-xs font-medium text-gray-500 pl-2">{category.title}</h4>
                <div className="grid grid-cols-2 gap-3">
                  {category.tools.map((tool) => (
                    <WorkspaceToolButton
                      key={tool.label}
                      icon={tool.icon}
                      label={tool.label}
                      onClick={() => handleToolClick(tool.path)}
                      path={tool.path}
                      className={cn(
                        "transition-transform hover:translate-y-[-2px]",
                        location.pathname === tool.path && "ring-2 ring-primary/20 bg-primary/5"
                      )}
                      iconClassName={tool.color}
                    />
                  ))}
                </div>
                {index < toolCategories.length - 1 && (
                  <Separator className="my-2" />
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SharedCourseSidebar;
