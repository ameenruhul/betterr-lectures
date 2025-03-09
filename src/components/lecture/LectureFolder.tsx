
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronDown, ChevronRight, Video, FileText, Presentation, BookOpen, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

interface LectureFolderProps {
  lecture: {
    id: number;
    title: string;
    type: string;
    duration: string;
  };
  courseId: string;
  onDelete: (id: number) => void;
  onOpen: (id: number) => void;
}

const LectureTypeIcon = ({ type }: { type: string }) => {
  switch (type) {
    case "video":
      return <Video className="h-4 w-4 text-primary" />;
    case "document":
      return <FileText className="h-4 w-4 text-emerald-500" />;
    case "presentation":
      return <Presentation className="h-4 w-4 text-amber-500" />;
    default:
      return <BookOpen className="h-4 w-4 text-gray-500" />;
  }
};

const LectureFolder = ({ lecture, courseId, onDelete, onOpen }: LectureFolderProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const navigate = useNavigate();

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="mb-4">
      <div 
        className={cn(
          "border rounded-lg overflow-hidden transition-all duration-200",
          isExpanded ? "shadow-md" : "shadow-sm hover:shadow-md"
        )}
      >
        {/* Folder Header */}
        <div 
          className={cn(
            "flex items-center justify-between p-4 cursor-pointer",
            isExpanded ? "bg-gray-50 border-b" : "bg-white"
          )}
          onClick={toggleExpanded}
        >
          <div className="flex items-center gap-3">
            <button 
              className="text-gray-500 hover:text-gray-700 transition-colors"
              aria-label={isExpanded ? "Collapse folder" : "Expand folder"}
            >
              {isExpanded ? (
                <ChevronDown className="h-4 w-4" />
              ) : (
                <ChevronRight className="h-4 w-4" />
              )}
            </button>
            <div className="flex items-center gap-2">
              <div className="flex-shrink-0 w-8 h-8 rounded-md bg-gray-100 flex items-center justify-center">
                <LectureTypeIcon type={lecture.type} />
              </div>
              <h3 className="font-medium">{lecture.title}</h3>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <div className="text-xs text-gray-500 hidden sm:block">
              <span className="capitalize">{lecture.type}</span>
              <span className="mx-1">•</span>
              <span>{lecture.duration}</span>
            </div>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-gray-500"
                  >
                    <circle cx="12" cy="12" r="1" />
                    <circle cx="12" cy="5" r="1" />
                    <circle cx="12" cy="19" r="1" />
                  </svg>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => onOpen(lecture.id)}>
                  <Play className="h-4 w-4 mr-2" />
                  Open
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="mr-2"
                  >
                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                  </svg>
                  Edit
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="mr-2"
                  >
                    <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                  </svg>
                  Duplicate
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem 
                  className="text-red-600" 
                  onClick={() => onDelete(lecture.id)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="mr-2"
                  >
                    <path d="M3 6h18" />
                    <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                    <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                  </svg>
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        
        {/* Folder Content */}
        {isExpanded && (
          <div className="p-4 bg-white">
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between p-3 border rounded-md hover:bg-gray-50 transition-colors cursor-pointer">
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-gray-500" />
                  <span>Lecture notes</span>
                </div>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => onOpen(lecture.id)} 
                  className="h-7 px-2"
                >
                  Open
                </Button>
              </div>
              
              <div className="flex items-center justify-between p-3 border rounded-md hover:bg-gray-50 transition-colors cursor-pointer">
                <div className="flex items-center gap-2">
                  <Video className="h-4 w-4 text-gray-500" />
                  <span>Video content</span>
                </div>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => onOpen(lecture.id)} 
                  className="h-7 px-2"
                >
                  Open
                </Button>
              </div>
              
              <div className="flex items-center justify-between p-3 border rounded-md hover:bg-gray-50 transition-colors cursor-pointer">
                <div className="flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-500">
                    <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path>
                    <rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect>
                  </svg>
                  <span>Assignment</span>
                </div>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => onOpen(lecture.id)} 
                  className="h-7 px-2"
                >
                  Open
                </Button>
              </div>
              
              <div className="flex items-center justify-between p-3 border rounded-md hover:bg-gray-50 transition-colors cursor-pointer">
                <div className="flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-500">
                    <circle cx="12" cy="12" r="10"></circle>
                    <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"></polygon>
                  </svg>
                  <span>Quiz</span>
                </div>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => onOpen(lecture.id)} 
                  className="h-7 px-2"
                >
                  Open
                </Button>
              </div>
            </div>
            
            <div className="mt-3 pt-3 border-t">
              <Button 
                variant="default" 
                size="sm" 
                className="w-full"
                onClick={() => onOpen(lecture.id)}
              >
                <Play className="h-4 w-4 mr-2" />
                Open Lecture Editor
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LectureFolder;
