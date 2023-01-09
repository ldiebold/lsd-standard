# Coding Style

## Do NOT spread or destructure a composable
It's tempting to destructure composables in an attempt to be terse:

:x:
```vue
<script setup lang="ts">
const { create, form } = useCreateResource(Post)
</script>

<template>
  <div>
    <q-input v-model="form.title" />
    <q-btn @click="create" />
  </div>
</template>
```
For small projects this is fine, but we're not building small projects. Code like this causes clashes, and future devs won't have the context they need to understand the code.

Here's an example of a clash:

:x: variable name clash
```vue
<script setup lang="ts">
const { create, form } = useCreateResource(Post)
const { create, form } = useCreateResource(PostTag) // create and form already defined
</script>

<template>
  <div>
    <q-input v-model="form.title" />
    <q-btn @click="create" />
  </div>
</template>
```

Instead, we'll **always assign composables to a variable**

> Note: we won't use the `postTagCreator` in the example below for brevity

:white_check_mark: aviod variable name clashes
```vue
<script setup lang="ts">
const postCreator = useCreateResource(Post)
const postTagCreator = useCreateResource(PostTag)
</script>

<template>
  <div>
    <q-input v-model="postCreator.form.value.title" />
    <q-btn @click="postCreator.create()" />
  </div>
</template>
```

One may think this is too verbose:
```ts
postCreator.form.value.title
```
Yes, it's more verbose, however that code gives future dev more context, and thus helps them avoid mistakes.

It's also worth mentioning, a more realistic example looks cleaner:

```vue
<script setup lang="ts">
import PostForm from 'modules/Post/components/PostForm/PostForm.vue'

const postCreator = useCreateResource(Post)
const postTagCreator = useCreateResource(PostTag)
</script>

<template>
  <div>
    <PostForm v-model="postCreator.form.value" />
    <q-btn @click="postCreator.create()" />
  </div>
</template>
```