import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { X, ChevronRight, ChevronLeft, HelpCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export interface HelpStep {
  id: string;
  title: string;
  content: string;
  target: string; // CSS selector for the element to highlight
  position: 'top' | 'bottom' | 'left' | 'right';
  nextStep?: string;
  prevStep?: string;
  isLast?: boolean;
}

interface HelpBubbleProps {
  steps: HelpStep[];
  currentStep: string | null;
  onStepChange: (stepId: string | null) => void;
  onComplete: () => void;
  onSkip: () => void;
}

export function HelpBubble({ steps, currentStep, onStepChange, onComplete, onSkip }: HelpBubbleProps) {
  const [targetRect, setTargetRect] = useState<DOMRect | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  const currentStepData = steps.find(step => step.id === currentStep);

  useEffect(() => {
    if (currentStep && currentStepData) {
      const targetElement = document.querySelector(currentStepData.target);
      if (targetElement) {
        const rect = targetElement.getBoundingClientRect();
        setTargetRect(rect);
        setIsVisible(true);
        
        // Scroll element into view if needed
        targetElement.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'center',
          inline: 'center'
        });
      }
    } else {
      setIsVisible(false);
    }
  }, [currentStep, currentStepData]);

  if (!currentStepData || !targetRect || !isVisible) return null;

  const getBubblePosition = () => {
    const bubbleWidth = 320;
    const bubbleHeight = 200;
    const offset = 20;

    let top = 0;
    let left = 0;

    switch (currentStepData.position) {
      case 'top':
        top = targetRect.top - bubbleHeight - offset;
        left = targetRect.left + (targetRect.width / 2) - (bubbleWidth / 2);
        break;
      case 'bottom':
        top = targetRect.bottom + offset;
        left = targetRect.left + (targetRect.width / 2) - (bubbleWidth / 2);
        break;
      case 'left':
        top = targetRect.top + (targetRect.height / 2) - (bubbleHeight / 2);
        left = targetRect.left - bubbleWidth - offset;
        break;
      case 'right':
        top = targetRect.top + (targetRect.height / 2) - (bubbleHeight / 2);
        left = targetRect.right + offset;
        break;
    }

    // Ensure bubble stays within viewport
    const maxLeft = window.innerWidth - bubbleWidth - 20;
    const maxTop = window.innerHeight - bubbleHeight - 20;
    
    left = Math.max(20, Math.min(left, maxLeft));
    top = Math.max(20, Math.min(top, maxTop));

    return { top, left };
  };

  const { top, left } = getBubblePosition();

  const handleNext = () => {
    if (currentStepData.nextStep) {
      onStepChange(currentStepData.nextStep);
    } else if (currentStepData.isLast) {
      onComplete();
    }
  };

  const handlePrev = () => {
    if (currentStepData.prevStep) {
      onStepChange(currentStepData.prevStep);
    }
  };

  const currentStepIndex = steps.findIndex(step => step.id === currentStep);
  const totalSteps = steps.length;

  return (
    <>
      {/* Overlay */}
      <div 
        className="fixed inset-0 bg-black/50 z-40"
        onClick={onSkip}
      />
      
      {/* Highlight ring around target element */}
      <div
        className="fixed z-50 pointer-events-none"
        style={{
          top: targetRect.top - 4,
          left: targetRect.left - 4,
          width: targetRect.width + 8,
          height: targetRect.height + 8,
          border: '3px solid #3b82f6',
          borderRadius: '8px',
        }}
      />

      {/* Help bubble */}
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className="fixed z-50"
          style={{ top, left, width: '320px' }}
        >
          <Card className="shadow-2xl border-2 border-primary/20">
            <CardContent className="p-4">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <HelpCircle className="w-5 h-5 text-primary" />
                  <h3 className="font-semibold text-sm">{currentStepData.title}</h3>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onSkip}
                  className="h-6 w-6 p-0 hover:bg-destructive/10"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
              
              <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                {currentStepData.content}
              </p>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-1">
                  <span className="text-xs text-muted-foreground">
                    {currentStepIndex + 1} of {totalSteps}
                  </span>
                  <div className="flex space-x-1 ml-2">
                    {steps.map((_, index) => (
                      <div
                        key={index}
                        className={`w-2 h-2 rounded-full ${
                          index === currentStepIndex ? 'bg-primary' : 'bg-muted'
                        }`}
                      />
                    ))}
                  </div>
                </div>
                
                <div className="flex space-x-2">
                  {currentStepData.prevStep && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handlePrev}
                      className="h-8 px-3"
                    >
                      <ChevronLeft className="w-4 h-4 mr-1" />
                      Back
                    </Button>
                  )}
                  
                  <Button
                    onClick={handleNext}
                    size="sm"
                    className="h-8 px-3"
                  >
                    {currentStepData.isLast ? 'Finish' : 'Next'}
                    {!currentStepData.isLast && <ChevronRight className="w-4 h-4 ml-1" />}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </AnimatePresence>
    </>
  );
}

// Hook for managing help bubble state
export function useHelpBubble() {
  const [currentStep, setCurrentStep] = useState<string | null>(null);
  const [isOnboarding, setIsOnboarding] = useState(false);

  const startOnboarding = (firstStepId: string) => {
    setCurrentStep(firstStepId);
    setIsOnboarding(true);
  };

  const nextStep = (stepId: string | null) => {
    setCurrentStep(stepId);
  };

  const skipOnboarding = () => {
    setCurrentStep(null);
    setIsOnboarding(false);
  };

  const completeOnboarding = () => {
    setCurrentStep(null);
    setIsOnboarding(false);
  };

  return {
    currentStep,
    isOnboarding,
    startOnboarding,
    nextStep,
    skipOnboarding,
    completeOnboarding,
  };
}