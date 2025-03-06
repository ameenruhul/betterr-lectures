
import React from "react";
import { Button } from "@/components/ui/button";
import { Video, FileText, FileQuestion, LayoutList } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface LectureNavigationProps {
  lectureId?: string;
}

const LectureNavigation = ({ lectureId }: LectureNavigationProps) => {
  const { toast } = useToast();
  
  const handleNavClick = (section: string) => {
    toast({
      title: `Navigating to ${section}`,
      description: "This section is coming soon!",
    });
  };
  
  if (!lectureId) return null;
  
  return (
    <div className="p-4 border-b">
      <h3 className="font-semibold mb-4 text-gray-700 flex items-center">
        <LayoutList className="h-4 w-4 mr-2 text-primary" />
        Lecture Navigation
      </h3>
      <div className="space-y-2">
        <Button 
          variant="outline" 
          className="w-full justify-start bg-white hover:bg-primary/5 hover:text-primary transition-all duration-300" 
          size="sm"
          onClick={() => handleNavClick("Video Lecture")}
        >
          <Video className="h-4 w-4 mr-2 text-primary" />
          Video Lecture
        </Button>
        <Button 
          variant="outline" 
          className="w-full justify-start bg-white hover:bg-primary/5 hover:text-primary transition-all duration-300" 
          size="sm"
          onClick={() => handleNavClick("Reading Materials")}
        >
          <FileText className="h-4 w-4 mr-2 text-emerald-500" />
          Reading Materials
        </Button>
        <Button 
          variant="outline" 
          className="w-full justify-start bg-white hover:bg-primary/5 hover:text-primary transition-all duration-300" 
          size="sm"
          onClick={() => handleNavClick("Practice Questions")}
        >
          <FileQuestion className="h-4 w-4 mr-2 text-amber-500" />
          Practice Questions
        </Button>
      </div>
    </div>
  );
};

export default LectureNavigation;
