import apiClient from "./client";
import type { Skip, SkipFilters } from "../../types";

export class SkipService {

  static async getSkipsByLocation(filters: SkipFilters): Promise<Skip[]> {
    try {
      const params = new URLSearchParams({
        postcode: filters.postcode,
        area: filters.area,
      });

      const response = await apiClient.get<Skip[]>(
        `/skips/by-location?${params}`,
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching skips:", error);
      throw new Error("Failed to fetch skip options. Please try again.");
    }
  }

  static async getSkipById(id: number): Promise<Skip> {
    try {
      const response = await apiClient.get<Skip>(`/skips/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching skip:", error);
      throw new Error("Failed to fetch skip details. Please try again.");
    }
  }

  static filterSkips(skips: Skip[], filters: Partial<SkipFilters>): Skip[] {
    return skips.filter((skip) => {
      if (filters.minSize && skip.size < filters.minSize) return false;
      if (filters.maxSize && skip.size > filters.maxSize) return false;
      if (
        filters.allowedOnRoad !== undefined &&
        skip.allowed_on_road !== filters.allowedOnRoad
      )
        return false;
      if (
        filters.allowsHeavyWaste !== undefined &&
        skip.allows_heavy_waste !== filters.allowsHeavyWaste
      )
        return false;
      return true;
    });
  }

  static sortSkipsBySize(
    skips: Skip[],
    direction: "asc" | "desc" = "asc",
  ): Skip[] {
    return [...skips].sort((a, b) => {
      return direction === "asc" ? a.size - b.size : b.size - a.size;
    });
  }
}
