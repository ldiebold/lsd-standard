# Using composables for globals
We always want it to be easy to trace our code. For that reason, avoid globals like the following:

❌`LinkItem.vue`
```vue
<template>
  <q-item @click="$router.push({ name; 'home' })">
    <q-item-section>
      Home
    </q-item-section>
  </q-item>
</template>
```
> this isn't a great example because `QItem` has a `to` prop

Instead, pull your globals in using the composition api. In Vue 3, this is always possible
> always possible... unless we're using a package that doesn't expose globals with the composition api (in which case we should get rid of said package 😉)

✅`LinkItem.vue`
```vue
<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()
</script>

<template>
  <q-item @click="router.push({ name; 'home' })">
    <q-item-section>
      Home
    </q-item-section>
  </q-item>
</template>
```

If you want to learn more about creating globals that are **NOT coupled to pinia**, check out [`createGlobalState` from vue use](https://vueuse.org/shared/createglobalstate/#createglobalstate)