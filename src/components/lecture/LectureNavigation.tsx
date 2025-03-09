
import React from "react";
import { Button } from "@/components/ui/button";
import { LayoutList, X, Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useOnboarding } from "@/contexts/OnboardingContext";
import CoachMark from "@/components/onboarding/CoachMark";
import Spotlight from "@/components/onboarding/Spotlight";

interface LectureNavigationProps {
  lectureId?: string;
  onCloseSidebar?: () => void;
}

const LectureNavigation = ({ lectureId, onCloseSidebar }: LectureNavigationProps) => {
  const { toast } = useToast();
  const { currentStep, isFirstTime, nextStep, skipOnboarding } = useOnboarding();
  
  if (!lectureId) return null;
  
  const handleAddContent = () => {
    toast({
      title: "Add content",
      description: "This feature is coming soon!",
    });
    
    // If in onboarding and at the right step, move forward
    if (isFirstTime && currentStep === 'lecture-panel') {
      nextStep();
    }
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
      
      <Spotlight active={isFirstTime && currentStep === 'lecture-panel'}>
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
        
        {/* Onboarding for Lecture Panel */}
        {isFirstTime && currentStep === 'lecture-panel' && (
          <CoachMark
            title="Organize Lecture Content"
            description="Here you can organize your lecture content by adding sections, topics, and materials."
            position="right"
            onNext={() => nextStep()}
            onSkip={skipOnboarding}
          />
        )}
      </Spotlight>
    </div>
  );
};

export default LectureNavigation;
