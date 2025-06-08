import React from "react";
import { motion } from "framer-motion";
import { Info } from "lucide-react";
import type { Skip } from "../../types/index.ts";
import { formatPrice, getSkipCapacityInfo, cn } from "../../utils";
import { Card, CardContent, Button, Badge } from "../ui";
import { useResponsive } from "../../hooks";

interface SkipCardProps {
  skip: Skip;
  isSelected: boolean;
  onSelect: (skip: Skip) => void;
  index: number;
}

export function SkipCard({ skip, isSelected, onSelect, index }: SkipCardProps) {
  const { isMobile } = useResponsive();

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
    hover: isMobile ? {} : { y: -4, scale: 1.02 },
  };

  const totalPrice = formatPrice(skip.price_before_vat, skip.vat);

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      transition={{ delay: index * 0.1, duration: 0.3 }}
      className="h-full"
    >
      <Card
        className={cn(
          "h-full cursor-pointer border-2 transition-all duration-300 hover:shadow-lg",
          {
            "border-primary ring-2 ring-primary/20": isSelected,
            "border-border hover:border-primary/50": !isSelected,
          },
        )}
        onClick={() => onSelect(skip)}
      >
        {/* Skip Visual */}
        <div className="relative h-36 md:h-44 bg-gradient-to-br from-blue-300 to-blue-600 rounded-t-lg overflow-hidden">
          {/* Skip Size Badge */}
          <div className="absolute top-3 right-3 bg-blue-200 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-semibold text-blue-900">
            {skip.size} Yards
          </div>

          <div className="w-full h-60 flex items-center justify-center bg-white">
            <img src="/images/4-yarder-skip.jpg" alt="4 yard skip" className="object-contain h-full" />
          </div>


          {/* Selection Indicator */}
          {isSelected && (
            <div className="absolute top-0 left-0 right-0 h-1 bg-primary" />
          )}
        </div>

        <CardContent className="p-4 md:p-6 flex flex-col h-[calc(100%-9rem)] text-blue-800 md:h-[calc(100%-11rem)]">
          {/* Title and Hire Period */}
          <div className="mb-3">
            <h3 className="text-xl md:text-2xl font-bold text-foreground mb-1">
              {skip.size} Yard Skip
            </h3>
            <p className="text-sm text-muted-foreground">
              {skip.hire_period_days} day hire period
            </p>
          </div>

          {/* Price */}
          <div className="mb-4">
            <span className="text-2xl md:text-3xl font-bold text-blue-800">
              £{totalPrice}
            </span>
          </div>

          {/* Capacity Info (Desktop Only) */}
          {!isMobile && (
            <div className="mb-4 flex items-start gap-2 text-sm text-muted-foreground text-blue-800">
              <Info size={14} className="mt-0.5 flex-shrink-0 " />
              <span className="leading-relaxed">
                {getSkipCapacityInfo(skip.size)}
              </span>
            </div>
          )}

          {/* Feature Badges */}
          <div className="flex flex-wrap gap-2 mb-6 flex-1">
            {skip.allowed_on_road ? (
                <Badge variant="success" className="text-xs">
                  {isMobile ? "Road OK" : "Allowed on road"}
                </Badge>
              ) : (
                <Badge variant="destructive" className="text-xs">
                  {isMobile ? "No Road" : "Not Road Suitable"}
                </Badge>
              )}

            {skip.allows_heavy_waste && (
              <Badge variant="warning" className="text-xs">
                {isMobile ? "Heavy" : "Heavy Waste"}
              </Badge>
            )}
            <Badge variant="info" className="text-xs">
              {skip.size} {isMobile ? "yd³" : "Cubic Yards"}
            </Badge>
          </div>

          {/* Select Button */}
          <Button
            className={cn("w-full transition-all duration-200", {
              "bg-blue-300 hover:bg-blue-500": isSelected,
              "bg-blue-100 hover:bg-blue-200 text-blue-800":
                !isSelected,
            })}
            size={isMobile ? "default" : "lg"}
          >
            {isSelected ? (
              <>Selected ✓</>
            ) : (
              <>Select This Skip {!isMobile && "→"}</>
            )}
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
}
