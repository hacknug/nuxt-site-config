import type {
  SiteConfigInput,
  SiteConfigStack,
} from '../../type'
import { useNuxtApp, useRequestEvent } from '#imports'

export function updateSiteConfig(input: SiteConfigInput = {}) {
  if (process.server) {
    const stack = useRequestEvent().context.siteConfig
    stack.push(input)
    return
  }

  const stack = useNuxtApp().$siteConfig as SiteConfigStack
  stack.push(input)
}
