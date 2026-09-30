import type { Role } from "../../domain/entities";
import type { View } from "../core/View";
import { h } from "../core/dom";
import { FILTER_LABELS, type ExperienceState, type ExperienceViewModel } from "../viewmodels/ExperienceViewModel";

export class ExperienceView implements View {
  private list!: HTMLOListElement;
  private chips!: HTMLElement;
  private count!: HTMLElement;

  constructor(private readonly vm: ExperienceViewModel) {}

  mount(parent: HTMLElement): void {
    this.chips = h("div", { class: "chips", role: "group", "aria-label": "Filter case files" });
    this.list = h("ol", { class: "cases" });
    this.count = h("p", { class: "cases__count", "aria-live": "polite" });

    parent.append(
      h(
        "section",
        { class: "section", id: "work" },
        h(
          "div",
          { class: "section__head" },
          h("p", { class: "eyebrow" }, "Case files"),
          h("h2", {}, "Ten products, one habit: ", h("em", {}, "prove it before you ship it.")),
        ),
        h("div", { class: "cases__bar" }, this.chips, this.count),
        this.list,
      ),
    );

    this.vm.state.subscribe((s) => this.render(s));
  }

  private render(state: ExperienceState): void {
    this.chips.replaceChildren(
      ...FILTER_LABELS.map(({ id, label }) =>
        h(
          "button",
          {
            class: "chip",
            type: "button",
            "aria-pressed": String(state.filter === id),
            onclick: () => this.vm.select(id),
          },
          label,
        ),
      ),
    );
    this.count.textContent = `${state.roles.length} case ${state.roles.length === 1 ? "file" : "files"}`;
    this.list.replaceChildren(...state.roles.map((r) => this.row(r, state.openId === r.id)));
  }

  private row(role: Role, open: boolean): HTMLElement {
    const panelId = `panel-${role.id}`;
    const meta = [role.umbrella, role.location].filter(Boolean).join(" · ");
    return h(
      "li",
      { class: `case${open ? " is-open" : ""}` },
      h(
        "button",
        {
          class: "case__head",
          type: "button",
          "aria-expanded": String(open),
          "aria-controls": panelId,
          onclick: () => this.vm.toggle(role.id),
        },
        h("span", { class: "case__id" }, role.id),
        h(
          "span",
          { class: "case__who" },
          h("strong", {}, role.company),
          h("span", {}, role.title),
        ),
        h("span", { class: "case__period" }, role.period),
        h("span", { class: `case__status${role.current ? " is-live" : ""}` }, role.current ? "In progress" : "Shipped"),
        h("span", { class: "case__plus", "aria-hidden": "true" }),
      ),
      h(
        "div",
        { class: "case__panel", id: panelId, role: "region" },
        h(
          "div",
          { class: "case__inner" },
          h("p", { class: "case__summary" }, role.summary),
          h("ul", {}, ...role.highlights.map((t) => h("li", {}, t))),
          meta && h("p", { class: "case__meta" }, meta),
        ),
      ),
    );
  }
}
