"use client"

import { Button } from "@/components/ui/button"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import * as React from "react"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  /*
    Avoid hydration mismatch: the server doesn't know the user's theme.
    Only render the correct icon after mounting on the client.
    useSyncExternalStore returns the server snapshot (false) on the server
    and the client snapshot (true) after hydration.
  */
  const mounted = React.useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  )

  if (!mounted) {
    return <Button variant="ghost" size="icon" aria-label="Toggle theme" />
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      aria-label="Toggle theme"
    >
      {theme === "dark" ? <Sun className="size-4" /> : <Moon className="size-4" />}
    </Button>
  )
}
