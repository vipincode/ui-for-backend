## 2. Light & Dark Mode with next-themes

### Install

```bash
npm install next-themes
```

### Step 1 — `ThemeProvider` wrapper

Create a thin client component so the provider can run on the client while your layout stays a Server Component.

```tsx
// src/components/providers/theme-provider.tsx
"use client"

import { ThemeProvider as NextThemesProvider } from "next-themes"
import type { ThemeProviderProps } from "next-themes"

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}
```

### Step 2 — Root layout

```tsx
// src/app/layout.tsx
import type { Metadata } from "next"
import { ThemeProvider } from "@/components/providers/theme-provider"
import "./globals.css"

export const metadata: Metadata = {
  title: "My App",
  description: "...",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    /*
      suppressHydrationWarning is REQUIRED.
      next-themes updates the class on <html> before React hydrates,
      which would cause a mismatch warning without this prop.
    */
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="class" // Adds/removes .dark on <html>
          defaultTheme="system" // Respects OS preference on first visit
          enableSystem // Enables system theme detection
          disableTransitionOnChange // Prevents flash during theme switch
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
```

### Step 3 — Theme toggle component

```tsx
// src/components/ui/theme-toggle.tsx
"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  /*
    Avoid hydration mismatch: the server doesn't know the user's theme.
    Only render the correct icon after mounting on the client.
    useSyncExternalStore returns the server snapshot (false) on the server
    and the client snapshot (true) after hydration.

    `useSyncExternalStore` is a React hook used to subscribe to data that lives outside React and keep your UI synchronized with it.

    Think of it like:
    React says: "Tell me how to read your external data, and tell me when it changes — I'll re-render automatically."
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
```

### Step 4 — Confirm `globals.css` has the dark variant

This line (shown in Section 1) is what makes `dark:` utilities work with next-themes in Tailwind v4:

```css
@custom-variant dark (&:where(.dark, .dark *));
```
