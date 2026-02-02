"use client"

import type { CSSProperties } from "react"
import {
  CircleCheckIcon,
  InfoIcon,
  Loader2Icon,
  OctagonXIcon,
  TriangleAlertIcon,
} from "lucide-react"
import { useTheme } from "next-themes"
import { Toaster as Sonner, type ToasterProps } from "sonner"

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme()

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      duration={5000}
      icons={{
        success: <CircleCheckIcon className="size-4" />,
        info: <InfoIcon className="size-4" />,
        warning: <TriangleAlertIcon className="size-4" />,
        error: <OctagonXIcon className="size-4" />,
        loading: <Loader2Icon className="size-4 animate-spin" />,
      }}
      style={
        {
          // base / default toast
          "--normal-bg": "hsl(var(--popover))",
          "--normal-text": "hsl(var(--popover-foreground))",
          "--normal-border": "hsl(var(--border))",

          // success variant
          "--success-bg": "hsl(var(--primary))",
          "--success-text": "hsl(var(--primary-foreground))",
          "--success-border": "hsl(var(--primary))",

          // error / destructive variant
          "--error-bg": "hsl(var(--destructive))",
          "--error-text": "hsl(var(--destructive-foreground))",
          "--error-border": "hsl(var(--destructive))",

          // warning variant (use accent color)
          "--warning-bg": "hsl(var(--accent))",
          "--warning-text": "hsl(var(--accent-foreground))",
          "--warning-border": "hsl(var(--accent))",

          // info variant (use secondary color)
          "--info-bg": "hsl(var(--secondary))",
          "--info-text": "hsl(var(--secondary-foreground))",
          "--info-border": "hsl(var(--secondary))",

          "--border-radius": "var(--radius)",
        } as CSSProperties
      }
      {...props}
    />
  )
}

export { Toaster }
