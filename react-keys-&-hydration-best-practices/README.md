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


   






































<!-- 

-->
![ ](https://api.webect.com/px?r=dev-notes&n=reactkeyshydrationbestpractices)
