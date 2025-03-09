
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface BackNavigationProps {
  previousPage?: string;
  previousPagePath?: string;
}

const BackNavigation = ({ previousPage = 'Dashboard', previousPagePath = '/dashboard' }: BackNavigationProps) => {
  const navigate = useNavigate();
  
  return (
    <Button 
      variant="ghost" 
      size="sm" 
      onClick={() => navigate(previousPagePath)} 
      className="flex items-center text-gray-700 hover:text-primary transition-colors -ml-2 mb-2 group"
    >
      <ChevronLeft className="h-4 w-4 mr-1 text-primary group-hover:translate-x-[-2px] transition-transform" />
      <span className="font-medium">Back to {previousPage}</span>
    </Button>
  );
};

export default BackNavigation;
