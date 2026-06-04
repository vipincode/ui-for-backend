# CSS Positioning — Complete Notes

## What is Positioning?

Positioning controls **where an element appears on the page** and how it behaves relative to other elements.

CSS provides 5 positioning types:

```css
position: static;
position: relative;
position: absolute;
position: fixed;
position: sticky;
```

---

# 1. Static (Default)

Every element is `static` by default.

Example:

```css
.box {
  position: static;
}
```

Characteristics:

- Normal document flow
- `top`, `left`, `right`, `bottom` do NOT work
- Element appears where HTML places it

Example:

```html
<div>Card 1</div>
<div>Card 2</div>
```

Result:

```txt
Card 1
Card 2
```

Visual:

```txt
──────────────
Box
──────────────
```

Tailwind:

```html
static
```

---

# 2. Relative

Moves an element **relative to its original position**.

Example:

```css
.box {
  position: relative;
  top: 20px;
  left: 30px;
}
```

Meaning:

```txt
Move:
20px ↓
30px →
```

Visual:

```txt
Original

[ BOX ]

After

       [ BOX ]
```

Important:

- Original space remains occupied
- Commonly used as a reference for `absolute`

Tailwind:

```html
relative top-4 left-8
```

Example:

```html
<div class="relative top-4 left-6"></div>
```

---

# 3. Absolute

Removes element from normal flow.

Position is calculated relative to:

```txt
Nearest positioned parent
(relative / absolute / fixed / sticky)
```

Example:

```html
<div class="parent">
  <div class="child"></div>
</div>
```

```css
.parent {
  position: relative;
}

.child {
  position: absolute;
  top: 0;
  right: 0;
}
```

Visual:

```txt
┌────────────┐
│        □   │
│            │
└────────────┘
```

Important:

Without positioned parent:

```txt
absolute
↓

positions against viewport
```

Tailwind:

```html
absolute top-0 right-0
```

Example:

```html
<div class="relative">
  <button class="absolute top-2 right-2">×</button>
</div>
```

Common use cases:

- Badges
- Tooltips
- Floating buttons
- Modals
- Icons

---

# 4. Fixed

Element becomes attached to the viewport.

It does NOT move during scrolling.

Example:

```css
.box {
  position: fixed;
  bottom: 20px;
  right: 20px;
}
```

Visual:

```txt
Viewport

          □
          ↑
Always visible
```

Tailwind:

```html
fixed bottom-4 right-4
```

Example:

```html
<button class="fixed bottom-6 right-6">Chat</button>
```

Use cases:

- Floating Action Button
- Chat widget
- Header
- Back to top

---

# 5. Sticky

Hybrid of Relative + Fixed.

Behavior:

```txt
Initially → relative

After scroll →
fixed
```

Example:

```css
.header {
  position: sticky;
  top: 0;
}
```

Visual:

```txt
Scroll ↓

Header
↓

sticks here
```

Tailwind:

```html
sticky top-0
```

Example:

```html
<header class="sticky top-0"></header>
```

Use cases:

- Navbar
- Sidebar
- Table headers

---

# Position Properties

Works with:

```css
top
left
right
bottom
```

Example:

```css
top: 20px;
left: 40px;
```

Visual:

```txt
top → vertical
left → horizontal
```

Tailwind:

```html
top-4 left-4 bottom-0 right-8
```

---

# z-index

Controls stacking.

Higher value appears above.

Example:

```css
z-index: 100;
```

Visual:

```txt
z-10

z-20 ← visible
```

Tailwind:

```html
z-10 z-20 z-50
```

Example:

```html
<div class="absolute z-50"></div>
```

---

# Absolute + Relative (Most Important Pattern)

Example:

```html
<div class="relative">
  <img />

  <span class="absolute top-2 right-2"> New </span>
</div>
```

Visual:

```txt
┌─────────────┐
│         NEW │
│             │
│    IMAGE    │
└─────────────┘
```

Rule:

```txt
Parent → relative

Child → absolute
```

---

# Tailwind Position Utilities

| CSS                | Tailwind |
| ------------------ | -------- |
| position: static   | static   |
| position: relative | relative |
| position: absolute | absolute |
| position: fixed    | fixed    |
| position: sticky   | sticky   |

Offsets:

| CSS      | Tailwind |
| -------- | -------- |
| top:0    | top-0    |
| right:0  | right-0  |
| bottom:0 | bottom-0 |
| left:0   | left-0   |

---

# Quick Mental Model

```txt
static
↓

normal flow


relative
↓

move from original place


absolute
↓

move inside parent


fixed
↓

stick to screen


sticky
↓

scroll then stick
```
