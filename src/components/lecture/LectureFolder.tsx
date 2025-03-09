
import { useState } from "react";
import { FileText, Presentation, BookOpen } from "lucide-react";
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
  expanded?: boolean;
  isGridView?: boolean;
}

const LectureTypeIcon = ({ type }: { type: string }) => {
  switch (type) {
    case "document":
      return <FileText className="h-4 w-4 text-emerald-500" />;
    case "presentation":
      return <Presentation className="h-4 w-4 text-amber-500" />;
    default:
      return <BookOpen className="h-4 w-4 text-gray-500" />;
  }
};

const LectureFolder = ({ 
  lecture, 
  courseId, 
  onDelete, 
  onOpen, 
  isGridView = false
}: LectureFolderProps) => {
  // Grid view version (default)
  if (isGridView) {
    return (
      <div 
        className="border rounded-lg bg-white shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden h-full flex flex-col cursor-pointer"
        onClick={() => onOpen(lecture.id)}
      >
        <div className="p-4 flex-1">
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 rounded-md bg-gray-100 flex items-center justify-center">
              <LectureTypeIcon type={lecture.type} />
            </div>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
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
                <DropdownMenuItem onClick={(e) => {
                  e.stopPropagation();
                  onOpen(lecture.id);
                }}>
                  <FileText className="h-4 w-4 mr-2" />
                  Open
                </DropdownMenuItem>
                <DropdownMenuItem onClick={(e) => e.stopPropagation()}>
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
                  Rename
                </DropdownMenuItem>
                <DropdownMenuItem onClick={(e) => e.stopPropagation()}>
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
                  onClick={(e) => {
                    e.stopPropagation();
                    onDelete(lecture.id);
                  }}
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
          
          <h3 className="font-medium text-lg mb-2 line-clamp-3">{lecture.title}</h3>
          
          <div className="text-xs text-gray-500 flex items-center gap-2">
            <span>{lecture.duration}</span>
          </div>
        </div>
        
        <div className="mt-auto border-t p-3 bg-gray-50">
          <div className="flex flex-wrap gap-2">
            <div className="flex items-center text-xs text-gray-600 bg-gray-100 px-2 py-1 rounded">
              <FileText className="h-3 w-3 mr-1" />
              <span>Teaching Materials</span>
            </div>
            <div className="flex items-center text-xs text-gray-600 bg-gray-100 px-2 py-1 rounded">
              <Presentation className="h-3 w-3 mr-1" />
              <span>Slides</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // List view
  return (
    <div 
      className="mb-4 border rounded-lg bg-white shadow-sm hover:shadow-md transition-all duration-200 p-4 cursor-pointer"
      onClick={() => onOpen(lecture.id)}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex-shrink-0 w-8 h-8 rounded-md bg-gray-100 flex items-center justify-center">
            <LectureTypeIcon type={lecture.type} />
          </div>
          <div>
            <h3 className="font-medium">{lecture.title}</h3>
            <div className="text-xs text-gray-500">
              <span>{lecture.duration}</span>
            </div>
          </div>
        </div>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
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
            <DropdownMenuItem onClick={(e) => {
              e.stopPropagation();
              onOpen(lecture.id);
            }}>
              <FileText className="h-4 w-4 mr-2" />
              Open
            </DropdownMenuItem>
            <DropdownMenuItem onClick={(e) => e.stopPropagation()}>
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
              Rename
            </DropdownMenuItem>
            <DropdownMenuItem onClick={(e) => e.stopPropagation()}>
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
              onClick={(e) => {
                e.stopPropagation();
                onDelete(lecture.id);
              }}
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
  );
};

export default LectureFolder;
