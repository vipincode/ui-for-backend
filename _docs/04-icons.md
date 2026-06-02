## 4. Icons — Centralized react-icons & Lucide

### Install

```bash
npm install react-icons lucide-react
```

### The Problem

Importing icons ad-hoc across every component creates:

- Inconsistent icon sizes and styles.
- Repetitive imports scattered everywhere.
- Difficult to swap icon libraries later.

### The Solution: A centralized icon barrel file

```ts
// src/components/icons/index.ts
/*
  All icons in the app are imported and re-exported from here.

  Rules:
  - Lucide is the primary library (matches Shadcn's defaults).
  - react-icons fills gaps (brand logos, specialist icons).
  - Every icon gets a semantic alias so consumers never know the source.
  - To swap an icon, change it in one place only.
*/

// ─── Lucide Icons ──────────────────────────────────────────────────────────
export {
  // Navigation
  Menu as IconMenu,
  X as IconClose,
  ChevronDown as IconChevronDown,
  ChevronRight as IconChevronRight,
  ArrowLeft as IconArrowLeft,
  ArrowRight as IconArrowRight,

  // Actions
  Search as IconSearch,
  Plus as IconPlus,
  Pencil as IconEdit,
  Trash2 as IconDelete,
  Copy as IconCopy,
  Download as IconDownload,
  Upload as IconUpload,
  RefreshCw as IconRefresh,

  // Status
  Check as IconCheck,
  AlertCircle as IconAlert,
  AlertTriangle as IconWarning,
  Info as IconInfo,
  Loader2 as IconSpinner,

  // Theme
  Sun as IconSun,
  Moon as IconMoon,
  Monitor as IconSystem,

  // User
  User as IconUser,
  LogOut as IconLogout,
  Settings as IconSettings,
} from "lucide-react"

// ─── react-icons (Brand / Social) ─────────────────────────────────────────
export { FaGithub as IconGithub } from "react-icons/fa"
export { FaGoogle as IconGoogle } from "react-icons/fa"
export { FaTwitter as IconTwitter } from "react-icons/fa"
export { SiVercel as IconVercel } from "react-icons/si"
export { SiSupabase as IconSupabase } from "react-icons/si"
```

### Usage

```tsx
// In any component — the import source is always the same
import { IconSearch, IconGithub, IconSpinner } from "@/components/icons"

export function SearchBar() {
  return (
    <div className="relative">
      <IconSearch className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
      <input className="pl-9 ..." />
    </div>
  )
}
```

### Optional: A typed Icon wrapper for consistent sizing

```tsx
// src/components/icons/icon.tsx
import type { LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"

interface IconProps {
  icon: LucideIcon | React.ComponentType<{ className?: string }>
  size?: "xs" | "sm" | "md" | "lg"
  className?: string
}

const sizeMap = {
  xs: "size-3",
  sm: "size-4",
  md: "size-5",
  lg: "size-6",
} as const

export function Icon({ icon: IconComponent, size = "md", className }: IconProps) {
  return <IconComponent className={cn(sizeMap[size], className)} />
}
```
