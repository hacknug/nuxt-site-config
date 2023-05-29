<h1 align='center'>nuxt-site-config</h1>

<p align="center">
<a href='https://github.com/harlan-zw/nuxt-site-config/actions/workflows/test.yml'>
</a>
<a href="https://www.npmjs.com/package/nuxt-site-config" target="__blank"><img src="https://img.shields.io/npm/v/nuxt-site-config?style=flat&colorA=002438&colorB=28CF8D" alt="NPM version"></a>
<a href="https://www.npmjs.com/package/nuxt-site-config" target="__blank"><img alt="NPM Downloads" src="https://img.shields.io/npm/dm/nuxt-site-config?flat&colorA=002438&colorB=28CF8D"></a>
<a href="https://github.com/harlan-zw/nuxt-site-config" target="__blank"><img alt="GitHub stars" src="https://img.shields.io/github/stars/harlan-zw/nuxt-site-config?flat&colorA=002438&colorB=28CF8D"></a>
</p>


<p align="center">
Shared site configuration for Nuxt 3 modules.
</p>

<p align="center">
<table>
<tbody>
<td align="center">
<img width="800" height="0" /><br>
<i>Status:</i> <b>Experimental</b> <br>
<sup> Please report any issues 🐛</sup><br>
<sub>Made possible by my <a href="https://github.com/sponsors/harlan-zw">Sponsor Program 💖</a><br> Follow me <a href="https://twitter.com/harlan_zw">@harlan_zw</a> 🐦 • Join <a href="https://discord.gg/275MBUBvgP">Discord</a> for help</sub><br>
<img width="800" height="0" />
</td>
</tbody>
</table>
</p>

ℹ️ Looking for a complete SEO solution? Check out [Nuxt SEO Kit](https://github.com/harlan-zw/nuxt-seo-kit).

## Background

Site config is a general subset of configurations related to common site-wide settings.
They are often used in many SEO and performance modules.
Some examples are: site name, description, canonical URL and trailing slashes.

At the surface, most of this config is simple.
However, some config is more complex, such as the site URL.
This URL can be inferred
from the request headers, however, what if we're prerendering pages?
Do we take into effect the base URL?

Also,
we may want some of this config to be powered by environment variables
(e.g. staging, production environments), whereas maybe it's more 
appropriate to handle this config within runtime logic (multi-tenant app).

Things start getting complicated.

By creating a standard API for using site config,
we make life easier for end users with less config, intelligent defaults and powerful overrides.
Allowing modules to work better together.

## Features

- 😌 Zero-config defaults from environment: site URL, name and description
- 🎨 Multiple config sources: app.config.ts, nuxt.config.ts and environment variables
- 🤖 Smart stackable overrides for build and runtime
- Universal runtimes: Use in Nuxt, Nuxt App, Nitro
- Editable with HMR and reactivity

## Install

```bash
npm install nuxt-site-config

# Using yarn
yarn add nuxt-site-config
```

## Setup

**Modules**

```ts
export default defineNuxtModule<ModuleOptions>({
  async setup(config, nuxt) {
    // ...
    await installModule('nuxt-site-config')
  }
})
```

**Nuxt Apps**

_nuxt.config.ts_

```ts
export default defineNuxtConfig({
  modules: [
    'nuxt-site-config',
  ],
})
```

## Config Schema

```ts
export interface SiteConfig {
  /**
   * The canonical Site URL.
   * @default `process.env.NUXT_PUBLIC_SITE_URL`
   * Fallback options are:
   * - SSR: Inferred from request headers
   * - SPA: Inferred from `window.location`
   * - Prerendered: Inferred from CI environment
   */
  url: string
  name: string
  description: string
  image: string
  index: boolean
  titleSeparator: string
  trailingSlash: boolean
  language: string
}
```

## Config Resolving

Config is resolved in the following order, starting with the lowest priority.
1. Context-aware defaults. _For example in some CI environments, we can read environment variables to determine the site URL._
2. Environment Variables
3. Runtime config
4. App config
5. User overrides

## Usage

### useSiteConfig - Build time

### useSiteConfig - Composable

## Nuxt Hooks

### `site-config:resolve`

**Type:** `async (ctx: { urls: SitemapConfig; sitemapName: string }) => void | Promise<void>`

This hook allows you to modify the sitemap(s) urls when they're prerendered.

Note: For dynamic runtime sitemaps this hook won't do anything.

```ts
export default defineNuxtConfig({
  hooks: {
    'site-config:resolve': (siteConfig) => {
      if (process.env.FOO)
        siteConfig.name = 'Bar'

    },
  },
})
```

## Nitro Hooks

### `site-config:resolve`

**Type:** `async (ctx: { urls: SitemapConfig; sitemapName: string }) => void | Promise<void>`

This hook allows you to modify the sitemap.xml as runtime before it is sent to the client.

Note: For prerendered sitemaps this hook won't do anything.

```ts
import { defineNitroPlugin } from 'nitropack/runtime/plugin'
import { getRequestHost } from 'h3'

export default defineNitroPlugin((nitroApp) => {
  nitroApp.hooks.hook('site-config:resolve', async (siteConfig) => {
    const e = useRequestEvent()
    if (getRequestHost(e).startsWith('foo.'))
      siteConfig.name = 'Foo'

  })
})
```

## Site Config

If you need further control over the sitemap.xml URLs, you can provide config on the `sitemap` key.

### `url`

- Type: `string`
- Default: `undefined`
- Required: `true`

The host of your site. This is required to generate the sitemap.xml. Example: https://example.com

### `trailingSlash`

- Type: `boolean`
- Default: `false`

Whether to add a trailing slash to the URLs in the sitemap.xml.


## License

MIT License © 2022-PRESENT [Harlan Wilton](https://github.com/harlan-zw)
