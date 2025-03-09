
import React from "react";
import { Button } from "@/components/ui/button";
import { LayoutList, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface LectureNavigationProps {
  lectureId?: string;
  onCloseSidebar?: () => void;
}

const LectureNavigation = ({ lectureId, onCloseSidebar }: LectureNavigationProps) => {
  const { toast } = useToast();
  
  if (!lectureId) return null;
  
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
      {/* Navigation buttons have been removed */}
    </div>
  );
};

export default LectureNavigation;
