type Attrs = Record<string, string | number | boolean | EventListener | undefined>;
type Child = Node | string | null | undefined | false;

export function h<K extends keyof HTMLElementTagNameMap>(
  tag: K,
  attrs: Attrs = {},
  ...children: Child[]
): HTMLElementTagNameMap[K] {
  const el = document.createElement(tag);
  for (const [key, val] of Object.entries(attrs)) {
    if (val === undefined || val === false) continue;
    if (key.startsWith("on") && typeof val === "function") {
      el.addEventListener(key.slice(2).toLowerCase(), val as EventListener);
    } else if (key === "class") {
      el.className = String(val);
    } else {
      el.setAttribute(key, val === true ? "" : String(val));
    }
  }
  for (const child of children) {
    if (child === null || child === undefined || child === false) continue;
    el.append(typeof child === "string" ? document.createTextNode(child) : child);
  }
  return el;
}

const reduceMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/** Fires `onEnter` once when the element scrolls into view (immediately if motion is reduced). */
export function whenVisible(el: Element, onEnter: () => void, threshold = 0.25): void {
  if (reduceMotion() || !("IntersectionObserver" in window)) {
    onEnter();
    return;
  }
  const io = new IntersectionObserver(
    (entries) => {
      if (entries.some((e) => e.isIntersecting)) {
        io.disconnect();
        onEnter();
      }
    },
    { threshold },
  );
  io.observe(el);
}

export { reduceMotion };
