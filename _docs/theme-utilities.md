# Tailwind Theme Configuration (Latest Tailwind)

In modern Tailwind, customization is commonly done inside CSS using `@theme`.

[Ref Docs](https://tailwindcss.com/docs/responsive-design#basic-example) - Tailwind Responsive design


Example setup:

```css
@import "tailwindcss";

@theme {
  /* Custom theme values */
}
```

---

# 1. Add Extra Breakpoints

Create custom responsive breakpoints.

Example:

```css
@import "tailwindcss";

@theme {
  --breakpoint-xs: 30rem;
  --breakpoint-3xl: 120rem;
}
```

Now use:

```html
<div class="xs:text-sm 3xl:text-4xl">
  Responsive text
</div>
```

Equivalent:

```css
@media (min-width:480px)
@media (min-width:1920px)
```

Example:

```html
<div class="
  grid-cols-1
  md:grid-cols-2
  3xl:grid-cols-4
">
</div>
```

---

# 2. Add Container Query Breakpoints

Container queries use a different variable.

Example:

```css
@theme {
  --container-8xl: 96rem;
}
```

Usage:

```html
<div class="@container">

  <div class="
    flex-col
    @8xl:flex-row
  ">
    Content
  </div>

</div>
```

Meaning:

```txt
Container ≥ 1536px
→ flex-row
```

---

# 3. Add Custom Colors

Example:

```css
@theme {
  --color-primary: #16a34a;
  --color-secondary: #1e293b;

  --color-success: #22c55e;
  --color-danger: #ef4444;
}
```

Usage:

```html
<div class="
  bg-primary
  text-secondary
  border-success
">
```

Examples:

```html
<button class="bg-primary text-white">
```

```html
<p class="text-danger">
```

---

# 4. Add Border Radius

Example:

```css
@theme {
  --radius-card: 20px;
  --radius-btn: 999px;
}
```

Usage:

```html
<div class="rounded-card">
```

```html
<button class="rounded-btn">
```

Generated:

```css
border-radius:20px;
```

---

# 5. Add Custom Shadow

Example:

```css
@theme {
  --shadow-card:
    0 10px 30px rgba(0,0,0,.12);

  --shadow-soft:
    0 4px 10px rgba(0,0,0,.08);
}
```

Usage:

```html
<div class="shadow-card">
```

```html
<div class="shadow-soft">
```

---

# 6. Add Custom Border Width

Example:

```css
@theme {
  --border-width-3: 3px;
}
```

Usage:

```html
<div class="border-3">
```

Result:

```css
border-width:3px;
```

---

# 7. Add Gradient Colors

Example:

```css
@theme {
  --color-brand-start: #22c55e;
  --color-brand-end: #0f766e;
}
```

Usage:

```html
<div class="
  bg-linear-to-r
  from-brand-start
  to-brand-end
">
```

Result:

```txt
Green → Teal
```

Vertical:

```html
<div class="
  bg-linear-to-b
  from-primary
  to-secondary
">
```

---

# 8. Add Custom Background Image

Example:

```css
@theme {
  --background-image-hero:
    url("/images/hero-bg.jpg");
}
```

Usage:

```html
<section class="
  bg-hero
  bg-cover
  bg-center
">
```

Public folder:

```txt
public/
 └── images
      └── hero-bg.jpg
```

---

# 9. Add Multiple Background Images

Example:

```css
@theme {
  --background-image-grid:
    url("/images/grid.svg");

  --background-image-noise:
    url("/images/noise.png");
}
```

Usage:

```html
<div class="bg-grid">
```

---

# 10. Add Font Configuration

Example:

```css
@theme {

  --font-sans:
    "Inter",
    sans-serif;

  --font-heading:
    "Poppins",
    sans-serif;
}
```

Usage:

```html
<h1 class="font-heading">
```

```html
<p class="font-sans">
```

---

# 11. Add Spacing Tokens

Example:

```css
@theme {
  --spacing-section: 120px;
  --spacing-card: 24px;
}
```

Usage:

```html
<section class="py-section">
```

```html
<div class="p-card">
```

---

# Example Complete Theme

```css
@import "tailwindcss";

@theme {

  /* Breakpoints */
  --breakpoint-3xl: 120rem;

  /* Container */
  --container-8xl: 96rem;

  /* Colors */
  --color-primary: #22c55e;
  --color-secondary: #0f172a;

  /* Radius */
  --radius-card: 18px;

  /* Shadow */
  --shadow-card:
    0 10px 30px rgba(0,0,0,.15);

  /* Fonts */
  --font-heading:
    "Inter",
    sans-serif;

  /* Background */
  --background-image-hero:
    url("/images/hero-bg.jpg");
}
```

Usage:

```html
<div class="
  bg-hero
  rounded-card
  shadow-card
  bg-primary
  text-white
  3xl:p-10
">
```

