import { DefaultTheme } from "vitepress";

export const builderItems: DefaultTheme.SidebarGroup[] = [
  {
    text: 'Builder',
    collapsed: true,
    collapsible: true,
    items: [
      { text: 'Introduction', link: '/builder/introduction' },
      {
        text: 'Naming Things',
        items: [
          { text: 'Components', link: '/builder/naming/components' },
          { text: 'Composables', link: '/builder/naming/composables' }
        ]
      },
      {
        text: 'Leaf Components',
        items: [
          { text: 'Reducing Knowledge', link: '/builder/leaf-components/reducing-knowledge' },
        ]
      },
      {
        text: 'Coding Style',
        items: [
          { text: 'General', link: '/builder/coding-style/general' },
          { text: 'Globals', link: '/builder/coding-style/globals' },
        ]
      },
      {
        text: 'Extracting Logic',
        items: [
          { text: 'Introduction', link: '/builder/extracting-logic/extracting-logic.md' },
        ]
      }
    ]
  },
]