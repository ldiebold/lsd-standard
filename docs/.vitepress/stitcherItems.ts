import { DefaultTheme } from "vitepress";

export const stitcherItems: DefaultTheme.SidebarGroup[] = [
  {
    text: 'Stitcher',
    collapsed: true,
    collapsible: true,
    items: [
      { text: 'Introduction', link: '/stitcher/introduction' },
      {
        text: 'Architecture',
        items: [
          { text: 'Overview', link: '/stitcher/architecture/understanding-the-architecture' },
          { text: 'Common Patterns', link: '/stitcher/architecture/common-patterns' },
          { text: 'Typical "Index"', link: '/stitcher/architecture/typical-index' },
          { text: 'Typical "Show"', link: '/stitcher/architecture/typical-show' },
          { text: 'Typical "Manage One"', link: '/stitcher/architecture/typical-manage-one' },
          { text: 'Typical "Manage Many"', link: '/stitcher/architecture/typical-manage-many' },
        ]
      },
      {
        text: 'Coding Style',
        items: [
          { text: 'General', link: '/stitcher/coding-style/general' }
        ]
      },
      {
        text: 'Routing',
        items: [
          { text: 'Routing', link: '/stitcher/routing/general' },
        ]
      },
      {
        text: 'Views',
        items: [
          { text: 'Aggressively Refactor', link: '/stitcher/views/aggressively-refactor' },
          { text: 'Views In Views', link: '/stitcher/views/views-in-views' }
        ]
      },
    ]
  },
]