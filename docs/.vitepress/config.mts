import { default as access } from "../shuttle-access/sidebar";
import { default as core } from "../shuttle/sidebar";
import { default as extensions } from "../shuttle-extensions/sidebar";
import { default as hopper } from "../shuttle-hopper/sidebar";
import { default as pigeon } from "../shuttle-pigeon/sidebar";
import { default as recall } from "../shuttle-recall/sidebar";
import { defineConfig } from "vitepress";
import tailwindcss from "@tailwindcss/vite";
import { fileURLToPath, URL } from "node:url";

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
    editLink: {
      pattern: "https://github.com/Shuttle/Pendel/edit/master/docs/:path",
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
        text: "Shuttle",
        activeMatch: `^/shuttle`,
        items: [
          {
            items: [
              {
                text: "Hopper",
                link: "/shuttle-hopper/home",
              },
            ],
          },
          {
            items: [
              {
                text: "Mediator",
                link: "/shuttle/shuttle-mediator",
              },
            ],
          },
          {
            items: [
              {
                text: "Recall",
                link: "/shuttle-recall/home",
              },
            ],
          },
          {
            items: [
              {
                text: "Cli",
                link: "/shuttle/shuttle-cli",
              },
              {
                text: "Contract",
                link: "/shuttle/shuttle-contract",
              },
              {
                text: "Cron",
                link: "/shuttle/shuttle-cron",
              },
              {
                text: "Pipelines",
                link: "/shuttle/shuttle-pipelines",
              },
              {
                text: "Platform",
                link: "/shuttle/shuttle-platform",
              },
              {
                text: "Reflection",
                link: "/shuttle/shuttle-reflection",
              },
              {
                text: "Serialization",
                link: "/shuttle/shuttle-serialization",
              },
              {
                text: "Specification",
                link: "/shuttle/shuttle-specification",
              },
              {
                text: "Streams",
                link: "/shuttle/shuttle-streams",
              },
              {
                text: "Threading",
                link: "/shuttle/shuttle-threading",
              },
            ],
          },
        ],
      },
      {
        text: "2026.1",
        items: [
          {
            text: "v-previous",
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
      ...hopper,
      ...pigeon,
      ...recall,
    },
  },
  vite: {
    resolve: {
      alias: [
        {
          find: "@",
          replacement: fileURLToPath(new URL("../", import.meta.url)),
        },
      ],
    },
    plugins: [tailwindcss()],
  },
});
