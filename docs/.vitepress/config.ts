import { defineConfig } from 'vitepress'

import { builderItems } from './builderItems'
import { stitcherItems } from './stitcherItems'
import { orchestratorItems } from './orchestratorItems'
import { artisanItems } from './artisanItems'
import { architectItems } from './architectItems'
import { scoperItems } from './scoperItems'

export default defineConfig({
  title: 'LSD Standard',
  themeConfig: {
    sidebar: [
      ...builderItems,
      ...stitcherItems,
      ...orchestratorItems,
      ...artisanItems,
      ...architectItems,
      ...scoperItems,
    ]
  }
})