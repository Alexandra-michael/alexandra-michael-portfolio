import type { View } from "../core/View";
import { h, reduceMotion, whenVisible } from "../core/dom";
import type { StatsViewModel } from "../viewmodels/StatsViewModel";

export class StatsView implements View {
  constructor(private readonly vm: StatsViewModel) {}

  mount(parent: HTMLElement): void {
    const items = this.vm.metrics.map((m) => {
      const num = h("span", { class: "stat__num" }, this.vm.format(m.value));
      const item = h(
        "li",
        { class: "stat" },
        h("p", { class: "stat__value" }, num, m.suffix && h("span", { class: "stat__plus" }, m.suffix)),
        h("p", { class: "stat__label" }, m.label),
      );
      whenVisible(item, () => this.countUp(num, m.value));
      return item;
    });

    parent.append(
      h(
        "section",
        { class: "stats", "aria-label": "By the numbers" },
        h("ul", {}, ...items),
      ),
    );
  }

  private countUp(el: HTMLElement, target: number): void {
    if (reduceMotion()) return;
    const duration = 1100;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      el.textContent = this.vm.format(Math.round(target * eased));
      if (t < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }
}
