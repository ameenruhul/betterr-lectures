
import React, { useEffect, useState } from 'react';
import { useOnboarding } from '@/contexts/OnboardingContext';
import CoachMark from './CoachMark';
import Spotlight from './Spotlight';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles, Info, CheckCircle } from 'lucide-react';

const DashboardGuide = () => {
  const { currentStep, isFirstTime, isOnboardingEnabled, nextStep, skipOnboarding } = useOnboarding();
  const navigate = useNavigate();
  const [showTour, setShowTour] = useState(false);

  useEffect(() => {
    // Show the tour with slight delay for better UX
    if (isFirstTime && isOnboardingEnabled) {
      const timer = setTimeout(() => {
        setShowTour(true);
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [isFirstTime, isOnboardingEnabled]);

  const handleNext = () => {
    nextStep();
  };

  const handleSkip = () => {
    skipOnboarding();
    setShowTour(false);
  };

  if (!showTour || !isOnboardingEnabled) {
    return null;
  }

  // Define tour steps
  const renderTourStep = () => {
    switch(currentStep) {
      case 'dashboard':
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
                  This interactive tour will help you discover how to create engaging lectures, 
                  assessments, and teaching materials that will transform your teaching practice.
                </p>
                <div className="flex justify-end space-x-3 mt-6">
                  <Button variant="outline" onClick={handleSkip}>
                    Skip tour
                  </Button>
                  <Button onClick={handleNext}>
                    Start Tour <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </>
        );
        
      case 'create-course':
        return (
          <>
            <div className="fixed inset-0 z-30 pointer-events-none" />
            <Spotlight active={true} className="fixed z-50 pointer-events-none">
              <div className="pointer-events-auto">
                <CoachMark
                  title="Quick Actions"
                  description="Start with these powerful tools to instantly improve your teaching materials."
                  position="bottom"
                  onNext={handleNext}
                  onSkip={handleSkip}
                  className="w-80"
                />
              </div>
            </Spotlight>
          </>
        );
        
      case 'course-details':
        return (
          <>
            <div className="fixed inset-0 z-30 pointer-events-none" />
            <Spotlight active={true} className="fixed z-50 pointer-events-none">
              <div className="pointer-events-auto">
                <CoachMark
                  title="Teaching Tools"
                  description="Explore our specialized tools designed to enhance different aspects of your teaching."
                  position="top"
                  onNext={handleNext}
                  onSkip={handleSkip}
                  className="w-80"
                />
              </div>
            </Spotlight>
          </>
        );
        
      case 'upload-syllabus':
        return (
          <>
            <div className="fixed inset-0 z-30 pointer-events-none" />
            <Spotlight active={true} className="fixed z-50 pointer-events-none">
              <div className="pointer-events-auto">
                <CoachMark
                  title="Teaching Excellence Tips"
                  description="Find inspiration and evidence-based strategies to improve your teaching effectiveness."
                  position="right"
                  onNext={handleNext}
                  onSkip={handleSkip}
                  className="w-80"
                />
              </div>
            </Spotlight>
          </>
        );
        
      case 'lecture-list':
        return (
          <>
            <div className="fixed inset-0 z-30 pointer-events-none" />
            <Spotlight active={true} className="fixed z-50 pointer-events-none">
              <div className="pointer-events-auto">
                <CoachMark
                  title="Getting Started Guide"
                  description="Follow these simple steps to begin creating better lectures right away."
                  position="left"
                  onNext={handleNext}
                  onSkip={handleSkip}
                  className="w-80"
                />
              </div>
            </Spotlight>
          </>
        );
        
      case 'complete':
        return (
          <>
            <div className="fixed inset-0 bg-black/50 z-30 pointer-events-none" />
            <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 pointer-events-auto">
              <div className="bg-white rounded-xl p-6 shadow-xl max-w-md animate-scale-in">
                <div className="flex items-center mb-3">
                  <CheckCircle className="h-6 w-6 text-green-500 mr-3" />
                  <h2 className="text-xl font-bold">Tour Complete!</h2>
                </div>
                <p className="mb-4 text-gray-600">
                  You're now ready to create amazing lectures and teaching materials. 
                  Remember, you can restart this tour anytime from the dashboard.
                </p>
                <div className="flex justify-end space-x-3 mt-6">
                  <Button onClick={() => {
                    skipOnboarding();
                    setShowTour(false);
                  }}>
                    Get Started
                  </Button>
                </div>
              </div>
            </div>
          </>
        );
        
      default:
        return null;
    }
  };

  return renderTourStep();
};

export default DashboardGuide;
