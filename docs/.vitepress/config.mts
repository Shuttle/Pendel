import { default as access } from "../shuttle-access/sidebar";
import { default as core } from "../shuttle-core/sidebar";
import { default as esb } from "../shuttle-esb/sidebar";
import { default as recall } from "../shuttle-recall/sidebar";
import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Shuttle",
  description: "Shuttle Documentation",
  base: "/",
  lang: "en-US",
  head: [["link", { rel: "shortcut icon", href: "/favicon.ico" }]],
  themeConfig: {
    siteTitle: "Shuttle Documentation",
    search: {
      provider: "local",
    },
    socialLinks: [
      { icon: "github", link: "https://github.com/Shuttle/Pendel" },
      { icon: "discord", link: "https://discord.gg/J2suHcy2x8" },
    ],
    logo: "/logo.svg",
    footer: {
      copyright: `Copyright © 2013-${new Date().getFullYear()} Eben Roux`,
    },
    nav: [
      {
        text: "Access",
        activeMatch: `^/shuttle-access/`,
        link: "/shuttle-access/home",
      },
      {
        text: "Core",
        activeMatch: `^/shuttle-core/`,
        link: "/shuttle-core/home",
      },
      {
        text: "Service Bus",
        activeMatch: `^/shuttle-esb/`,
        link: "/shuttle-esb/home",
      },
      {
        text: "Event Sourcing",
        activeMatch: `^/shuttle-recall/`,
        link: "/shuttle-recall/home",
      },
    ],
    sidebar: {
      ...access,
      ...core,
      ...esb,
      ...recall,
    },
  },
});
