# Sticky CTA with requestAnimationFrame

In building a responsive landing page, I needed a sticky CTA bar that would appear only when the main CTA button was no longer visible in the viewport. My initial instinct was to use a scroll event listener with visibility checks, but I quickly realized that this approach could lead to performance issues — especially on mobile. To ensure smooth, jank-free updates, I reached for `requestAnimationFrame` to throttle scroll-based logic in sync with the browser’s paint cycle. This note documents the rationale, implementation, and benefits of that decision.

---

## 🧠 Why requestAnimationFrame?

Initially, I considered using a basic `scroll` event listener with direct DOM reads. However, this approach quickly led to performance concerns:

- **Scroll events fire rapidly** — often dozens of times per second.
- **DOM reads/writes inside scroll handlers** can cause layout thrashing and jank.
- **Throttle/debounce** helps, but introduces latency and complexity.

Instead, I opted for `requestAnimationFrame` because:

- It syncs with the browser’s paint cycle.
- It ensures only one update per frame.
- It’s ideal for visual updates like sticky bars or animations.

---

## 🧪 Implementation

```tsx
useEffect(() => {
  let ticking = false;

  const handleScroll = () => {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(() => {
        const cta = document.querySelector('#main-cta');
        const rect = cta?.getBoundingClientRect();
        const isVisible = rect && rect.top >= 0 && rect.bottom <= window.innerHeight;

        setStickyVisible(!isVisible);
        ticking = false;
      });
    }
  };

  window.addEventListener('scroll', handleScroll);
  return () => window.removeEventListener('scroll', handleScroll);
}, []);
useEffect(() => {
  let ticking = false;

  const handleScroll = () => {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(() => {
        const cta = document.querySelector('#main-cta');
        const rect = cta?.getBoundingClientRect();
        const isVisible = rect && rect.top >= 0 && rect.bottom <= window.innerHeight;

        setStickyVisible(!isVisible);
        ticking = false;
      });
    }
  };

  window.addEventListener('scroll', handleScroll);
  return () => window.removeEventListener('scroll', handleScroll);
}, []);
```

## ✅ Benefits

- **Memory-safe**: Prevents memory leaks by exposing a cancel handle.
- **Modular**: Keeps animation logic encapsulated and testable.
- **React-friendly**: Ideal for use in `useEffect` or custom hooks.
- **Declarative**: Encourages clean, readable frame-based updates.

## 🧼 Cleanup Reminder

- When the user scrolls past the main CTA button, a sticky bar appears at the bottom.
- When the CTA is visible again, the sticky bar hides itself.
- This ensures the CTA is always accessible without being intrusive.
```tsx
return () => window.removeEventListener('scroll', handleScroll);
```

## 🧾 Final Thoughts

While this implementation might be considered a micro-optimization for a relatively simple sticky bar scenario, it’s a valuable pattern to keep in mind for future projects — especially those involving frequent scroll events, animations, or dynamic UI updates. Knowing when and how to use `requestAnimationFrame` can help you write smoother, more performant interfaces without relying on heavier abstractions.

## 🏷️ Tags
#requestAnimationFrame, #scroll #performance, #sticky-UI, #cta, #react, #frontend-snippet

