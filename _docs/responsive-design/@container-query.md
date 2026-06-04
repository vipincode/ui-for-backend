# Tailwind Container Queries — Complete Notes

## 1. What is a Container Query?

Container queries allow components to respond to the **size of their parent container**, instead of the **screen size**.

### Media Query vs Container Query

```txt
Media Query     → How big is the screen?
Container Query → How big is the parent element?
```

---

# 2. Creating a Container

```jsx
<div className="@container">
```

Tailwind generates something similar to:

```css
container-type: inline-size;
```

Meaning:

> Measure the container's width and allow children to react.

---

# 3. What is `inline-size`?

`inline-size` means:

> Size in the text direction.

For most websites:

```txt
inline-size = width
block-size = height
```

Equivalent:

```css
width  → inline-size
height → block-size
```

So:

```jsx
<div className="@container">
```

means:

```txt
Children react to parent WIDTH
```

---

# 4. Container Query Breakpoints

Example:

```jsx
<div className="@container w-full max-w-[36rem] mx-auto">
  <div className="grid  @lg:grid-cols-3 @xl:grid-cols-4">
    <div className="p-4 border rounded-lg shadow-md bg-amber-300">Card 1</div>
    <div className="p-4 border rounded-lg shadow-md bg-amber-300">Card 2</div>
    <div className="p-4 border rounded-lg shadow-md bg-amber-300">Card 3</div>
    <div className="p-4 border rounded-lg shadow-md bg-amber-300">Card 4</div>
    <div className="p-4 border rounded-lg shadow-md bg-amber-300">Card 5</div>
  </div>
</div>
```

Meaning:

```css
@container (min-width:768px);
```

Behavior:

```txt
Container < 768 → 1 column
Container ≥ 768 → 2 columns
```

---

Example:

Container = 500px

```txt
Card1
Card2
Card3
Card4
```

Container = 900px

```txt
Card1   Card2
Card3   Card4
```

---

# 5. Range Queries

You can combine container breakpoints.

Example:

```jsx
<div className="@container">
  <div className="flex flex-row @sm:@max-md:flex-col">
    <div className="p-4 flex-1 border rounded-lg shadow-md bg-green-300">
      Card 1
    </div>
    <div className="p-4 flex-1 border rounded-lg shadow-md bg-green-300">
      Card 2
    </div>
    <div className="p-4 flex-1 border rounded-lg shadow-md bg-green-300">
      Card 3
    </div>
    <div className="p-4 flex-1 border rounded-lg shadow-md bg-green-300">
      Card 4
    </div>
  </div>
</div>
```

Meaning:

```css
@container (
  min-width:640px
)
and
(
  max-width:767px
);
```

Apply:

```css
flex-direction: column;
```

Behavior:

```txt
0–639px      → row
640–767px    → column
768px+       → row
```

---

# 6. Using `container` and `@container` Together

Valid:

```jsx
<div className="container @container">
```

They do different things.

| Utility      | Purpose                   |
| ------------ | ------------------------- |
| `container`  | Controls layout width     |
| `@container` | Enables container queries |

Example:

```jsx
<div className="container mx-auto @container">
  <div className="grid grid-cols-1 @md:grid-cols-2"></div>
</div>
```

Flow:

```txt
Screen
↓
container sets width
↓
@container measures width
↓
children react
```

---

# 7. `@container-size`

Example:

```jsx
<div className="@container-size">
```

Tailwind generates:

```css
container-type: size;
```

Difference:

| Type              | Measures       |
| ----------------- | -------------- |
| `@container`      | width only     |
| `@container-size` | width + height |

---

# 8. Container Units

Container units scale based on container size.

Example:

```jsx
<div className="@container-size h-[400px] border">
  <div className="h-[50cqb] bg-red-400"></div>
</div>
```

Meaning:

```txt
height = 50% of container block-size
```

Since:

```txt
block-size = height
```

Container:

```txt
400px height
```

Child:

```txt
50cqb = 200px
```

---

## Container Unit Reference

| Unit    | Meaning               |
| ------- | --------------------- |
| `cqw`   | % of container width  |
| `cqh`   | % of container height |
| `cqi`   | % of inline-size      |
| `cqb`   | % of block-size       |
| `cqmin` | smaller dimension     |
| `cqmax` | larger dimension      |

Examples:

```jsx
w-[50cqw]
```

→ 50% width

```jsx
h-[50cqb]
```

→ 50% height

```jsx
text-[10cqmin]
```

→ responsive text

---

# 9. Custom Container Breakpoints

Tailwind allows custom container variants.

Example:

```css
@import "tailwindcss";

@theme {
  --container-8xl: 96rem;
}
```

Creates:

```txt
@8xl
```

Now:

```jsx
<div className="@container">
  <div className="flex flex-col @8xl:flex-row">
```

Equivalent:

```css
@container (min-width:96rem);
```

Since:

```txt
96rem = 1536px
```

Behavior:

```txt
0–1535px → column

[A]
[B]
[C]

1536px+

[A] [B] [C]
```

---

# 10. Container Query Syntax Cheat Sheet

Create container:

```jsx
@container
```

Width + height container:

```jsx
@container-size
```

Container breakpoints:

```jsx
@sm:
@md:
@lg:
@xl:
@2xl:
```

Range:

```jsx
@sm:@max-lg:
```

Custom:

```jsx
@min-[500px]:
```

Container units:

```jsx
cqw;
cqh;
cqi;
cqb;
cqmin;
cqmax;
```

Custom breakpoint:

```css
--container-8xl
```

---

# 11. When to Use Container Queries

Use for:

✅ Dashboard cards
✅ Widgets
✅ Sidebars
✅ Reusable components
✅ Nested layouts

Avoid for:

❌ Entire page responsiveness

Use normal:

```jsx
sm:
md:
lg:
```

for screens.

Use:

```jsx
@sm:
@md:
@lg:
```

for components.

---

## Final Mental Model

```txt
Media Query
↓

SCREEN SIZE

----------------

Container Query
↓

PARENT SIZE
```
