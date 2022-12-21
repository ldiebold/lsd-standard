# Guide

## Do NOT style the root component of a lower level component
When building lower level components, it can be tempting to add styling to the root component

:x:`UsersTable.vue`
```vue
<template>
  <q-table
    :rows="users"
    flat
    bordered
    style="max-width: 650px"
  />
</template>
```

We want to avoid this because it **makes the component inflexible**. We want the **parent** to control the styling.
This means our lower level components can be used more agnostic.

:white_check_mark:`UsersTable.vue`
```vue
<template>
  <q-table :rows="users" />
</template>
```

:white_check_mark:`ManageUsersView.vue`
```vue
<template>
  <UsersTable
    :users="users"
    flat
    bordered
    style="max-width: 650px"
  >
</template>
```

## NO Global State
Global state in leaf components KILLS flexibility. We manage all of our global state in:
- views
- pages
- layouts

And NEVER inside leaf components.

✅ `ManageUsersView.vue`
```vue
<script setup lang="ts">
const userRepo = useRepo(User)
const users = computed(() => userRepo.all())
</script>

<template>
  <UsersTable :users="users" />
</template>
```


❌ `UsersTable.vue`
```vue
<script setup lang="ts">
const userRepo = useRepo(User) // << NEVER pollute leaf components with global state
const users = computed(() => userRepo.all())
</script>

<template>
  <q-table :rows="users" />
</template>
```

## NO API Requests
Making API calls in leaf components KILLS flexibility. We only make api calls in:
- views
- pages
- layouts
- service providers

And NEVER inside leaf components.

✅ `ManageUsersView.vue`
```vue
<script setup lang="ts">
const usersFetcher = useFetchResources(User, { immediate: true })
const users = computed(() => usersFetcher.repo.all())
</script>

<template>
  <UsersTable :users="users" />
</template>
```


❌ `UsersTable.vue`
```vue
<script setup lang="ts">
const usersFetcher = useFetchResources(User, { immediate: true }) // << NEVER pollute leaf components with backend requests
</script>

<template>
  <q-table :rows="users" />
</template>
```

## NO use of the current route
> this rule is also true for views

We want to push route knowledge as far up the chain as possible. Knowledge of route params is permitted in **pages**, but NOT **views** or **components**.

:white_check_mark:`ManageUserPage.vue`
```vue
<script>
const route = useRoute()
const userFetcher = useFetchResource(route.params.userId)
</script>

<template>
  <q-page padding>
    <ManageUserView />
  </q-page>
</template>
```
The code you see above is **pivotal** to our architecture! This means `ManageUserView.vue` can be ANYWHERE in our application!

- If we wanted a site with tabs, `ManageUserView.vue` could exist inside a tab because it's not coupled to the route.
- `ManageUserView.vue` could exist inside a dialog
```vue
<script setup lang="ts">
interface Props {

}

defineProps<{
  
}>()
</script>
<template>
  <q-dialog>
    <ManageUserView  />
  </q-dialog>
</template>
```
- `ManageUserView.vue` could be on a page with other views
```

```

none of the above three scenarios are possible if `ManageUserView.vue` has knowledge of the route.