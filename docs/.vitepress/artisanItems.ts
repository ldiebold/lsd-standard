import { DefaultTheme } from "vitepress";

export const artisanItems: DefaultTheme.SidebarGroup[] = [
  {
    text: 'Artisan',
    collapsed: true,
    collapsible: true,
    items: [
      { text: 'Introduction', link: '/artisan/introduction' },
      { text: 'Service Composables', link: '/artisan/creating-services/service-composables' }
    ]
  },
]