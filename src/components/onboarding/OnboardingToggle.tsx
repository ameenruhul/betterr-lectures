
import React from 'react';
import { Button } from '@/components/ui/button';
import { HelpCircle } from 'lucide-react';
import { useOnboarding } from '@/contexts/OnboardingContext';
import { cn } from '@/lib/utils';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface OnboardingToggleProps {
  className?: string;
}

const OnboardingToggle: React.FC<OnboardingToggleProps> = ({ className }) => {
  const { isGuidedMode, toggleGuidedMode } = useOnboarding();

  return (
    <div className={cn('flex items-center', className)}>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button 
              size="icon" 
              variant="ghost"
              className={`rounded-full ${isGuidedMode ? 'text-primary' : ''}`}
              onClick={toggleGuidedMode}
            >
              <HelpCircle className="h-5 w-5" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>{isGuidedMode ? 'Disable guided mode' : 'Enable guided mode'}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};

export default OnboardingToggle;
