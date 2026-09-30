import type { View } from "../core/View";
import { h } from "../core/dom";
import type { ContactViewModel } from "../viewmodels/ContactViewModel";

export class ContactView implements View {
  constructor(private readonly vm: ContactViewModel) {}

  mount(parent: HTMLElement): void {
    const { profile } = this.vm;
    const copy = h(
      "button",
      { class: "btn btn--line", type: "button", onclick: () => void this.vm.copyEmail() },
      "Copy email",
    );
    this.vm.copyStatus.subscribe((s) => {
      copy.textContent = s === "copied" ? "Copied" : s === "failed" ? "Copy failed" : "Copy email";
    });

    parent.append(
      h(
        "section",
        { class: "contact", id: "contact" },
        h("p", { class: "eyebrow" }, "Contact"),
        h("h2", {}, "Got a build that needs a second pair of eyes?"),
        h("a", { class: "contact__mail", href: this.vm.mailto }, profile.email),
        h("div", { class: "actions" }, copy, h("a", { class: "btn btn--line", href: "/Alexandra-Michael-CV.pdf", download: "Alexandra-Michael-CV.pdf" }, "Download CV"), h("a", { class: "btn btn--line", href: profile.linkedin, rel: "noopener", target: "_blank" }, "LinkedIn")),
        h("p", { class: "contact__small" }, h("a", { href: this.vm.phoneHref }, profile.phone), ` · ${profile.location}`),
      ),
      h(
        "footer",
        { class: "site-footer" },
        h("span", {}, `© ${new Date().getFullYear()} ${profile.name}`),
        h("span", {}, "Tested twice."),
      ),
    );
  }
}
