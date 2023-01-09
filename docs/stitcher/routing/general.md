# Routing
## Naming conventions
All routes have a:
- path in **kebab-case**
- name in **camelCase** using dot notation (**auth.login**)
  - use your intuition for where the "dot" is placed and try to follow whatever conventions the app currently uses (for example, if there is a **auth.login** then logout would be **auth.logout**... NOT **authLogout**)
- component that will almost always use code splitting. A component that uses an arrow function will utilize code splitting:
```ts
import PostsPage from 'pages/PostsPage/PostsPage.vue'

// With code splitting
{
  name: 'users',
  path: 'users',
  component: () => import('pages/PostsPage/PostsPage.vue'),
}

// Without code splitting
{
  name: 'users',
  path: 'users',
  component: PostsPage,
}
```

> "code splitting" means the "split" component is only requested when required. So in the example above, PostsPage would not be loaded until the user navigated to the `users` route. Said another way, the `PostsPage` is "loaded on demand" or "lazy loaded"

## Use named routes
We always use named routes:
```ts
const router = useRouter()
router.push({ name: 'auth.login' })
```

Why? Because this decouples the route from its path. That means we can change a routes path, and it will still work throughout the app!