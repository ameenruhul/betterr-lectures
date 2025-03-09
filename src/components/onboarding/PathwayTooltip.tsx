
import React, { ReactNode } from 'react';
import { useOnboarding } from '@/contexts/OnboardingContext';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PathwayTooltipProps {
  children: ReactNode;
  content: string;
  position?: 'top' | 'right' | 'bottom' | 'left';
  className?: string;
  showArrow?: boolean;
}

const PathwayTooltip: React.FC<PathwayTooltipProps> = ({
  children,
  content,
  position = 'top',
  className,
  showArrow = true
}) => {
  const { isGuidedMode } = useOnboarding();

  if (!isGuidedMode) {
    return <>{children}</>;
  }

  const positionClasses = {
    'top': 'bottom-full mb-2 left-1/2 -translate-x-1/2',
    'right': 'left-full ml-2 top-1/2 -translate-y-1/2',
    'bottom': 'top-full mt-2 left-1/2 -translate-x-1/2',
    'left': 'right-full mr-2 top-1/2 -translate-y-1/2',
  };

  return (
    <div className="group relative">
      {children}
      <div
        className={cn(
          'absolute z-50 hidden group-hover:block p-2 bg-white text-gray-800 text-xs rounded shadow-md max-w-xs border border-gray-200',
          positionClasses[position],
          className
        )}
      >
        <div className="flex items-center gap-1">
          {content}
          {showArrow && <ArrowRight className="h-3 w-3 text-primary" />}
        </div>
      </div>
    </div>
  );
};

export default PathwayTooltip;
