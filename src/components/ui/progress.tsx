import * as React from "react"
import { cn } from "../../utils"

interface ProgressStepProps {
  children: React.ReactNode
  isCompleted?: boolean
  isActive?: boolean
  isLast?: boolean
  className?: string
}

export function ProgressStep({
  children,
  isCompleted = false,
  isActive = false,
  isLast = false,
  className,
}: ProgressStepProps) {
  return (
    <div className={cn("flex items-center", className)}>
      <div
        className={cn(
          "flex items-center gap-2 text-sm font-medium transition-colors",
          {
            "text-primary": isActive,
            "text-green-600": isCompleted,
            "text-muted-foreground": !isActive && !isCompleted,
          }
        )}
      >
        {children}
      </div>
      {!isLast && (
        <div
          className={cn(
            "ml-4 h-0.5 w-8 transition-colors",
            {
              "bg-green-600": isCompleted,
              "bg-muted": !isCompleted,
            }
          )}
        />
      )}
    </div>
  )
}

interface ProgressBarProps {
  children: React.ReactNode
  className?: string
}

export function ProgressBar({ children, className }: ProgressBarProps) {
  return (
    <div
      className={cn(
        "flex items-center justify-center gap-4 flex-wrap",
        className
      )}
    >
      {children}
    </div>
  )
}
