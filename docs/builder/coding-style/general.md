# Coding Style

## Avoid long lines
Removing `{}`'s and lines is NOT how we write readable code.

**Readable code tends to be terse, but that doesn't mean `terse === 'readability'`**

## Consider arrays instead of if statements

:x:
```ts
const canCreatePost computed(() => {
  if(user.role === 'editor') return true
  if(user.role === 'publisher') return true
  if(user.role === 'author') return true
  if(user.role === 'admin') return true
  if(user.role === 'superAdmin') return true
})
```
:x:
```ts
const canCreatePost computed(() => {
  if(
    user.role === 'editor' ||
    user.role === 'publisher' ||
    user.role === 'author' ||
    user.role === 'admin' ||
    user.role === 'superAdmin'
  ) {
    return true
  }
})
```
:white_check_mark:
```ts
const canCreatePost computed(() => {
  const canCreatePostRoles = [
    'editor',
    'publisher',
    'author',
    'admin',
    'superAdmin'
  ]
  return canCreatePostRoles.includes(user.role)
})
```
Since the data for `canCreatePostRoles` would almost certainly come from the backend, we'd use a composable to manage user permissions. Here's a more realistic example.
```vue
<script setup lang="ts">
const userCan = useCan()
</script>

<template>
  <q-page>
    <q-page-sticky
      v-if="userCan('create', Post)"
      position="bottom-right"
    >
      <q-btn :icon="mdiPlus" fab />
    </q-page-sticky>
  </q-page>
</template>
```