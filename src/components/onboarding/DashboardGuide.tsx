
import React, { useEffect, useState } from 'react';
import { useOnboarding } from '@/contexts/OnboardingContext';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles, CheckCircle } from 'lucide-react';

const DashboardGuide = () => {
  const { currentStep, isFirstTime, isGuidedMode, nextStep, skipOnboarding } = useOnboarding();
  const navigate = useNavigate();
  const [showTour, setShowTour] = useState(false);

  useEffect(() => {
    // Show the tour with slight delay for better UX
    if (isFirstTime && isGuidedMode && currentStep === 'dashboard') {
      const timer = setTimeout(() => {
        setShowTour(true);
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [isFirstTime, isGuidedMode, currentStep]);

  const handleNext = () => {
    nextStep(); // Move to 'new-course'
  };

  const handleSkip = () => {
    skipOnboarding();
    setShowTour(false);
  };

  if (!showTour || !isGuidedMode || currentStep !== 'dashboard') {
    return null;
  }

  return (
    <>
      <div className="fixed inset-0 bg-black/50 z-30 pointer-events-none" />
      <div className="fixed top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 pointer-events-auto">
        <div className="bg-white rounded-xl p-6 shadow-xl max-w-md animate-fade-in">
          <div className="flex items-center mb-3">
            <Sparkles className="h-6 w-6 text-primary mr-3" />
            <h2 className="text-xl font-bold">Welcome to Better Lectures!</h2>
          </div>
          <p className="mb-4 text-gray-600">
            Let's guide you through creating your first course and lecture. 
            The journey starts with the "New Course" button in the top right corner.
          </p>
          <div className="flex justify-end space-x-3 mt-6">
            <Button variant="outline" onClick={handleSkip}>
              Skip guide
            </Button>
            <Button onClick={handleNext}>
              Start Guide <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardGuide;
