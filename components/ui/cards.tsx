"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

const Card = React.forwardRef<React.ElementRef<"div">, React.ComponentPropsWithoutRef<"div">>(
  ({ className, ...props }, ref) => (
    <div className={cn("rounded-md border shadow-sm", className)} ref={ref} {...props} />
  ),
)
Card.displayName = "Card"

const CardContent = React.forwardRef<React.ElementRef<"div">, React.ComponentPropsWithoutRef<"div">>(
  ({ className, ...props }, ref) => <div className={cn("p-6 pt-0", className)} ref={ref} {...props} />,
)
CardContent.displayName = "CardContent"

export { Card, CardContent }

