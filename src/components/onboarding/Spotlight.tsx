
import React from 'react';
import { cn } from '@/lib/utils';

interface SpotlightProps {
  active: boolean;
  children: React.ReactNode;
  className?: string;
}

const Spotlight: React.FC<SpotlightProps> = ({ 
  active, 
  children, 
  className 
}) => {
  return (
    <div className={cn(
      'relative transition-all duration-300',
      active && 'z-40 ring-4 ring-primary/30 ring-offset-2 rounded-lg shadow-[0_0_0_9999px_rgba(0,0,0,0.5)]',
      className
    )}>
      {children}
    </div>
  );
};

export default Spotlight;
