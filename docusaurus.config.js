module.exports = {
  title: "My Cheat Sheets",
  tagline: "The tagline of my site",
  url: "https://pfongkye.github.io",
  baseUrl: "/",
  favicon: "img/favicon.ico",
  organizationName: "pfongkye", // Usually your GitHub org/user name.
  projectName: "pfongkye.github.io", // Usually your repo name.
  themeConfig: {
    navbar: {
      title: "My Cheat Sheets",
      logo: {
        alt: "My Site Logo",
        src: "img/logo.svg",
      },
      links: [
        { to: "docs/doc_web", label: "Docs", position: "left" },
        { to: "playground", label: "Playground", position: "left" },
        {
          href: "https://github.com/pfongkye/cheat-sheets-docs",
          label: "GitHub",
          position: "right",
        },
      ],
    },
    algolia: {
      apiKey: "8a95fdfff7c5a485cfc279a9503a6287",
      appId: "QAUJU0D39R",
      indexName: "CheatSheets",
    },
    footer: {
      style: "dark",
      links: [
        {
          title: "Docs",
          items: [
            {
              label: "Cheat Sheets",
              to: "docs/doc_web",
            },
          ],
        },
        {
          title: "Community",
          items: [
            {
              label: "Stack Overflow",
              href: "https://stackoverflow.com/questions/tagged/docusaurus",
            },
            {
              label: "Discord",
              href: "https://discordapp.com/invite/docusaurus",
            },
          ],
        },
        {
          title: "Social",
          items: [
            {
              label: "GitHub",
              href: "https://github.com/pfongkye/cheat-sheets-docs",
            },
            {
              label: "Twitter",
              href: "https://twitter.com/docusaurus",
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} My Project, Inc. Built with Docusaurus.`,
    },
  },
  presets: [
    [
      "@docusaurus/preset-classic",
      {
        docs: {
          sidebarPath: require.resolve("./sidebars.js"),
          editUrl: "https://github.com/pfongkye/cheat-sheets-docs/edit/master/",
        },
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
      },
    ],
  ],
};
