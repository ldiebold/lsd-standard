# Typical Index Example

## Generating the folder and model
If the resource we want to show doesn't exist in `modules/resources-name`, we generate it:

generate the `post` folder
```sh
hygen module new
? What is the modules name (singular)? ‣ post
```

If needed, add the resources fields:

`modules/Post/Post.ts`
```ts
import { Model } from 'pinia-orm'
import { Str, Uid } from 'pinia-orm/dist/decorators'

export class Post extends Model {
  static entity = 'posts'

  @Uid() declare id: string

  @Str(null) declare title: string
  @Str(null) declare body: string
}
```

## `routes.ts`
Currently we manually point to routes, yet may consider using a route generator in the future.

`routes.ts`
```ts
import { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/AuthenticatedLayout.vue'),
    children: [
      {
        name: 'posts',
        path: 'posts',
        component: () => import('pages/PostsPage/PostsPage.vue'),
      },
    ]
  }
]
```

## `ShowModelsPage.vue`

`pages/ShowPostsPage/ShowPostsPage.vue`
```vue
<script lang="ts" setup>
import PostsView from 'modules/Post/PostsView/PostsView.vue'
</script>

<template>
  <PostsView />
</template>
```
> Notice that in many cases, a "page" is simple but **still necessary**. There are scenarios where other "views" would be added to this page and believe us, complexity increases fast!

## Generating The View
Generate the `ShowPostsView` component
```sh
hygen view new
✔ Component Type · module
✔ What module is this component for? · Post
✔ Choose a name for the component.
It should include the module name and end with the word View
e.g. ManagePostsView or PostDetailsView · ShowPostsView
```

## `useModelsFetcher()`
Note that in this example, we're creating a `usePostsFetcher()` composable before we even start building the view!

`modules/Post/views/ShowPostsView/usePostsFetcher.ts`
```ts
import { computed } from 'vue'

import { useFetchResources } from '@vuemodel/orion-pinia-orm'
import { Post } from 'modules/Post/Post'

export default function usePostsFetcher () {
  const fetcher = useFetchResources(Post, {
    immediate: true,
  })

  const posts = computed(() => fetcher.repo.all())

  return {
    ...fetcher,
    posts
  }
}
```

### Why not just put this code directly in the view?
Yes, the above line of code could be in the view, but the LSD Standard encourages you to **aggressively extract logic**. A fetcher can end up holding *a lot of code*, and with the above example a future dev has a neat, obvious place to hold such code.

> One of the core LSD values is to **aggresively extract logic** to make life easier for future devs, and for ourselves.

Also note that in the composable above, `immediate: true,` and `...fetcher,` have their own line. This makes it easy, and obvious for future devs who want to add additional functionality to these composables.

And the last thing to note is where the composable file is located. One may be used to composables inside a `composables/` folder, but in this case it's **inside the views folder!** Why? Because this is a **single context composable**. single context composables are rigid and NOT reuseable...

A common architectual pitfall is a stubborn adherence to "DRY". Yes, a lot of the time our code should be DRY yet there are many cases where "DRY" only makes our lives harder. the above composable is **intentionally NOT dry**. The code it contains is too volatile. It might end up with filters, related data, sorting etc that would not make sense in another context so...

We put it right next to "view" because that's the only place it will be used.

You'll be building a lot of "single context composables" in this architecture. If it helps, just think of them as javascript inside an SFC, that's been shoved somewhere else (which is in fact, exactly what they are!)

Okay, moving on to the view! This is the fun part 😉

## `ShowModelsView.vue`

`modules/Post/views/ShowPostsView/ShowPostsView.vue`
```vue
<script lang="ts" setup>
import ShowPostsList from 'modules/Post/components/ShowPostsList/ShowPostsList.vue'
import usePostsFetcher from './usePostsFetcher'

const postsFetcher = usePostsFetcher()
</script>

<template>
  <div>
    <q-spinner
      size="lg"
      color="primary"
      v-if="postsFetcher.fetching.value"
    />

    <!-- We haven't built this component yet, so it won't work! -->
    <ShowPostsList
      v-else
      :posts="postsFetcher.posts.value"
    />
  </div>
</template>
```

How cool is that? Our view is VERY clean, and we can easily introduce more logic by creating more composables!

Note:
- We NEVER destructure composables. **destructuring inside an SFC KILLS clarity**
- There is a blank line between the `<q-spinner />` and `<ShowPostsList />`. We choose to agressively extract, and enjoy the extra space it provides by adding breathing room to our code!

## `ShowModlesList.vue`
Guess what? If you have a builder on your team, you wouldn't have to build this component! It is a "Leaf Component" and therefore, not the responsibility of a stitcher. One might even say, "stitchers are decoupled from builders" (though in reality, you're probably the best of friends and will be communicating a lot!)

Having said that, there's also a very good chance that you're responsibility is as a "stitcher" AND a "builder". The main reason we split the two, is so builders can quickly get work experience without having to understand the complexities of being a stitcher!

Okay enough of that, let's generate the component:
```sh
hygen component new
✔ Component Type · module
✔ What module is this component for? · Post
✔ Choose a name for the component.
It should include the module name
e.g. CreatePostsTable or PostDetailsCard · ShowPostsList
```

`modules/Post/components/ShowPostsView/ShowPostsList.vue`
```vue
<script lang="ts" setup>
import { Post } from 'modules/Post/Post'

interface Props {
  posts: Post[]
}

defineProps<Props>()
</script>

<template>
  <q-list>
    <q-item
      v-for="post in posts"
      :key="post.id"
    >
      <q-item-section>
        {{ post.title }}
      </q-item-section>
    </q-item>
  </q-list>
</template>
```

If you're new to this, something might be clicking for you right now...

As a builder, we ensured our code was decoupled from the rest of our app. Can you see how the list component above can now be easily used by a stitcher? Especially when there are a lot of small components involved in a feature, the stitcher simply "stitches" together the backend, to the leaf components! Pretty cool huh?

We have a clean separation between backend logic/global state, and therefore a stitcher only needs to focus on one thing. Stitching it all together!