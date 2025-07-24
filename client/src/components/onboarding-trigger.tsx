import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { HelpCircle, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface OnboardingTriggerProps {
  onStartOnboarding: () => void;
  isVisible: boolean;
}

export function OnboardingTrigger({
  onStartOnboarding,
  isVisible,
}: OnboardingTriggerProps) {
  const [isDismissed, setIsDismissed] = useState(false);

  if (!isVisible || isDismissed) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        className="fixed bottom-6 right-6 z-40"
      >
        <div className="bg-primary text-primary-foreground rounded-lg shadow-lg p-4 max-w-sm">
          <div className="flex items-start justify-between mb-2">
            <div className="flex items-center space-x-2">
              <HelpCircle className="w-5 h-5" />
              <h3 className="font-semibold text-sm">
                New to S&D Intel Investigator?
              </h3>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsDismissed(true)}
              className="h-6 w-6 p-0 hover:bg-primary-foreground/20 text-primary-foreground"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>

          <p className="text-sm mb-3 opacity-90">
            Take a quick tour to learn how to effectively use our OSINT
            investigation tools.
          </p>

          <div className="flex space-x-2">
            <Button
              variant="secondary"
              size="sm"
              onClick={onStartOnboarding}
              className="flex-1"
            >
              Start Tour
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsDismissed(true)}
              className="hover:bg-primary-foreground/20 text-primary-foreground"
            >
              Skip
            </Button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

// Floating help button that's always accessible
export function HelpButton({
  onStartOnboarding,
}: {
  onStartOnboarding: () => void;
}) {
  return (
    <Button
      onClick={onStartOnboarding}
      size="sm"
      variant="outline"
      className="fixed bottom-6 left-6 z-30 shadow-lg hover:shadow-xl transition-shadow"
    >
      <HelpCircle className="w-4 h-4 mr-2" />
      Help & Tips
    </Button>
  );
}
