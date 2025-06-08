import React from "react";
import {
  ArrowLeft,
  ArrowRight,
  MapPin,
  Calendar,
  Truck,
  Weight,
} from "lucide-react";
import type { Skip } from "../../types";
import { useResponsive } from "../../hooks";
import { Button, ProgressBar, ProgressStep, LoadingSpinner } from "../ui";
import { SkipCard } from "./skip-card";
import { SkipService } from "../../lib/api";

interface SkipSelectionProps {
  skips: Skip[];
  selectedSkip: Skip | null;
  onSelectSkip: (skip: Skip) => void;
  onContinue: () => void;
  onBack: () => void;
  isLoading?: boolean;
}

export function SkipSelection({
  skips,
  selectedSkip,
  onSelectSkip,
  onContinue,
  onBack,
  isLoading = false,
}: SkipSelectionProps) {
  const { isMobile } = useResponsive();

  // Sort skips by size for better UX
  const sortedSkips = SkipService.sortSkipsBySize(skips);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-600 via-purple-600 to-purple-800 flex items-center justify-center p-4">
        <div className="text-center text-white">
          <LoadingSpinner size="lg" className="mx-auto mb-4" />
          <h2 className="text-xl font-semibold mb-2">
            Loading skip options...
          </h2>
          <p className="text-blue-100">
            Please wait while we fetch the available skips
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 md:mb-12">
          <h1 className="text-3xl md:text-5xl font-bold text-blue-700 mb-3 md:mb-4">
            Choose Your Skip Size
          </h1>
          <p className="text-lg md:text-xl text-blue-400 max-w-2xl mx-auto">
            Select the skip size that best suits your needs
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8 md:mb-12">
          <ProgressBar className="px-4">
            <ProgressStep isCompleted>
              <MapPin size={isMobile ? 14 : 16} />
              {!isMobile && "Postcode"}
            </ProgressStep>
            <ProgressStep isCompleted>
              <Calendar size={isMobile ? 14 : 16} />
              {!isMobile && "Waste Type"}
            </ProgressStep>
            <ProgressStep isActive>
              <Truck size={isMobile ? 14 : 16} />
              {isMobile ? "Skip" : "Select Skip"}
            </ProgressStep>
            <ProgressStep>
              <Weight size={isMobile ? 14 : 16} />
              {isMobile ? "Permit" : "Permit Check"}
            </ProgressStep>
            <ProgressStep>
              <Calendar size={isMobile ? 14 : 16} />
              {isMobile ? "Date" : "Choose Date"}
            </ProgressStep>
            <ProgressStep isLast>💳 {!isMobile && "Payment"}</ProgressStep>
          </ProgressBar>
        </div>

        {/* Skip Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-8 md:mb-12">
          {sortedSkips.map((skip, index) => (
            <SkipCard
              key={skip.id}
              skip={skip}
              isSelected={selectedSkip?.id === skip.id}
              onSelect={onSelectSkip}
              index={index}
            />
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 max-w-4xl mx-auto">
          <Button
  variant="outline"
  size={isMobile ? "default" : "lg"}
  onClick={onBack}
  className="w-full sm:w-auto min-w-[140px] border-blue-200 text-blue-800 hover:bg-blue-50 hover:border-blue-300"
>
  <ArrowLeft size={18} className={isMobile ? "mr-1" : "mr-2"} />
  Back
</Button>


          <Button
            size={isMobile ? "default" : "lg"}
            disabled={!selectedSkip}
            onClick={onContinue}
            className="w-full sm:w-auto min-w-[140px] bg-green-600 hover:bg-green-700 text-white"
          >
            Continue
            <ArrowRight size={18} className={isMobile ? "ml-1" : "ml-2"} />
          </Button>
        </div>
      </div>
    </div>
  );
}
