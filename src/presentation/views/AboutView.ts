import type { View } from "../core/View";
import { h } from "../core/dom";
import type { AboutViewModel } from "../viewmodels/AboutViewModel";

export class AboutView implements View {
  constructor(private readonly vm: AboutViewModel) {}

  mount(parent: HTMLElement): void {
    const { profile, credentials } = this.vm;
    parent.append(
      h(
        "section",
        { class: "section about", id: "about" },
        h(
          "figure",
          { class: "about__photo" },
          h("img", {
            src: "/images/portrait-relaxed.jpg",
            alt: `${profile.name} seated in a cream armchair, wearing a tan tailored set`,
            width: 1125,
            height: 1500,
            loading: "lazy",
          }),
          h("figcaption", {}, `${profile.location}`),
        ),
        h(
          "div",
          { class: "about__copy" },
          h("p", { class: "eyebrow" }, "About"),
          h("h2", {}, "Careful is a ", h("em", {}, "feature.")),
          ...profile.bio.map((p) => h("p", {}, p)),
          h(
            "ul",
            { class: "creds" },
            ...credentials.map((c) =>
              h("li", {}, h("strong", {}, c.title), h("span", {}, `${c.issuer} · ${c.note}`)),
            ),
          ),
        ),
      ),
    );
  }
}
