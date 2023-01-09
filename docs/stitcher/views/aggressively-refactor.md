# Aggressively Refactor
The quality, extendability and to be frank "sexiness" of our code hinges on our ability to refactor. This is especially true when creating views.

> Aggressively refactor `views`

Here's an example of a beautifully refactored view:

:white_check_mark:`ManageUsersView.vue`
```vue
<script setup lang="ts">
import useUsersFetcher from './useUsersFetcher'
import useUserCreator from './useUserCreator'
import useUserUpdater from './useUserUpdater'
import useUserRemover from './useUserRemover'

const usersFetcher = useUsersFetcher()
const userCreator = useUsersCreator()
const userUpdater = useUsersUpdater()
const userRemover = useUsersRemover()
</script>

<template>
  <ManageUsersTable
    v-model:pagination="usersFetcher.pagination.value"
    @request="usersFetcher.onTableRequest"
    :users="usersFetcher.users.value"
    :loading="usersFetcher.fetching.value"
    @create="userCreator.showDialog.value = true"
    @update="user => {
      userUpdater.id.value = true
      userUpdater.showDialog.value = true
    }"
    @remove="user => {
      userRemover.id.value = user.id
      userRemover.showDialog.value = true
    }"
  />

  <CreateUserDialog
    v-model="userCreator.showDialog.value"
    v-model:form="userCreator.form.value"
  />

  <UpdateUserDialog
    v-model="userUpdater.showDialog.value"
    v-model:form="userUpdater.form.value"
  />

  <RemoveUserDialog v-model="userRemover.showDialog.value" />
</template>
```