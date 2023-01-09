import { DefaultTheme } from "vitepress";

export const builderItems: DefaultTheme.SidebarGroup[] = [
  {
    text: 'Builder',
    collapsed: true,
    collapsible: true,
    items: [
      { text: 'Introduction', link: '/builder/introduction' },
      {
        text: 'Responsibilities',
        items: [
          { text: 'Not Responsible For', link: '/builder/responsibilities/not-responsible-for' }
        ]
      },
      {
        text: 'Naming Things',
        items: [
          { text: 'General', link: '/builder/naming/general' },
          { text: 'Components', link: '/builder/naming/components' },
          { text: 'Composables', link: '/builder/naming/composables' },
          { text: 'Variables', link: '/builder/naming/variables' }
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
        text: 'Styling',
        items: [
          { text: 'Styling', link: '/builder/styling/styling' },
        ]
      },
      {
        text: 'Extracting Logic',
        items: [
          { text: 'Introduction', link: '/builder/extracting-logic/extracting-logic.md' },
        ]
      },
      {
        text: 'Whiteboarding',
        items: [
          { text: 'Introduction', link: '/builder/whiteboarding/introduction.md' },
          { text: 'General', link: '/builder/whiteboarding/general.md' },
          { text: 'Colors', link: '/builder/whiteboarding/colors.md' },
        ]
      }
    ]
  },
]