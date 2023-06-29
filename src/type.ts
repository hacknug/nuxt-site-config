export interface SiteConfig {
  /**
   * The canonical Site URL.
   *
   * @default `process.env.NUXT_PUBLIC_SITE_URL`
   *
   * - Build / Prerender: Inferred from CI environment (Netlify, Vercel)
   * - SSR: Inferred from request headers
   * - SPA: Inferred from `window.location`
   *
   * Used by: nuxt-simple-sitemap, nuxt-simple-robots, nuxt-schema-org, nuxt-og-image, etc.
   */
  url?: string

  titleSeparator?: string
  indexable?: boolean
  trailingSlash?: boolean

  locale?: string
  // content that may change depending on the language
  /**
   * The name of the site.
   *
   * @default `process.env.NUXT_PUBLIC_SITE_NAME`
   *
   * - Build / Prerender: Inferred from CI environment (Netlify) or `package.json`
   * - SSR:
   *
   * Used by: nuxt-schema-org, nuxt-seo-kit
   */
  name?: string
  /**
   * The description of the site.
   *
   * @default `process.env.NUXT_PUBLIC_SITE_DESCRIPTION`
   *
   * Used by: nuxt-schema-org, nuxt-seo-kit
   */
  description?: string
  /**
   * The logo of the site.
   *
   * @default `process.env.NUXT_PUBLIC_SITE_LOGO`
   *
   * Used by: nuxt-schema-org, nuxt-seo-kit
   */
  logo?: string
  /**
   * The mapping of the context of each site config value being set.
   */
  _context: Partial<Record<Exclude<keyof SiteConfig, '_meta'>, string>>
}

export interface SiteConfigInput {
  /**
   * A description of the context which added the config.
   */
  _context?: string
  url?: string
  name?: string
  description?: string
  logo?: string
  coverImage?: string
  titleSeparator?: string
  locale?: string

  indexable?: boolean | string
  trailingSlash?: boolean | string
}

export interface SiteConfigStack {
  push: (config: SiteConfigInput | SiteConfig) => void
  get: () => SiteConfig
}

export type AssertionModes = 'prerender' | 'generate' | 'build'
export interface ModuleAssertion { context: string; requirements: Partial<Record<keyof SiteConfigInput, string>> }
