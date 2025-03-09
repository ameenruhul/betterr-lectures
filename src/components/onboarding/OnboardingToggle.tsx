
import React from 'react';
import { Button } from '@/components/ui/button';
import { Info, ToggleLeft, ToggleRight } from 'lucide-react';
import { useOnboarding } from '@/contexts/OnboardingContext';
import { cn } from '@/lib/utils';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface OnboardingToggleProps {
  className?: string;
}

const OnboardingToggle: React.FC<OnboardingToggleProps> = ({ className }) => {
  const { isGuidedMode, toggleGuidedMode, resetOnboarding } = useOnboarding();

  return (
    <div className={cn('flex items-center space-x-2', className)}>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button 
              size="sm" 
              variant="outline"
              className="flex items-center"
              onClick={toggleGuidedMode}
            >
              {isGuidedMode ? (
                <>
                  <ToggleRight className="h-4 w-4 mr-2 text-primary" />
                  Guided Mode
                </>
              ) : (
                <>
                  <ToggleLeft className="h-4 w-4 mr-2" />
                  Non-Guided Mode
                </>
              )}
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>{isGuidedMode ? 'Disable guided tooltips' : 'Enable guided tooltips'}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};

export default OnboardingToggle;
