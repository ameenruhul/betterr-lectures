
import React from 'react';
import { cn } from '@/lib/utils';
import { useEffect } from 'react';

interface SpotlightProps {
  active: boolean;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  pulseAnimation?: boolean;
}

const Spotlight: React.FC<SpotlightProps> = ({ 
  active, 
  children, 
  className, 
  onClick,
  pulseAnimation = false
}) => {
  useEffect(() => {
    if (active) {
      // Scroll the element into view if it's active
      const element = document.getElementById('spotlight-active');
      if (element) {
        element.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'center' 
        });
      }
    }
  }, [active]);

  return (
    <div 
      id={active ? 'spotlight-active' : undefined}
      className={cn(
        'relative transition-all duration-300',
        active && 'z-40 ring-4 ring-primary/30 ring-offset-2 rounded-lg shadow-[0_0_0_9999px_rgba(0,0,0,0.5)]',
        pulseAnimation && active && 'animate-pulse',
        onClick && 'cursor-pointer',
        className
      )}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default Spotlight;
