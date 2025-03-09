
import React from 'react';
import { cn } from '@/lib/utils';
import { Info } from 'lucide-react';

interface OnboardingTooltipProps {
  content: string;
  position?: 'top' | 'right' | 'bottom' | 'left';
  className?: string;
  children: React.ReactNode;
}

const OnboardingTooltip: React.FC<OnboardingTooltipProps> = ({
  content,
  position = 'top',
  className,
  children
}) => {
  const tooltipPositions = {
    'top': 'bottom-full mb-2 left-1/2 -translate-x-1/2',
    'right': 'left-full ml-2 top-1/2 -translate-y-1/2',
    'bottom': 'top-full mt-2 left-1/2 -translate-x-1/2',
    'left': 'right-full mr-2 top-1/2 -translate-y-1/2',
  };

  return (
    <div className="group relative inline-block">
      {children}
      <div
        className={cn(
          'absolute hidden group-hover:block z-50 p-2 bg-gray-900 text-white text-xs rounded shadow-lg max-w-xs',
          tooltipPositions[position],
          className
        )}
      >
        <div className="flex items-center">
          <Info className="h-3 w-3 mr-1 text-primary-foreground" />
          {content}
        </div>
      </div>
    </div>
  );
};

export default OnboardingTooltip;
