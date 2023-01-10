# Typical "Show Single Resource" Example

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
        name: 'post',
        path: 'post/:postId',
        props: true,
        component: () => import('pages/PostPage/PostPage.vue'),
      },
    ]
  }
]
```
Two things to note here:
- we use `props: true` so that the `postId` is passed to the page as a prop
- `postId` instead of `id`, because it makes our logic easier to follow as `PostPage.vue` gradually increases in complexity

## `ShowModelPage.vue`

`pages/ShowPostPage/ShowPostPage.vue`
```vue
<script lang="ts" setup>
interface Props {
  postId: string
}

import PostView from 'modules/Post/PostView/PostView.vue'
</script>

<template>
  <PostView :post-id="postId" />
</template>
```
We encourage you to compare this `PostPage` component to the [`PostsPage` component here](typical-index.md#showmodelspagevue). Note that sometimes a page accepts props from the route (like in the example above), and sometimes it does not.

## Generating The View

generate the `ShowPostView` component
```sh
hygen view new
✔ Component Type · module
✔ What module is this component for? · Post
✔ Choose a name for the component.
It should include the module name and end with the word View
e.g. ManagePostsView or PostDetailsView · ShowPostView
```

We could have called this view `PostView`, but opt to add the word `Show` because it's more explicit. It can be hard to scale file names that are too generic. For example, If it were called `PostView` how would we know if it's used to "show" a post as opposed to "manage" a post? It may seem obvious in the example above, yet we want to make it as easy as possible for future devs - and ourselves - to become fluent on all our projects!

## `useModelFinder()`
Note that in this example, we're creating a `usePostFinder()` composable before we even start building the view!

`modules/Post/views/ShowPostView/usePostFinder.ts`
```ts
import { computed, watch, Ref } from 'vue'

import { useFindResource } from '@vuemodel/orion-pinia-orm'
import { Post } from 'modules/Post/Post'

export default function usePostFinder (options: {
  id: Ref<string>
}) {
  const finder = useFindResource(Post, {
    id: options.id, // note that we pass the ref. NOT options.id.value (which would pass the raw string, and therefore would lose reactivity)
    immediate: true,
  })

  watch(options.id, () => finder.find())

  const post = computed(() => finder.repo.find(options.id.value))

  return {
    ...finder,
    post
  }
}
```

We ensure a reactive `id` is provided, and watch it for changes to refetch the post.

Make sure you take the time to understand what's hapenning here. The id supplied to `useFindResource()` is called a `MaybeComputedRef`. A `MaybeComputedRef` can accept a:
- **raw value** (e.g. `"some-id"`, not reactive)
- **function** (`() => 'prefix' + id.value`. This function is converted to a computed so it will be reactive!)
- or as in the example above, a **ref** (e.g. `idRef`. will be reactive but be aware that we have to manually refetch.)

## `ShowModelView.vue`

`modules/Post/views/ShowPostView/ShowPostView.vue`
```vue
<script lang="ts" setup>
import { toRef } from 'vue'

import RenderPostBody from 'modules/Post/components/RenderPostBody/RenderPostBody.vue'
import TextH1 from 'shared/components/Text/TextH1/TextH1.vue'

import usePostFinder from './usePostFinder'

interface Props {
  postId: string
}

const props = defineProps<Props>()

const postFinder = usePostFinder({ id: toRef(props, 'postId') })
</script>

<template>
  <div>
    <q-spinner
      size="lg"
      color="primary"
      v-if="postFinder.finding.value"
    />

    <div v-else>
      <TextH1 :text="postFinder.post.value.title" />
      <RenderPostBody :body="postFinder.post.value.body" />
    </div>
  </div>
</template>
```
Reminder: We NEVER destructure composables. **destructuring inside an SFC KILLS clarity**

See how we use `toRef(props, 'postId')`? That's to ensure we maintain reactivity. Understanding why goes beyond the scope of this doc, so be sure to do some reading on why it's necessary. To put it simply:
- props is a "reactive" (as opposed to a "ref")
- When accessing a property THROUGH a "reactive", we get reactivity (`props.postId` is reactive)
- When INDIRECTLY accessing a property on a reactive, we LOSE reactivity (`const postIdCopy = props.postId`. `postIdCopy` is NOT reactive)
- to get a single value from a prop without losing reactivity, we use `toRef()` (`const postIdCopy = toRef(props, 'postId')`. `postIdCopy` IS reactive)


## `RenderModel.vue`
Reminder: It's possible you won't have to build this component if there is a builder on your team!

generate the `RenderPostBody` component
```sh
hygen component new
✔ Component Type · module
✔ What module is this component for? · Post
✔ Choose a name for the component.
It should include the module name
e.g. CreatePostsTable or PostDetailsCard · RenderPostBody
```

`modules/Post/components/ShowPostView/ShowPostList.vue`
```vue
<script lang="ts" setup>
import { Post } from 'modules/Post/Post'

interface Props {
  post: Post
}

defineProps<Props>()
</script>

<template>
  <div v-html="post.body" />
</template>
```

Of course, if you had control over the backend you'd ensure `post.body` was sanitized!

### Why did we use the word "render"?
Usually, a component is suffixed with the root components name (e.g. "PostCard" when the root is a `<q-card></q-card>`). If the root component is a div, we may want to use a word like "render" to describe what the component does.