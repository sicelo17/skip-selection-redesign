import { z } from 'zod';

export const skipFiltersSchema = z.object({
  postcode: z.string().min(1, 'Postcode is required'),
  area: z.string().min(1, 'Area is required'),
  minSize: z.number().min(1).optional(),
  maxSize: z.number().min(1).optional(),
  allowedOnRoad: z.boolean().optional(),
  allowsHeavyWaste: z.boolean().optional(),
});

export const skipSchema = z.object({
  id: z.number(),
  size: z.number().min(1),
  hire_period_days: z.number().min(1),
  transport_cost: z.number().nullable(),
  per_tonne_cost: z.number().nullable(),
  price_before_vat: z.number().min(0),
  vat: z.number().min(0).max(100),
  postcode: z.string(),
  area: z.string(),
  forbidden: z.boolean(),
  created_at: z.string(),
  updated_at: z.string(),
  allowed_on_road: z.boolean(),
  allows_heavy_waste: z.boolean(),
});

export type SkipFiltersInput = z.infer<typeof skipFiltersSchema>;
export type SkipInput = z.infer<typeof skipSchema>;
