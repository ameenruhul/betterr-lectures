
import React from 'react';
import { Button } from '@/components/ui/button';
import { Info, X } from 'lucide-react';
import { useOnboarding } from '@/contexts/OnboardingContext';
import { cn } from '@/lib/utils';

interface OnboardingToggleProps {
  className?: string;
}

const OnboardingToggle: React.FC<OnboardingToggleProps> = ({ className }) => {
  const { isOnboardingEnabled, toggleOnboarding, resetOnboarding, isFirstTime } = useOnboarding();

  const handleStartTour = () => {
    resetOnboarding();
  };

  return (
    <div className={cn('flex items-center space-x-2', className)}>
      {isOnboardingEnabled ? (
        <Button 
          size="sm" 
          variant="outline"
          className="flex items-center"
          onClick={toggleOnboarding}
        >
          <X className="h-4 w-4 mr-1" />
          Disable Tour
        </Button>
      ) : (
        <Button 
          size="sm" 
          variant="outline"
          className="flex items-center"
          onClick={toggleOnboarding}
        >
          <Info className="h-4 w-4 mr-1" />
          Enable Tour
        </Button>
      )}

      {!isFirstTime && (
        <Button 
          size="sm" 
          variant="ghost"
          className="flex items-center"
          onClick={handleStartTour}
        >
          Restart Tour
        </Button>
      )}
    </div>
  );
};

export default OnboardingToggle;
