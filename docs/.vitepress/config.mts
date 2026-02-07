import { default as access } from "../shuttle-access/sidebar";
import { default as core } from "../shuttle-core/sidebar";
import { default as extensions } from "../shuttle-extensions/sidebar";
import { default as esb } from "../shuttle-hopper/sidebar";
import { default as pigeon } from "../shuttle-pigeon/sidebar";
import { default as recall } from "../shuttle-recall/sidebar";
import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Shuttle",
  description: "Shuttle Documentation",
  base: "/",
  lang: "en-US",
  head: [["link", { rel: "shortcut icon", href: "/favicon.ico" }]],
  ignoreDeadLinks: "localhostLinks",
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
        text: "Solutions",
        items: [
          {
            text: "Access",
            activeMatch: `^/shuttle-access/`,
            link: "/shuttle-access/home",
          },
          {
            text: "Pigeon",
            activeMatch: `^/shuttle-pigeon/`,
            link: "/shuttle-pigeon/home",
          },
        ],
      },
      {
        text: "Core",
        activeMatch: `^/shuttle-core/`,
        link: "/shuttle-core/home",
      },
      {
        text: "Recall",
        activeMatch: `^/shuttle-recall/`,
        link: "/shuttle-recall/home",
      },
      {
        text: "Hopper",
        activeMatch: `^/shuttle-hopper/`,
        link: "/shuttle-hopper/home",
      },
      {
        text: "21.0.1-beta",
        items: [
          {
            text: "pre-v21",
            link: "https://shuttle.github.io/pendel-pre-v21/",
          },
          {
            text: "Upgrade guide",
            activeMatch: `^/upgrade-v21`,
            link: "/upgrade-v21",
          },
        ],
      },
    ],
    sidebar: {
      ...access,
      ...core,
      ...extensions,
      ...esb,
      ...pigeon,
      ...recall,
    },
  },
});
