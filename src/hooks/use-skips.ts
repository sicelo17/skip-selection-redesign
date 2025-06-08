import { useQuery } from "@tanstack/react-query";
import type { UseQueryResult } from "@tanstack/react-query";
import type { Skip, SkipFilters } from "../types";
import { SkipService } from "../lib/api";

export const useSkips = (
  filters: SkipFilters,
): UseQueryResult<Skip[], Error> => {
  return useQuery({
    queryKey: ["skips", filters.postcode, filters.area],
    queryFn: () => SkipService.getSkipsByLocation(filters),
    enabled: !!filters.postcode && !!filters.area,
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });
};

export const useSkipById = (id: number): UseQueryResult<Skip, Error> => {
  return useQuery({
    queryKey: ["skip", id],
    queryFn: () => SkipService.getSkipById(id),
    enabled: !!id,
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
};
