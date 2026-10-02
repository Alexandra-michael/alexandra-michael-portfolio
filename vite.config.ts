import { loadEnv, type Plugin } from "vite";
import { defineConfig } from "vitest/config";
import { credentials, profile, roles, skillGroups } from "./src/data/content";

const escapeHtml = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

const skills = skillGroups.flatMap((g) => g.items);

function structuredData(siteUrl: string) {
  const person = {
    "@type": "Person",
    "@id": `${siteUrl}/#person`,
    name: profile.name,
    jobTitle: profile.title,
    description: profile.bio[0],
    url: `${siteUrl}/`,
    image: `${siteUrl}/images/portrait-studio.jpg`,
    email: `mailto:${profile.email}`,
    sameAs: [profile.linkedin],
    address: { "@type": "PostalAddress", addressLocality: "Lagos", addressCountry: "NG" },
    knowsAbout: skills,
    alumniOf: { "@type": "CollegeOrUniversity", name: "Cross River University of Technology" },
    hasOccupation: {
      "@type": "Occupation",
      name: profile.title,
      occupationLocation: { "@type": "Country", name: "Nigeria" },
      skills: skills.join(", "),
    },
  };
  return {
    "@context": "https://schema.org",
    "@graph": [
      person,
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        url: `${siteUrl}/`,
        name: `${profile.name} — ${profile.title}`,
        inLanguage: "en",
        publisher: { "@id": `${siteUrl}/#person` },
      },
      {
        "@type": "ProfilePage",
        "@id": `${siteUrl}/#profile`,
        url: `${siteUrl}/`,
        name: `${profile.name} — ${profile.title}`,
        isPartOf: { "@id": `${siteUrl}/#website` },
        mainEntity: { "@id": `${siteUrl}/#person` },
        primaryImageOfPage: { "@type": "ImageObject", url: `${siteUrl}/images/og-card.jpg`, width: 1200, height: 630 },
      },
    ],
  };
}

/** Crawlable copy of the page. The client app replaces it on mount (see main.ts). */
function prerenderedContent(): string {
  const experience = roles
    .map(
      (r) =>
        `<article><h3>${escapeHtml(r.title)}, ${escapeHtml(r.company)}</h3><p>${escapeHtml(r.period)}${
          r.location ? ` · ${escapeHtml(r.location)}` : ""
        }</p><p>${escapeHtml(r.summary)}</p><ul>${r.highlights.map((x) => `<li>${escapeHtml(x)}</li>`).join("")}</ul></article>`,
    )
    .join("");
  const toolkit = skillGroups
    .map((g) => `<h3>${escapeHtml(g.name)}</h3><p>${g.items.map(escapeHtml).join(", ")}</p>`)
    .join("");
  const education = credentials
    .map((c) => `<li>${escapeHtml(c.title)}, ${escapeHtml(c.issuer)} (${escapeHtml(c.note)})</li>`)
    .join("");
  return `<div id="prerender"><h1>${escapeHtml(profile.name)}, ${escapeHtml(profile.title)}</h1><p>${escapeHtml(
    profile.location,
  )}</p>${profile.bio.map((p) => `<p>${escapeHtml(p)}</p>`).join("")}<h2>Experience</h2>${experience}<h2>Toolkit</h2>${toolkit}<h2>Education and certifications</h2><ul>${education}</ul><h2>Contact</h2><p><a href="mailto:${escapeHtml(
    profile.email,
  )}">${escapeHtml(profile.email)}</a> · <a href="${escapeHtml(profile.linkedin)}" rel="me">LinkedIn</a></p></div>`;
}

function seo(siteUrl: string): Plugin {
  return {
    name: "portfolio-seo",
    transformIndexHtml: {
      order: "pre",
      handler(html) {
        const jsonLd = `<script type="application/ld+json">${JSON.stringify(structuredData(siteUrl))}</script>`;
        return html
          .replace("</head>", `    ${jsonLd}\n  </head>`)
          .replace('<main id="app"></main>', `<main id="app">${prerenderedContent()}</main>`);
      },
    },
    generateBundle() {
      this.emitFile({
        type: "asset",
        fileName: "sitemap.xml",
        source: `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n  <url>\n    <loc>${siteUrl}/</loc>\n    <lastmod>${new Date().toISOString().slice(0, 10)}</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>1.0</priority>\n    <image:image><image:loc>${siteUrl}/images/portrait-studio.jpg</image:loc></image:image>\n  </url>\n</urlset>\n`,
      });
      this.emitFile({
        type: "asset",
        fileName: "robots.txt",
        source: `User-agent: *\nAllow: /\n\nSitemap: ${siteUrl}/sitemap.xml\n`,
      });
    },
  };
}

export default defineConfig(({ mode }) => {
  const siteUrl = (loadEnv(mode, ".", "VITE_").VITE_SITE_URL ?? "").replace(/\/$/, "");
  return {
    plugins: [seo(siteUrl)],
    build: { target: "es2022", sourcemap: false },
    test: { environment: "node", include: ["src/**/*.test.ts"] },
  };
});
