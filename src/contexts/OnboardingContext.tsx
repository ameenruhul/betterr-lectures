
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
  isGuidedMode: boolean;
  isOnboardingEnabled: boolean;
  toggleGuidedMode: () => void;
  toggleOnboarding: () => void;
  setCurrentStep: (step: OnboardingStep) => void;
  nextStep: () => void;
  skipOnboarding: () => void;
  resetOnboarding: () => void;
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
  const [isGuidedMode, setIsGuidedMode] = useState<boolean>(true);
  const [isOnboardingEnabled, setIsOnboardingEnabled] = useState<boolean>(true);
  
  // Load onboarding state from localStorage on initial render
  useEffect(() => {
    const savedOnboarding = localStorage.getItem('onboarding');
    if (savedOnboarding) {
      const { step, completed, guidedMode, enabled } = JSON.parse(savedOnboarding);
      if (completed) {
        setIsFirstTime(false);
      } else {
        setCurrentStep(step as OnboardingStep);
        setIsFirstTime(true);
      }
      setIsGuidedMode(guidedMode !== undefined ? guidedMode : true);
      setIsOnboardingEnabled(enabled !== undefined ? enabled : true);
    }
  }, []);
  
  // Save onboarding state to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('onboarding', JSON.stringify({
      step: currentStep,
      completed: !isFirstTime,
      guidedMode: isGuidedMode,
      enabled: isOnboardingEnabled
    }));
  }, [currentStep, isFirstTime, isGuidedMode, isOnboardingEnabled]);
  
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

  const toggleGuidedMode = () => {
    setIsGuidedMode(prev => !prev);
  };

  const toggleOnboarding = () => {
    setIsOnboardingEnabled(prev => !prev);
  };
  
  return (
    <OnboardingContext.Provider
      value={{
        currentStep,
        isFirstTime,
        isGuidedMode,
        isOnboardingEnabled,
        toggleGuidedMode,
        toggleOnboarding,
        setCurrentStep,
        nextStep,
        skipOnboarding,
        resetOnboarding
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
