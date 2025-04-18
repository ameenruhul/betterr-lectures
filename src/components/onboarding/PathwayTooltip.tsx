
import React, { ReactNode, useCallback } from 'react';
import { useOnboarding } from '@/contexts/OnboardingContext';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useNavigate } from 'react-router-dom';

interface PathwayTooltipProps {
  children: ReactNode;
  content: string;
  position?: 'top' | 'right' | 'bottom' | 'left';
  className?: string;
  showArrow?: boolean;
  step?: number;
  forceShow?: boolean;
  nextStep?: string;
  navigateTo?: string;
}

const PathwayTooltip: React.FC<PathwayTooltipProps> = ({
  children,
  content,
  position = 'top',
  className,
  showArrow = true,
  step,
  forceShow = false,
  nextStep,
  navigateTo
}) => {
  const { isGuidedMode, currentStep, setCurrentStep } = useOnboarding();
  const navigate = useNavigate();

  // If not in guided mode and not forcing, just render children
  if (!isGuidedMode && !forceShow) {
    return <>{children}</>;
  }

  const positionClasses = {
    'top': 'bottom-full mb-2 left-1/2 -translate-x-1/2',
    'right': 'left-full ml-2 top-1/2 -translate-y-1/2',
    'bottom': 'top-full mt-2 left-1/2 -translate-x-1/2',
    'left': 'right-full mr-2 top-1/2 -translate-y-1/2',
  };

  const handleTooltipClick = useCallback(() => {
    if (nextStep) {
      setCurrentStep(nextStep as any);
    }
    
    if (navigateTo) {
      navigate(navigateTo);
    }
  }, [nextStep, navigateTo, setCurrentStep, navigate]);

  // Determine if the tooltip should be visible
  const shouldShowTooltip = forceShow || 
    (isGuidedMode && currentStep && nextStep && currentStep === nextStep);

  return (
    <div className="group relative">
      {children}
      <div
        className={cn(
          'absolute z-50 p-3 bg-white text-gray-800 text-sm rounded-lg shadow-lg max-w-xs border',
          positionClasses[position],
          shouldShowTooltip ? 'block' : 'group-hover:block hidden',
          (nextStep || navigateTo) ? 'cursor-pointer hover:border-primary hover:bg-primary/5 border-primary/20' : 'border-gray-200',
          className
        )}
        onClick={(nextStep || navigateTo) ? handleTooltipClick : undefined}
      >
        <div className="flex items-center gap-2">
          {step && (
            <div className="flex-shrink-0 h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center text-xs font-medium text-primary">
              {step}
            </div>
          )}
          <div className="flex-1">
            <p className="text-gray-800 leading-tight">{content}</p>
          </div>
          {(nextStep || navigateTo) && showArrow && <ArrowRight className="h-4 w-4 text-primary flex-shrink-0" />}
        </div>
      </div>
    </div>
  );
};

export default PathwayTooltip;
