# A sticky CTA with requestAnimationFrame
## Queues a callback to run once per frame, just before the browser repaints.
## Syncs with the display’s refresh rate (typically 60Hz → ~16.67ms/frame).
## Allows the browser to batch DOM reads/writes for optimal performance.
## Prevents layout thrashing and reduces jank.