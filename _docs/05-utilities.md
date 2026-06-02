---

## 6. Visual Tokens — Shadow, Gradient, Border-Radius, Background-Image

All four of these token namespaces follow the same pattern in Tailwind v4:

- Define raw values in `:root` / `.dark` (so they can change per theme).
- Expose them as Tailwind utilities via `@theme inline`.

The naming convention is strict — Tailwind uses the prefix to know which utility to generate:

| Token prefix           | Utilities generated                          |
| ---------------------- | -------------------------------------------- |
| `--shadow-*`           | `shadow-*`, `inset-shadow-*`                 |
| `--radius-*`           | `rounded-*`                                  |
| `--background-image-*` | `bg-*` (image variant)                       |
| `--color-*`            | `bg-*`, `text-*`, `border-*`, `fill-*`, etc. |

Gradients are special: they are defined as `--background-image-*` for named gradient utilities, or used inline via `bg-linear-[...]` / `bg-radial-[...]`.

---

### Border-Radius

Shadcn already uses `--radius` as a single knob. The best production approach is to **keep that knob and derive a full scale from it** — every component's border-radius tracks together when you change one value.

```css
/* globals.css — :root */
:root {
  /* The one knob. Change this to restyle every border-radius in the app. */
  --radius: 0.625rem; /* 10px — matches shadcn default */
}

/* @theme inline — expose the derived scale as Tailwind utilities */
@theme inline {
  --radius-none: 0px;
  --radius-xs:   calc(var(--radius) - 6px);  /* 4px  → rounded-xs  */
  --radius-sm:   calc(var(--radius) - 4px);  /* 6px  → rounded-sm  */
  --radius-md:   calc(var(--radius) - 2px);  /* 8px  → rounded-md  */
  --radius-lg:   var(--radius);              /* 10px → rounded-lg  */
  --radius-xl:   calc(var(--radius) + 4px);  /* 14px → rounded-xl  */
  --radius-2xl:  calc(var(--radius) + 8px);  /* 18px → rounded-2xl */
  --radius-3xl:  calc(var(--radius) + 16px); /* 26px → rounded-3xl */
  --radius-full: 9999px;                     /* pill → rounded-full */
}
```

Usage in components:

```tsx
<div className="rounded-lg">…</div>    {/* 10px — your base radius */}
<div className="rounded-xl">…</div>    {/* 14px */}
<div className="rounded-full">…</div>  {/* pill */}

{/* Concentric radius trick: inner element subtracts the gap */}
<div className="rounded-xl p-2">
  <div className="rounded-[calc(var(--radius-xl)-8px)]">…</div>
</div>
```

---


### Box Shadow

In Tailwind v4, `--shadow-*` tokens map to the `shadow-*` utilities. Define them as plain CSS shadow values — no JavaScript object syntax needed.

```css
/* globals.css — :root */
:root {
  /* Semantic shadow tokens. Values here can also be swapped per theme. */
  --shadow-color: oklch(0 0 0 / 8%);        /* default shadow tint */
  --shadow-color-dark: oklch(0 0 0 / 30%);  /* stronger in dark mode */
}

/* .dark swaps the shadow tint so shadows feel natural in dark UIs */
.dark {
  --shadow-color: oklch(0 0 0 / 25%);
}

/* @theme inline — expose named shadow utilities */
@theme inline {
  /* Elevation scale */
  --shadow-xs:  0 1px 2px 0 var(--shadow-color);
  --shadow-sm:  0 1px 3px 0 var(--shadow-color), 0 1px 2px -1px var(--shadow-color);
  --shadow-md:  0 4px 6px -1px var(--shadow-color), 0 2px 4px -2px var(--shadow-color);
  --shadow-lg:  0 10px 15px -3px var(--shadow-color), 0 4px 6px -4px var(--shadow-color);
  --shadow-xl:  0 20px 25px -5px var(--shadow-color), 0 8px 10px -6px var(--shadow-color);
  --shadow-2xl: 0 25px 50px -12px var(--shadow-color);

  /* Semantic / component-level tokens */
  --shadow-card:   0 2px 8px -2px var(--shadow-color), 0 1px 3px -1px var(--shadow-color);
  --shadow-dialog: 0 20px 60px -15px oklch(0 0 0 / 35%);
  --shadow-popover:0 4px 20px -4px var(--shadow-color);

  /* Colored glow shadows (brand accents, focus rings) */
  --shadow-brand: 0 0 0 3px oklch(0.55 0.22 260 / 35%);
  --shadow-error: 0 0 0 3px oklch(0.577 0.245 27 / 35%);
}
```

Usage:

```tsx
<div className="shadow-card">…</div>
<div className="shadow-lg">…</div>
<div className="shadow-brand">…</div>  {/* colored glow focus ring */}

{/* v4 also supports inset shadows natively */}
<input className="inset-shadow-sm" />
```

> **Dark mode tip**: because `--shadow-color` is a CSS variable referenced inside the shadow value, swapping it in `.dark` automatically updates every shadow utility — no extra dark: variants needed.

---


### Gradients

Tailwind v4 ships a powerful gradient API. There are two ways to use gradients in the theme:

**Option A — Named background-image tokens** (for reusable, brand gradients):

```css
/* globals.css */
:root {
  /* Named gradient tokens — accessible via CSS var() outside Tailwind too */
  --gradient-brand:      linear-gradient(135deg, oklch(0.55 0.22 260), oklch(0.45 0.25 300));
  --gradient-brand-soft: linear-gradient(135deg, oklch(0.55 0.22 260 / 15%), oklch(0.45 0.25 300 / 15%));
  --gradient-hero:       radial-gradient(ellipse 80% 60% at 50% -10%, oklch(0.55 0.22 260 / 20%), transparent);
  --gradient-glow:       radial-gradient(circle at center, oklch(0.55 0.22 260 / 30%) 0%, transparent 70%);
  --gradient-card-dark:  linear-gradient(145deg, oklch(0.2 0.02 260), oklch(0.15 0 0));
  --gradient-shimmer:    linear-gradient(90deg, transparent 0%, oklch(1 0 0 / 8%) 50%, transparent 100%);
}

.dark {
  --gradient-brand-soft: linear-gradient(135deg, oklch(0.55 0.22 260 / 25%), oklch(0.45 0.25 300 / 25%));
}

/* @theme inline — map to bg-* utilities */
@theme inline {
  --background-image-brand:      var(--gradient-brand);
  --background-image-brand-soft: var(--gradient-brand-soft);
  --background-image-hero:       var(--gradient-hero);
  --background-image-glow:       var(--gradient-glow);
  --background-image-card-dark:  var(--gradient-card-dark);
  --background-image-shimmer:    var(--gradient-shimmer);
}
```

Usage:

```tsx
{/* Named tokens → bg-[name] */}
<div className="bg-brand">…</div>
<div className="bg-hero">…</div>
<div className="bg-brand-soft">…</div>

{/* Access the CSS var directly for inline styles or JS */}
<div style={{ backgroundImage: "var(--gradient-glow)" }}>…</div>
```

**Option B — Inline Tailwind v4 gradient utilities** (for one-off gradients):

```tsx
{/* Linear gradient — direction, stops */}
<div className="bg-linear-to-r from-blue-500 to-purple-600">…</div>

{/* Explicit angle */}
<div className="bg-linear-[135deg] from-pink-500 via-rose-400 to-orange-300">…</div>

{/* Radial gradient */}
<div className="bg-radial-[ellipse_at_top] from-sky-400 to-transparent">…</div>

{/* Conic gradient */}
<div className="bg-conic from-violet-500 to-cyan-500">…</div>

{/* Gradient interpolation in OKLCH (v4 default) */}
<div className="bg-linear-to-r from-red-500 to-blue-500 in-oklch">…</div>

{/* Reference a named CSS variable gradient */}
<div className="bg-linear-(--gradient-brand)">…</div>
```

---


### Background Images (textures, patterns, SVG data URIs)

For non-gradient background images — SVG patterns, noise textures, external images — use the same `--background-image-*` namespace:

```css
/* globals.css — :root */
:root {
  /* Noise texture (great for card surfaces, adds tactile depth) */
  --noise-url: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E");

  /* Dot grid pattern */
  --dots-url: url("data:image/svg+xml,%3Csvg width='20' height='20' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='2' cy='2' r='1' fill='%23000' fill-opacity='0.08'/%3E%3C/svg%3E");

  /* Line grid */
  --grid-url: url("data:image/svg+xml,%3Csvg width='40' height='40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M 40 0 L 0 0 0 40' fill='none' stroke='%23000' stroke-width='0.5' stroke-opacity='0.06'/%3E%3C/svg%3E");
}

.dark {
  --dots-url: url("data:image/svg+xml,%3Csvg width='20' height='20' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='2' cy='2' r='1' fill='%23fff' fill-opacity='0.08'/%3E%3C/svg%3E");
  --grid-url: url("data:image/svg+xml,%3Csvg width='40' height='40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M 40 0 L 0 0 0 40' fill='none' stroke='%23fff' stroke-width='0.5' stroke-opacity='0.06'/%3E%3C/svg%3E");
}

@theme inline {
  --background-image-noise: var(--noise-url);
  --background-image-dots:  var(--dots-url);
  --background-image-grid:  var(--grid-url);
}
```

Usage — stacking multiple backgrounds (CSS allows it):

```tsx
{/* Dot grid + brand gradient layered */}
<section
  className="bg-dots bg-background"
  style={{ backgroundBlendMode: "multiply" }}
>…</section>

{/* Noise texture on top of a solid card */}
<div className="relative overflow-hidden rounded-xl bg-card">
  <div className="absolute inset-0 bg-noise opacity-50 pointer-events-none" />
  {children}
</div>

{/* Hero section: radial glow + subtle grid */}
<section
  style={{
    backgroundImage: "var(--gradient-hero), var(--grid-url)",
  }}
>…</section>
```

---



