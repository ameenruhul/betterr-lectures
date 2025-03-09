
import React from "react";
import { Button } from "@/components/ui/button";
import { LayoutList, X, Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface LectureNavigationProps {
  lectureId?: string;
  onCloseSidebar?: () => void;
}

const LectureNavigation = ({ lectureId, onCloseSidebar }: LectureNavigationProps) => {
  const { toast } = useToast();
  
  if (!lectureId) return null;
  
  const handleAddContent = () => {
    toast({
      title: "Add content",
      description: "This feature is coming soon!",
    });
  };
  
  return (
    <div className="p-4 border-b relative">
      {/* Mobile close button */}
      {onCloseSidebar && (
        <Button 
          variant="ghost" 
          size="icon" 
          className="absolute top-2 right-2 md:hidden" 
          onClick={onCloseSidebar}
        >
          <X className="h-4 w-4" />
        </Button>
      )}
      
      <h3 className="font-semibold mb-4 text-gray-700 flex items-center">
        <LayoutList className="h-4 w-4 mr-2 text-primary" />
        Lecture Navigation
      </h3>
      
      <div className="py-4 text-center text-gray-500 text-sm">
        <div className="p-4 border border-dashed rounded-md bg-gray-50 flex flex-col items-center">
          <p>No navigation items yet</p>
          <Button 
            variant="ghost" 
            size="sm" 
            className="mt-2 text-primary"
            onClick={handleAddContent}
          >
            <Plus className="h-4 w-4 mr-1" />
            Add Content
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LectureNavigation;
