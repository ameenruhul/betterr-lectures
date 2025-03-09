
import React from 'react';
import { ArrowRight, X, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface CoachMarkProps {
  title: string;
  description: string;
  position?: 'top' | 'right' | 'bottom' | 'left' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  onNext?: () => void;
  onSkip?: () => void;
  className?: string;
  isLastStep?: boolean;
}

const CoachMark: React.FC<CoachMarkProps> = ({
  title,
  description,
  position = 'bottom',
  onNext,
  onSkip,
  className,
  isLastStep = false,
}) => {
  const positionClasses = {
    'top': 'bottom-full mb-2',
    'right': 'left-full ml-2',
    'bottom': 'top-full mt-2',
    'left': 'right-full mr-2',
    'top-left': 'bottom-full right-0 mb-2',
    'top-right': 'bottom-full left-0 mb-2',
    'bottom-left': 'top-full right-0 mt-2',
    'bottom-right': 'top-full left-0 mt-2',
  };

  return (
    <div className={cn(
      'absolute z-50 w-64 bg-white rounded-lg shadow-lg border border-ai-magenta/10 p-4',
      positionClasses[position],
      className
    )}>
      <div className="flex items-start justify-between mb-2">
        <div className="flex items-center">
          <Info className="h-4 w-4 text-ai-magenta mr-2" />
          <h3 className="font-semibold text-sm text-gray-900">{title}</h3>
        </div>
        {onSkip && (
          <Button variant="ghost" size="icon" className="h-5 w-5" onClick={onSkip}>
            <X className="h-3 w-3" />
          </Button>
        )}
      </div>
      <p className="text-xs text-gray-600 mb-3">{description}</p>
      <div className="flex justify-end">
        {onSkip && (
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-xs mr-2 h-7 hover:text-ai-magenta"
            onClick={onSkip}
          >
            Skip tour
          </Button>
        )}
        {onNext && (
          <Button 
            size="sm" 
            className="text-xs h-7 bg-red-violet-gradient"
            onClick={onNext}
          >
            {isLastStep ? 'Finish' : 'Next'}
            {!isLastStep && <ArrowRight className="ml-1 h-3 w-3" />}
          </Button>
        )}
      </div>
    </div>
  );
};

export default CoachMark;
