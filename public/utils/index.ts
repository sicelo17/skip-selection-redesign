import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatPrice(priceBeforeVat: number, vatRate: number): string {
  const totalPrice = priceBeforeVat * (1 + vatRate / 100);
  return Math.round(totalPrice).toString();
}

export function getSkipCapacityInfo(size: number): string {
  const capacityMap: { [key: number]: string } = {
    4: 'Perfect for small home projects, garden clearance',
    6: 'Ideal for kitchen/bathroom renovations, small office clearouts',
    8: 'Great for medium home renovations, garage clearouts',
    10: 'Suitable for large home projects, construction waste',
    12: 'Perfect for major renovations, large construction jobs',
    14: 'Ideal for commercial projects, large construction sites',
    16: 'Heavy-duty commercial and industrial waste',
    20: 'Large commercial and industrial projects',
    40: 'Major commercial and industrial operations'
  };
  
  return capacityMap[size] || 'Suitable for various waste disposal needs';
}
