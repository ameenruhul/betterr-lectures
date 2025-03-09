
import React, { useState, useEffect } from 'react';
import { CheckCircle, X, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useOnboarding } from '@/contexts/OnboardingContext';

const OnboardingComplete = () => {
  const { currentStep, isFirstTime, resetOnboarding, toggleOnboarding, isOnboardingEnabled } = useOnboarding();
  const [visible, setVisible] = useState(false);
  
  useEffect(() => {
    // Show completion message when onboarding is complete
    if (currentStep === 'complete' && isFirstTime) {
      setVisible(true);
      
      // Automatically hide after 10 seconds
      const timer = setTimeout(() => {
        setVisible(false);
      }, 10000);
      
      return () => clearTimeout(timer);
    }
  }, [currentStep, isFirstTime]);
  
  if (!visible) return null;
  
  return (
    <div className="fixed bottom-4 right-4 bg-white shadow-xl rounded-lg p-4 w-80 border border-primary/20 z-50 animate-in slide-in-from-right-10">
      <Button 
        variant="ghost" 
        size="icon" 
        className="absolute top-2 right-2 h-6 w-6" 
        onClick={() => setVisible(false)}
      >
        <X className="h-4 w-4" />
      </Button>
      
      <div className="flex items-center mb-2">
        <CheckCircle className="text-green-500 h-6 w-6 mr-2" />
        <h3 className="font-semibold">Onboarding Complete!</h3>
      </div>
      
      <p className="text-sm text-gray-600 mb-3">
        You've completed the tour of Better Lectures. You're now ready to create amazing course content!
      </p>
      
      <div className="flex justify-end">
        <Button 
          variant="outline" 
          size="sm" 
          className="text-xs mr-2" 
          onClick={resetOnboarding}
        >
          Restart Tour
        </Button>
        <Button 
          variant={isOnboardingEnabled ? "default" : "outline"}
          size="sm" 
          className="text-xs mr-2" 
          onClick={toggleOnboarding}
        >
          {isOnboardingEnabled ? (
            <>
              <X className="h-3 w-3 mr-1" />
              Disable Tour
            </>
          ) : (
            <>
              <Info className="h-3 w-3 mr-1" />
              Enable Tour
            </>
          )}
        </Button>
        <Button 
          size="sm" 
          className="text-xs" 
          onClick={() => setVisible(false)}
        >
          Got it!
        </Button>
      </div>
    </div>
  );
};

export default OnboardingComplete;
