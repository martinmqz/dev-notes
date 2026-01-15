# React Keys, IDs, and Hydration: Best Practices You Can’t Ignore

If you’ve ever seen React behave *almost* correctly—inputs showing the wrong values, state sticking to the wrong row, or cryptic hydration warnings—you’ve likely run into issues with **keys** or **IDs**.

These bugs are subtle, easy to miss in code review, and especially dangerous in **SSR environments** like Next.js, Remix, or Astro.

In this post, we’ll:
- Reproduce common mistakes
- Explain *why* they happen
- Show correct, production-safe solutions
- Cover best practices for modern React (18+)

---

## The Two Root Problems

1. Incorrect React keys  
2. Non-deterministic IDs during SSR  

They’re related—but not the same—and confusing them is where most bugs start.

---

## 🚩 Problem #1: Using Array Index as a React Key

React uses keys to decide **which component instance maps to which DOM node**.

When you use the array index as a key, React assumes:

> “This position always represents the same item.”

That assumption breaks the moment your list changes.

### ❌ Buggy Code

```tsx
{items.map((item, index) => (
  <Row key={index} {...item} />
))}
```

### ❌ What Goes Wrong

When a list is reordered, filtered, or items are inserted:

- React reuses the wrong DOM nodes
- Component state moves to the wrong item
- Inputs display incorrect values
- Focus jumps unexpectedly

These bugs are **non-obvious** and often reported as “React is acting weird”.

---

## ✅ Solution: Stable, Data-backed Keys

Keys should:

- Be stable
- Be unique
- Belong to the data itself

### ✅ Correct Example

```tsx
{items.map((item) => (
  <Row key={item.id} {...item} />
))}
```

This allows React to correctly track identity regardless of ordering.

**Rule of thumb:**  
If your data came from a database, API, or backend—use that ID.

---

## 🚩 Problem #2: Hydration Mismatch from Random IDs

In SSR, React renders your app **twice**:

1. Once on the server (HTML)
2. Once on the client (hydration)

If those renders don’t match **exactly**, React warns—and sometimes breaks.

### ❌ Common Mistake

```tsx
const id = crypto.randomUUID();

return <div id={id} />;
```

### ❌ Why This Fails

- The server generates one UUID
- The client generates a different UUID
- React detects mismatched markup

### ⚠️ Resulting Warning

```
A tree hydrated but some attributes of the server rendered HTML didn't match...
```

In some cases, React will silently discard the server-rendered HTML and re-render on the client.

---

## ✅ Solution #1: Use `useId` for SSR-safe DOM IDs

React provides the `useId` hook specifically to solve this problem.

### ✅ Correct Example

```tsx
import { useId } from "react";

function MyComponent() {
  const id = useId();

  return (
    <div id={id}>
      ...
    </div>
  );
}
```

### Why `useId` Works

- Generates deterministic IDs
- Guarantees consistency across server and client renders
- Designed for accessibility and hydration safety

### ✅ Ideal Use Cases

- `id` attributes
- `<label htmlFor="...">`
- `aria-describedby`
- `aria-labelledby`

### ❗ Important Rule

**Do not use `useId` as a React key.**

It is intended for **DOM identification**, not data identity.

---

## ✅ Solution #2: Client-only UUID Generation (When Necessary)

Sometimes you truly need randomness—for example, when generating client-side-only identifiers.

In those cases, generate UUIDs **after hydration**.

### ✅ Safe Pattern

```tsx
const [id] = useState(() => crypto.randomUUID());
```

This ensures:

- The UUID is generated only on the client
- Server and client markup remain consistent

---

## ✅ Solution #3: SSR-safe Placeholder IDs

If an ID is required during the initial render but must remain deterministic:

```tsx
const placeholderId = `row-${index}`;
```

You can later replace it after hydration if necessary.

This approach:

- Avoids hydration mismatches
- Preserves deterministic HTML
- Works well for progressive enhancement

---

## 🧠 Keys vs IDs: A Critical Distinction

| Concept | Purpose | SSR-safe? |
|------|-------|---------|
| `key` | React reconciliation | Must be stable |
| `id` | DOM identification | Must be deterministic |
| `useId` | DOM IDs | ✅ Yes |
| `crypto.randomUUID()` | Random identity | ❌ Not during SSR |

Mixing these concepts is one of the most common causes of subtle React bugs.

---

## 🎯 Best Practices Summary

- Use stable, data-backed keys
- Never use array indexes for dynamic lists
- Never generate random values during SSR
- Prefer `useId` for DOM identifiers
- Generate UUIDs client-side only when needed
- Treat hydration correctness as a first-class concern

---

## Why This Matters

These issues:

- Rarely fail tests
- Often pass code review
- Surface only under real user interaction

Modern React makes it easy to do the wrong thing—and quiet when you do.

---

## Final Thought

If React ever feels “possessed”, start by checking:

- Your keys
- Your IDs
- Your SSR assumptions

The fix is usually simpler than the bug.

---

*Happy rendering.*


   






































<!-- 

-->
![ ](https://api.webect.com/px?r=dev-notes&n=reactkeyshydrationbestpractices)
