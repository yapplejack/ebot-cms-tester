// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');
const path = require("path");

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Everybud',
  tagline: 'Everybot is best',
  favicon: 'img/favicon.ico',

  // Set the production url of your site here
  url: 'https://github.com',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/ebot-cms-tester/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'yapplejack', // Usually your GitHub org/user name.
  projectName: 'ebot-cms-tester', // Usually your repo name.
  deploymentBranch: 'gh-pages',

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          routeBasePath: '/',
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          //editUrl:
            //'https://github.com/yapplejack/yapplebot-test/tree/main',
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/yapplejack/yapplebot-test/tree/main',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  plugins: [
    [
          path.join(__dirname, '/cropper-plugin'),
          { // this is the options object passed to the plugin
              routes: [
                  { // using Route schema from react-router
                      path: '/ebot/crop',
                      exact: false, // this is needed for sub-routes to match!
                      component: '/cropper-plugin/Importerv3.js',
                  }
              ]
          },
    ],
    /*
    [
          '@docusaurus/plugin-content-docs',
          {
            id: 'about',
            path: 'docs/about',
            routeBasePath: 'about',
            sidebarPath: require.resolve('./sidebarsAbout.js'),
            // ... other options
          },
      ],*/
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Replace with your project's social card
      image: 'img/everybot-logo.jpg',
      navbar: {
        title: 'Everybot Documentation',
        hideOnScroll: true,
        logo: {
          alt: 'My Site Logo',
          src: 'img/everybote.svg',
        },
        items: [
          {
            type: 'docSidebar',
            sidebarId: 'tutorialSidebar',
            position: 'left',
            label: '2023 Everybot Manual',
          },
          { type: 'docSidebar', sidebarId: 'fundamentalSidebar', label: 'Fundamentals Of FRC', position: 'left'},
          {type: 'docSidebar', sidebarId: 'aboutSidebar', label: 'About This Site', position: 'left'},
          {to: '/blog', label: 'Updates', position: 'left'},
          {
            href: 'https://www.118everybot.org/',
            label: 'Current Everybot Website',
            position: 'right',
          },
          //{to: '/resources', label: 'Team Resources', position: 'left'},
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Community',
            items: [
              {
                label: 'Stack Overflow',
                href: 'https://stackoverflow.com/questions/tagged/docusaurus',
              },
              {
                label: 'Discord',
                href: 'https://discordapp.com/invite/docusaurus',
              },
              {
                label: 'Twitter',
                href: 'https://twitter.com/docusaurus',
              },
            ],
          },
          {
            title: 'More',
            items: [
              {
                label: 'Blog',
                to: '/blog',
              },
              {
                label: 'GitHub',
                href: 'https://github.com/facebook/docusaurus',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} My Project, Inc. Built with Docusaurus.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
};

module.exports = config;
