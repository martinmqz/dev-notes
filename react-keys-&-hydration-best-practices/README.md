# React Keys & Hydration Best Practices

## 🚩 Problems Demonstrated

1. **Array Index Keys**
   - Using `index` as a key causes React to reuse DOM nodes incorrectly when items are reordered.
   - Leads to bugs like inputs showing the wrong values.

2. **Hydration Mismatch**
   - Generating IDs with `crypto.randomUUID()` during SSR produces different markup on server vs client.
   - React warns: 
     ```
     A tree hydrated but some attributes of the server rendered HTML didn't match...
     ```

## ✅ Best Practices Implemented

- **Stable Keys**: Each row gets a unique `id` field, not an array index.
- **Client-only UUIDs**: IDs are generated in `useEffect` or `useState` initializer to avoid SSR mismatch.
- **SSR-safe Defaults**: Placeholder IDs (`row-0`, `row-1`) can be used for initial render, replaced with UUIDs after hydration.

## 📌 Example Code

### ❌ Bad: Using Array Index
```tsx
{items.map((item, index) => (
  <Row key={index} {...item} />
))}
```

🔧 Broader Best Practices You Could Demonstrate
1. React Rendering Stability
   • Show how unstable keys (indexes, random values) cause React to reuse DOM nodes incorrectly.
   • Demonstrate with a simple form: reorder rows and watch inputs get swapped.
   • Then show the fix with stable IDs.
2. SSR vs CSR Awareness
   • Document why hydration mismatches happen (non-deterministic values like Date.now(), Math.random(), crypto.randomUUID()).
   • Show how to defer client-only logic into useEffect or useState initializers.
3. Data Modeling Alignment
   • Explain why IDs should come from the data model (DB or API) whenever possible, not generated ad hoc in render.
   • Show a Prisma schema snippet with id as @id and stripePaymentId as non-unique, clarifying when to use findUnique vs findFirst.
4. Developer Experience
   • Highlight conventions:
     	○ Types/interfaces at the top of files.
     	○ Helpers at the bottom.
     	○ Clear separation of state, effects, and rendering.
   • Show how this makes onboarding easier.
5. Testing for Reliability
   • Add a Vitest example: test that adding/removing rows preserves input values when using stable IDs.
   • Contrast with a failing test when using array indexes.
   






































<!-- 

-->
![ ](https://api.webect.com/px?r=dev-notes&n=reactkeyshydrationbestpractices)
