## 3. Fonts — Google Fonts & Custom Fonts

The `next/font` module is the **only correct approach**. It:

- Self-hosts fonts at build time (no external requests to Google at runtime).
- Eliminates layout shift (CLS) via automatic `size-adjust` fallback.
- Preloads fonts on the routes where they are used.

### Best Practice: Centralize font definitions

Define all fonts in a **single file** and import from there. If you call the same font function in multiple files, Next.js creates multiple instances.

```ts
// src/lib/fonts.ts
import { Inter, Fira_Code } from "next/font/google"
import localFont from "next/font/local"

/*
  Always use variable fonts when available — a single file covers all weights
  and you don't need to enumerate weight arrays.
  The `variable` option outputs a CSS custom property (e.g. --font-inter)
  that you wire into @theme in globals.css.
*/
export const fontSans = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans", // Matches --font-sans in @theme
})

export const fontMono = Fira_Code({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-mono",
})

/*
  Local / custom font (e.g. a brand font not on Google Fonts).
  Place font files in src/app/fonts/ or public/fonts/.
  Using src/app/fonts/ is preferred — files are co-located and not public.
*/
export const fontBrand = localFont({
  src: [
    {
      path: "../app/fonts/BrandFont-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../app/fonts/BrandFont-Bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-brand",
  display: "swap",
})
```

### Apply fonts in the root layout

```tsx
// src/app/layout.tsx
import { fontSans, fontMono, fontBrand } from "@/lib/fonts"
import { ThemeProvider } from "@/components/providers/theme-provider"
import "./globals.css"

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      /*
        Spread all font variables onto <html> so they are available
        everywhere in the document. Tailwind picks them up via @theme.
      */
      className={`${fontSans.variable} ${fontMono.variable} ${fontBrand.variable}`}
    >
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
```

### Wire fonts into `globals.css`

```css
/* In globals.css @theme inline block */
@theme inline {
  --font-sans: var(--font-sans); /* maps to next/font CSS var */
  --font-mono: var(--font-mono);
  --font-brand: var(--font-brand);
}
```

Now you can use `font-sans`, `font-mono`, and `font-brand` as Tailwind utilities anywhere.
