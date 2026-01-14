## Tailwind v4 in a Turborepo: Don’t Forget Shared UI Packages

If you’re using a shared UI component library with **Tailwind CSS v4+** in a **Turborepo monorepo**, there’s an important gotcha to be aware of.

Tailwind v4 introduced **automatic content scanning**, but **workspace packages are not included by default**. This means that utility classes used inside a shared package (for example, `packages/ui`) will **not be detected or compiled**.

As a result, your shared components may render without styles—even though everything looks correctly set up.

### The Fix: Use the `@source` Directive

To tell Tailwind which files it should scan, you must explicitly point to your shared UI package using the `@source` directive in your app’s **global CSS** file.

```css
@import "@repo/ui/styles/index.css";

/* Tell Tailwind to scan the shared UI package */
@source "../../../packages/ui/src"; /* Adjust the path to your UI components */
```







































<!-- 

-->
![ ](https://api.webect.com/px?r=dev-notes&n=twv4-in-monorepo)
