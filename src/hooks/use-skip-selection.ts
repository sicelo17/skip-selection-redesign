import { useState, useCallback } from "react";
import type { Skip } from "../types";

interface UseSkipSelectionReturn {
  selectedSkip: Skip | null;
  selectSkip: (skip: Skip) => void;
  clearSelection: () => void;
  isSelected: (skipId: number) => boolean;
}

export const useSkipSelection = (): UseSkipSelectionReturn => {
  const [selectedSkip, setSelectedSkip] = useState<Skip | null>(null);

  const selectSkip = useCallback((skip: Skip) => {
    setSelectedSkip(skip);
  }, []);

  const clearSelection = useCallback(() => {
    setSelectedSkip(null);
  }, []);

  const isSelected = useCallback(
    (skipId: number) => {
      return selectedSkip?.id === skipId;
    },
    [selectedSkip],
  );

  return {
    selectedSkip,
    selectSkip,
    clearSelection,
    isSelected,
  };
};
