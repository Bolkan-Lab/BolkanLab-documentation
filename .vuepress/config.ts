import { defineUserConfig } from 'vuepress'
import { defaultTheme } from '@vuepress/theme-default'
import { description } from '../package.json'
import { webpackBundler } from '@vuepress/bundler-webpack'
import { searchPlugin } from '@vuepress/plugin-search';

const siteDescription = typeof description === 'string' ? description : 'Default site description';

/**
 * Base public path.
 *
 * GitHub Pages serves this project site from a subdirectory named after the
 * repository, so every asset and link has to be prefixed with it. If the site
 * is ever moved to a `<owner>.github.io` repo or a custom domain, set
 * `VUEPRESS_BASE=/` instead of editing this file.
 */
const base = (process.env.VUEPRESS_BASE ?? '/BolkanLab-documentation/') as `/${string}/`;

export default defineUserConfig({
  base,

  /**
   * Site Title
   * Ref: https://v2.vuepress.vuejs.org/reference/config.html#title
   */
  title: 'BolkanLab Documentation',

  /**
   * Site Description
   * Ref: https://v2.vuepress.vuejs.org/reference/config.html#description
   */
  description: siteDescription,

  /**
   * Extra tags to be injected into the page HTML <head>
   * Ref: https://v2.vuepress.vuejs.org/reference/config.html#head
   */
  head: [
    ['meta', { name: 'theme-color', content: '#fcd34d' }],
    ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
    ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }]
  ],

  /**
   * Theme configuration
   * Ref: https://v2.vuepress.vuejs.org/reference/default-theme/config.html
   */
  theme: defaultTheme({
    repo: '',
    editLink: false, // Replaced editLinks with editLink
    contributors: false, // Disable contributors feature
    docsDir: '',
    editLinkText: '',
    lastUpdated: false, // This is correct for VuePress 2.x
    navbar: [
      { text: 'Building', link: '/building/' },
      { text: 'Maintenance', link: '/maintenance/' },
      { text: 'Software', link: '/software/' }
    ],
    sidebar: {
      '/building/': getBuildingSidebar(),
      '/maintenance/': getMaintenanceSidebar(),
      '/software/': getSoftwareSidebar(),
    }
  }),

  /**
   * Apply plugins
   * Ref: https://v2.vuepress.vuejs.org/reference/plugin-api.html
   */
  plugins: [
    searchPlugin({
      // Options for the search plugin
      maxSuggestions: 10, // Maximum number of search suggestions
      isSearchable: (page) => page.path !== '/', // Specify which pages are searchable
      locales: {
        '/': {
          placeholder: 'Search...',
        },
      },
    }),
  ],

  /**
   * Webpack Configuration
   * Ref: https://v2.vuepress.vuejs.org/reference/bundler-webpack/config.html
   */
  bundler: webpackBundler({
    configureWebpack: (config) => {
      // Temporarly supress warnings while vuepress 2.0 fix bugs
      const sassLoaderRule = config.module.rules.find((rule) => {
        return rule.use && rule.use.some((loader) => loader.loader.includes('sass-loader'));
      });

      if (sassLoaderRule) {
        sassLoaderRule.use = sassLoaderRule.use.map((loader) => {
          if (loader.loader.includes('sass-loader')) {
            loader.options = {
              ...loader.options,
              sassOptions: {
                quietDeps: true,
                logger: {
                  warn: () => {}, // Suppresses warnings entirely
                },
              },
            };
          }
          return loader;
        });
      }
    }
  }),

  /**
   * Custom webpack chain
   */
  chainWebpack: (config, _isServer) => {
    config.module
      .rule('files')
      .test(/\.(pdf|zip|ait|log|txt|stp)$/)
      .use('file-loader')
      .loader('file-loader')
      .options({
        name: `[path][name].[ext]`
      });

    config.module
      .rule('vue')
      .use('vue-loader')
      .tap((options) => {
        options.transformAssetUrls = {
          video: ['src', 'poster'],
          source: 'src',
          img: 'src',
          image: ['xlink:href', 'href'],
          a: 'href'
        }
        return options
      });
  }
})

/**
 * Sidebar configuration for /building/
 *
 * Add one entry per page. The path is relative to the repo root and must
 * include the `.md` extension, e.g. '/building/my-new-page.md'.
 */
function getBuildingSidebar() {
  return [
    {
      text: 'Building a VR Rig',
      link: '/building/',
      collapsible: true,
      children: [
        '/building/example-module.md',    // Maps to `building/example-module.md`
      ],
    },
  ];
}

/**
 * Sidebar configuration for /maintenance/
 */
function getMaintenanceSidebar() {
  return [
    {
      text: 'Maintenance',
      link: '/maintenance/',
      collapsible: true,
      children: [
        '/maintenance/example-module.md', // Maps to `maintenance/example-module.md`
      ],
    },
  ];
}

/**
 * Sidebar configuration for /software/
 */
function getSoftwareSidebar() {
  return [
    {
      text: 'Software',
      link: '/software/',
      collapsible: true,
      children: [
        '/software/virmen_guide.md',              // Maps to `software/virmen_guide.md`
      ],
    },
  ];
}
