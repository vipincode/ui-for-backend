# Tailwind `container` vs `@container` — Complete Notes

## 1. What is `container`?

`container` is a **layout utility** used to control the **maximum width of page content**.

It responds to **screen size (viewport)**.

Example:

```html
<div class="container mx-auto">
  Content
</div>
```

Equivalent idea:

```css
.container {
  width: 100%;
}

@media (min-width:640px) {
  max-width:640px;
}

@media (min-width:768px) {
  max-width:768px;
}

@media (min-width:1024px) {
  max-width:1024px;
}
```

Flow:

```txt
Screen width
↓

Container width changes
```

---

## 2. Why `mx-auto`?

Example:

```html
<div class="container mx-auto">
```

`container` controls width.

`mx-auto` centers it.

Equivalent:

```css
margin-left:auto;
margin-right:auto;
```

Visual:

Without:

```txt
| Content         |
```

With:

```txt
      | Content |
```

---

## 3. Container Breakpoints

Default container behavior:

| Screen Width | Container Width |
| ------------ | --------------- |
| `<640`       | 100%            |
| `≥640`       | 640px           |
| `≥768`       | 768px           |
| `≥1024`      | 1024px          |
| `≥1280`      | 1280px          |
| `≥1536`      | 1536px          |

Example:

```txt
Screen = 1600px

Container = 1536px
```

---

## 4. Adding a Custom Max Width (1920px)

### Option 1 — Simple

```html
<div class="container mx-auto max-w-[1920px]">
```

---

### Option 2 — Theme Token

```css
@theme {
  --container-9xl: 120rem;
}
```

Because:

```txt
1920px = 120rem
```

Usage:

```html
<div class="mx-auto max-w-9xl">
```

---

### Option 3 — Override Container Globally

```css
@utility container {
  margin-inline: auto;
  max-width: 120rem;
}
```

Usage:

```html
<div class="container">
```

---

## 5. Container + Padding

Common layout:

```html
<div class="container mx-auto px-6">
```

Visual:

```txt
--------------------------------
| padding     Content padding |
--------------------------------
```

---

# 6. What is `@container`?

`@container` enables **container queries**.

Children respond to **parent size**, not screen size.

Example:

```html
<div class="@container">
```

Tailwind generates:

```css
container-type: inline-size;
```

Meaning:

```txt
Measure parent width
```

---

## Example

```html
<div class="@container">

  <div class="
    grid
    grid-cols-1
    @md:grid-cols-2
  ">
    Cards
  </div>

</div>
```

Equivalent:

```css
@container (min-width:768px)
```

Behavior:

```txt
Container < 768
↓

1 column

Container ≥ 768
↓

2 columns
```

---

# 7. `container` vs `@container`

| Utility      | Purpose               | Based On |
| ------------ | --------------------- | -------- |
| `container`  | Layout width          | Screen   |
| `@container` | Responsive components | Parent   |

---

Example:

```html
<div class="container mx-auto @container">

  <div class="
    grid
    grid-cols-1
    @lg:grid-cols-3
  ">
    Cards
  </div>

</div>
```

Flow:

```txt
Screen
↓

container controls width

↓

@container measures width

↓

Children react
```

---

# 8. Modern Tailwind Approach

Today many projects prefer:

```html
<div class="mx-auto max-w-7xl px-6">
```

instead of:

```html
<div class="container">
```

Because:

* More explicit
* Easier customization
* Better design control

Example:

```html
<section class="mx-auto max-w-[1920px] px-6">
```

---

# 9. Recommended Usage

### Page Layout

```html
<div class="mx-auto max-w-[1920px] px-6">
```

Use for:

* Pages
* Dashboard shells
* Landing pages
* Blogs

---

### Responsive Components

```html
<div class="@container">
```

Use for:

* Cards
* Widgets
* Sidebars
* Nested layouts
* Reusable components

---

## Final Mental Model

```txt
container
↓

Page Width


max-w
↓

Exact Width


@container
↓

Responsive Components
```
