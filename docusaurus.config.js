// @ts-check

import { themes as prismThemes } from "prism-react-renderer";

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "KYPO Documentation",
  tagline: "KYPO Cyber Range Training Platform",
  favicon: "img/favicon.ico",

  future: {
    v4: true,
  },

  url: "https://deartomin.github.io",
  baseUrl: "/kypo---ojt.sp26/",

  organizationName: "deartomin",
  projectName: "kypo---ojt.sp26",
  deploymentBranch: "gh-pages",

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
          routeBasePath: "/docs",
          editUrl: "https://github.com/deartomin/kypo---ojt.sp26",
        },

        blog: false,

        theme: {
          customCss: "./src/css/custom.css",
        },
      },
    ],
  ],

  themeConfig: {
    image: "img/docusaurus-social-card.jpg",

    colorMode: {
      respectPrefersColorScheme: true,
    },

    navbar: {
      title: "KYPO Docs",
      logo: {
        alt: "KYPO Logo",
        src: "img/logo-fpt.png",
      },

      items: [
        {
          to: "/docs/overview",
          label: "Tổng quan",
          position: "left",
        },
        {
          to: "/docs/architecture",
          label: "Kiến trúc",
          position: "left",
        },
        {
          to: "/docs/deployment",
          label: "Triển khai",
          position: "left",
        },
        {
          to: "/docs/user-guide",
          label: "Hướng dẫn",
          position: "left",
        },
        {
          to: "/docs/faq",
          label: "Câu hỏi thường gặp",
          position: "left",
        },
        {
          href: "https://github.com/deartomin/kypo---ojt.sp26",
          label: "GitHub",
          position: "right",
        },
        {
          to: "/docs/reference-contact",
          label: "Liên hệ",
          position: "left",
        },
      ],
    },

    footer: {
      style: "dark",
      links: [
        {
          title: "Tài liệu",
          items: [
            { label: "Tổng quan", to: "/docs/overview" },
            { label: "Kiến trúc hệ thống", to: "/docs/architecture" },
            { label: "Triển khai", to: "/docs/deployment" },
            { label: "Hướng dẫn sử dụng", to: "/docs/user-guide" },
            { label: "Câu hỏi thường gặp", to: "/docs/faq" },
          ],
        },

        {
          title: "Dự án",
          items: [
            {
              label: "GitHub Repository",
              href: "https://github.com/deartomin/kypo---ojt.sp26",
            },
          ],
        },

        {
          title: "Liên hệ",
          items: [
            { label: "FPT University", href: "https://fpt.edu.vn" },
            { html: "FPT Security Lab" },
            { html: "OJT Spring 2026" },
          ],
        },

        {
          title: "Tham khảo",
          items: [
            { label: "KYPO Cyber Range", href: "https://kypo.muni.cz" },
            { label: "OpenStack", href: "https://openstack.org" },
          ],
        },
      ],

      copyright: `Copyright © ${new Date().getFullYear()}`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  },


scripts: [
  {
    src: '/snow.js',
    async: true,
  },
],

};

export default config;
