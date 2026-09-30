import type { View } from "../core/View";
import { h } from "../core/dom";
import type { ToolkitViewModel } from "../viewmodels/ToolkitViewModel";

export class ToolkitView implements View {
  constructor(private readonly vm: ToolkitViewModel) {}

  mount(parent: HTMLElement): void {
    parent.append(
      h(
        "section",
        { class: "section", id: "toolkit" },
        h(
          "div",
          { class: "section__head" },
          h("p", { class: "eyebrow" }, "Toolkit"),
          h("h2", {}, "What's on the bench."),
        ),
        h(
          "div",
          { class: "toolkit" },
          ...this.vm.groups.map((g) =>
            h(
              "div",
              { class: "toolkit__group" },
              h("h3", {}, g.name),
              h("ul", {}, ...g.items.map((i) => h("li", {}, i))),
            ),
          ),
        ),
      ),
    );
  }
}
