
import React, { createContext, useContext, useState, useEffect } from 'react';

type OnboardingStep = 
  | 'dashboard'
  | 'new-course'
  | 'course-create'
  | 'upload-syllabus'
  | 'lecture-list'
  | 'lecture-editor'
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
  'new-course',
  'course-create',
  'upload-syllabus',
  'lecture-list',
  'lecture-editor',
  'ai-assistant',
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
      try {
        const { step, completed, guidedMode, enabled } = JSON.parse(savedOnboarding);
        if (completed) {
          setIsFirstTime(false);
        } else {
          setCurrentStep(step as OnboardingStep);
          setIsFirstTime(true);
        }
        setIsGuidedMode(guidedMode !== undefined ? guidedMode : true);
        setIsOnboardingEnabled(enabled !== undefined ? enabled : true);
      } catch (error) {
        console.error("Error parsing onboarding data from localStorage:", error);
        // Reset to defaults if there's an error
        setCurrentStep('dashboard');
        setIsFirstTime(true);
        setIsGuidedMode(true);
        setIsOnboardingEnabled(true);
      }
    }
  }, []);
  
  // Save onboarding state to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem('onboarding', JSON.stringify({
        step: currentStep,
        completed: !isFirstTime,
        guidedMode: isGuidedMode,
        enabled: isOnboardingEnabled
      }));
    } catch (error) {
      console.error("Error saving onboarding data to localStorage:", error);
    }
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
    console.log("ToggleGuidedMode called, current state:", isGuidedMode);
    setIsGuidedMode(prevMode => !prevMode);
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
