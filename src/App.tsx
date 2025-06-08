"use client";

import { useEffect } from "react";
import { toast } from "sonner";
import { useSkips, useSkipSelection } from "./hooks";
import { SkipSelection } from "./components/features";
import { ErrorBoundary } from "./components/layout";
import { QueryProvider, ToastProvider } from "./providers";
import { formatPrice } from "./utils";

function SkipSelectionApp() {
  const { selectedSkip, selectSkip, clearSelection } = useSkipSelection();

  const {
    data: skips,
    isLoading,
    error,
    refetch,
  } = useSkips({
    postcode: "NR32",
    area: "Lowestoft",
  });

  useEffect(() => {
    if (error) {
      toast.error("Failed to load skip options", {
        description: error.message,
        action: {
          label: "Retry",
          onClick: () => refetch(),
        },
      });
    }
  }, [error, refetch]);

  const handleSelectSkip = (skip: any) => {
    selectSkip(skip);
    toast.success(`Selected ${skip.size} Yard Skip`, {
      description: `£${formatPrice(skip.price_before_vat, skip.vat)} for ${skip.hire_period_days} days`,
    });
  };

  const handleContinue = () => {
    if (selectedSkip) {
      toast.success("Proceeding to next step", {
        description: `You've selected a ${selectedSkip.size} Yard Skip for £${formatPrice(selectedSkip.price_before_vat, selectedSkip.vat)}`,
      });
    }
  };

  const handleBack = () => {
    toast.info("Going back to previous step");
    clearSelection();
   
  };

  if (error && !skips) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="text-center text-blue-800 max-w-md">
          <h2 className="text-2xl font-bold mb-4">
            Unable to load skip options
          </h2>
          <p className="text-blue-400 mb-6">{error.message}</p>
          <button
            onClick={() => refetch()}
            className="bg-400 text-blue-800 px-6 py-3 rounded-lg font-semibold hover:bg-blue-300 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <SkipSelection
      skips={skips || []}
      selectedSkip={selectedSkip}
      onSelectSkip={handleSelectSkip}
      onContinue={handleContinue}
      onBack={handleBack}
      isLoading={isLoading}
    />
  );
}

function App() {
  return (
    <ErrorBoundary>
      <QueryProvider>
        <SkipSelectionApp />
        <ToastProvider />
      </QueryProvider>
    </ErrorBoundary>
  );
}

export default App;
