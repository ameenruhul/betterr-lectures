
import React, { createContext, useContext, useState, useEffect } from 'react';

type OnboardingStep = 
  | 'dashboard'
  | 'create-course'
  | 'course-details'
  | 'upload-syllabus'
  | 'lecture-list'
  | 'lecture-panel'
  | 'workspace-tools'
  | 'ai-assistant'
  | 'complete';

interface OnboardingContextType {
  currentStep: OnboardingStep;
  isFirstTime: boolean;
  isOnboardingEnabled: boolean;
  setCurrentStep: (step: OnboardingStep) => void;
  nextStep: () => void;
  skipOnboarding: () => void;
  resetOnboarding: () => void;
  toggleOnboarding: () => void;
}

const STEPS_ORDER: OnboardingStep[] = [
  'dashboard',
  'create-course',
  'course-details',
  'upload-syllabus',
  'lecture-list',
  'complete'
];

const OnboardingContext = createContext<OnboardingContextType | undefined>(undefined);

export const OnboardingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentStep, setCurrentStep] = useState<OnboardingStep>('dashboard');
  const [isFirstTime, setIsFirstTime] = useState<boolean>(true);
  const [isOnboardingEnabled, setIsOnboardingEnabled] = useState<boolean>(true);
  
  // Load onboarding state from localStorage on initial render
  useEffect(() => {
    const savedOnboarding = localStorage.getItem('onboarding');
    if (savedOnboarding) {
      const { step, completed, enabled } = JSON.parse(savedOnboarding);
      if (completed) {
        setIsFirstTime(false);
      } else {
        setCurrentStep(step as OnboardingStep);
        setIsFirstTime(true);
      }
      setIsOnboardingEnabled(enabled !== undefined ? enabled : true);
    }
  }, []);
  
  // Save onboarding state to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('onboarding', JSON.stringify({
      step: currentStep,
      completed: !isFirstTime,
      enabled: isOnboardingEnabled
    }));
  }, [currentStep, isFirstTime, isOnboardingEnabled]);
  
  const nextStep = () => {
    const currentIndex = STEPS_ORDER.indexOf(currentStep);
    if (currentIndex < STEPS_ORDER.length - 1) {
      setCurrentStep(STEPS_ORDER[currentIndex + 1]);
    } else {
      // If we reach the end, mark onboarding as complete
      setIsFirstTime(false);
      setCurrentStep('complete');
    }
  };
  
  const skipOnboarding = () => {
    setIsFirstTime(false);
  };
  
  const resetOnboarding = () => {
    setCurrentStep('dashboard');
    setIsFirstTime(true);
  };

  const toggleOnboarding = () => {
    setIsOnboardingEnabled(prev => !prev);
    if (!isOnboardingEnabled && !isFirstTime) {
      // If re-enabling after having completed it once, start from beginning
      setCurrentStep('dashboard');
      setIsFirstTime(true);
    }
  };
  
  return (
    <OnboardingContext.Provider
      value={{
        currentStep,
        isFirstTime,
        isOnboardingEnabled,
        setCurrentStep,
        nextStep,
        skipOnboarding,
        resetOnboarding,
        toggleOnboarding
      }}
    >
      {children}
    </OnboardingContext.Provider>
  );
};

export const useOnboarding = () => {
  const context = useContext(OnboardingContext);
  if (context === undefined) {
    throw new Error('useOnboarding must be used within an OnboardingProvider');
  }
  return context;
};
