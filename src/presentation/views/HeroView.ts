import type { View } from "../core/View";
import { h } from "../core/dom";
import type { HeroViewModel } from "../viewmodels/HeroViewModel";

export class HeroView implements View {
  constructor(private readonly vm: HeroViewModel) {}

  mount(parent: HTMLElement): void {
    const { profile } = this.vm;

    const row = (k: string, v: string) =>
      h("div", {}, h("dt", {}, k), h("dd", {}, v));

    parent.append(
      h(
        "section",
        { class: "hero", id: "top" },
        h(
          "div",
          { class: "hero__copy" },
          h("p", { class: "eyebrow" }, `${profile.name} · ${profile.title}`),
          h(
            "h1",
            {},
            "Somebody has to click the ",
            h("span", { class: "scribble" }, "button"),
            " nobody thought to click.",
          ),
          h(
            "p",
            { class: "lede" },
            "I'm a QA engineer working across fintech, mobile and AI products. I read the spec first, break the build second, and stay until the fix is retested.",
          ),
          h(
            "div",
            { class: "actions" },
            h("a", { class: "btn btn--solid", href: "#work" }, "Read the case files"),
            h("a", { class: "btn btn--line", href: this.vm.mailto }, `Write to ${this.vm.firstName}`),
          ),
        ),
        h(
          "figure",
          { class: "hero__photo" },
          h("img", {
            src: "/images/portrait-studio.jpg",
            alt: `Portrait of ${profile.name} in a black blazer and white shirt against a warm brown backdrop`,
            width: 1000,
            height: 1500,
            fetchpriority: "high",
          }),
          h(
            "aside",
            { class: "ticket", "aria-label": "Sample defect report" },
            h("header", {}, h("b", {}, "QA-0001"), h("span", { class: "tag" }, "Sample defect")),
            h(
              "dl",
              {},
              row("Steps", "Tap Pay. Tap Pay again."),
              row("Expected", "One charge."),
              row("Actual", "Two charges."),
              row("Severity", "Money-shaped"),
            ),
          ),
        ),
      ),
    );
  }
}
