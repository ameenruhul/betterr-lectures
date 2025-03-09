
import React, { useEffect, useState } from 'react';
import { useOnboarding } from '@/contexts/OnboardingContext';
import CoachMark from './CoachMark';
import Spotlight from './Spotlight';
import { useNavigate } from 'react-router-dom';

const DashboardGuide = () => {
  const { currentStep, isFirstTime, isOnboardingEnabled, nextStep, skipOnboarding } = useOnboarding();
  const navigate = useNavigate();
  const [showCoachMark, setShowCoachMark] = useState(false);

  useEffect(() => {
    // Show coach mark if this is the first step and onboarding is enabled
    if (currentStep === 'dashboard' && isFirstTime && isOnboardingEnabled) {
      const timer = setTimeout(() => {
        setShowCoachMark(true);
      }, 1000); // Slight delay for better UX

      return () => clearTimeout(timer);
    }
  }, [currentStep, isFirstTime, isOnboardingEnabled]);

  const handleNext = () => {
    // Navigate to the course creation page
    navigate('/courses/create');
    nextStep();
  };

  if (!showCoachMark || currentStep !== 'dashboard' || !isOnboardingEnabled) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 pointer-events-none">
      <div className="absolute top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-auto">
        <CoachMark
          title="Welcome to Better Lectures!"
          description="This guided tour will show you how to create and manage courses, lectures, and use our powerful teaching tools. Let's get started!"
          position="bottom"
          onNext={handleNext}
          onSkip={skipOnboarding}
          className="w-80"
        />
      </div>
    </div>
  );
};

export default DashboardGuide;
