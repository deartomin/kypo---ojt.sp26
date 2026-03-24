// @ts-check

import { themes as prismThemes } from "prism-react-renderer";

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "KYPO Documentation",
  tagline: "KYPO Cyber Range Training Platform",
  favicon: "img/logo-fpt.png",

  url: "http://localhost:3000",
  baseUrl: "/",

  onBrokenLinks: "throw",

  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },

  presets: [
    [
      "classic",
      {
        docs: {
          sidebarPath: "./sidebars.js",
        },
        blog: false,
        theme: {
          customCss: "./src/css/custom.css",
        },
      },
    ],
  ],

  themeConfig: {
    navbar: {
      title: "KYPO Document",
      logo: {
        alt: "KYPO Logo",
        src: "img/logo-fpt.png",
      },
      items: [
        {
          href: "https://github.com/deartomin/kypo---ojt.sp26",
          label: "GitHub",
          position: "right",
        },
      ],
    },

    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  },
};

export default config;