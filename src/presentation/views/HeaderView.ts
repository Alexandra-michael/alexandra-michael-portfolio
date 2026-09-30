import type { View } from "../core/View";
import { h } from "../core/dom";

const links = [
  ["Case files", "#work"],
  ["About", "#about"],
  ["Toolkit", "#toolkit"],
  ["Contact", "#contact"],
] as const;

export class HeaderView implements View {
  mount(parent: HTMLElement): void {
    const header = h(
      "header",
      { class: "site-header" },
      h("a", { class: "mark", href: "#top", "aria-label": "Alexandra Michael, home" }, "A", h("i", {}, "."), "M"),
      h(
        "nav",
        { "aria-label": "Primary" },
        ...links.map(([label, href]) => h("a", { href }, label)),
      ),
    );
    parent.append(header);

    const onScroll = () => header.classList.toggle("is-stuck", window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }
}
