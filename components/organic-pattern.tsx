"use client"

import { cn } from "@/lib/utils"

interface OrganicPatternProps {
  className?: string
  opacity?: number
}

export function OrganicPattern({ className, opacity = 0.1 }: OrganicPatternProps) {
  return (
    <svg
      className={cn("absolute pointer-events-none", className)}
      viewBox="0 0 400 400"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ opacity }}
    >
      <path
        d="M50 200C50 150 100 100 150 100C200 100 250 150 250 200C250 250 200 300 150 300C100 300 50 250 50 200Z"
        fill="currentColor"
      />
      <path
        d="M150 50C200 50 250 100 250 150C250 200 200 250 150 250C100 250 50 200 50 150C50 100 100 50 150 50Z"
        fill="currentColor"
        opacity="0.6"
      />
      <path
        d="M250 150C300 150 350 200 350 250C350 300 300 350 250 350C200 350 150 300 150 250C150 200 200 150 250 150Z"
        fill="currentColor"
        opacity="0.4"
      />
    </svg>
  )
}
