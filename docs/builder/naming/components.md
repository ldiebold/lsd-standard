# Naming Components
We use strict **conventions for naming files**, and placing them in predictible places.

If learned and followed, these conventions create an *invisible line of communication* among teams. Less has to be explained, and we can more fluently communicate through our code.

Take the following as an example:

`UserDetailsCard.vue`
```vue
<template>
  <q-card>
    <q-card-section>
      User Info...
    </q-card-section>
  </q-card>
</template>
```
If we agree to always match the **name of the Quasar component** with the last **word of the file**, the user of this component instantly has more knowledge.

For example, we now know we can add Quasar properties to the `UserDetailsCard` component:
```vue
<template>
  <UserDetailsCard
    flat
    bordered
  />
</template>
```
if you know `QCard`

## Layouts
`src/layouts/MainLayout/MainLayout.vue`

### Pascal Case
Use Pascal Case

### Inside Folders
All layouts must be inside a folder

This means if the layout gets more complicated, we have an obvious place to extract logic

### Layout and Folder, Same Name
The layouts and folders must have the same name
```sh
MainLayout/MainLayout.vue
```
some prefer to call the file `Index.vue`. We don't do this for two reasons
1. Vue cannot predict the components name
2. It's harder to find in the IDE when searching (`ctrl + p`)


## Pages
`src/pages/MainPage/MainPage.vue`

### Pascal Case
Use Pascal Case

### Inside Folders
All pages must be inside a folder

This means if the page gets more complicated, we have an obvious place to extract logic

### Page and Folder, Same Name
The pages and folders must have the same name
```sh
MainPage/MainPage.vue
```
some prefer to call the file `Index.vue`. We don't do this for two reasons
1. Vue cannot predict the components name
2. It's harder to find in the IDE when searching (`ctrl + p`)

## Template: PascalCase for our components, kebab-case for everything else
```vue
<template>
  <q-banner>
    You can manage users below
  </q-banner>

  <UsersTable />
</template>
```

Notice that we use `q-banner` (kebab) for the Quasar component, and `UsersTable` (pascal) for our custom component.

We do this for two main reasons:
1. Quickly see the difference between a Quasar component, and a custom component
2. Pascal is more "double clickable". It's more common to select a custom component when coding, and it's faster to select a pascal component because the `-` makes this slower with kebab case.

## Always pluralize accurately

## Naming Pages that manage data
For pages that manage data for a resource, we use the word `Manage` in the file name. Here are some examples:

- `ManageUsersPage.vue`
- `ViewUsersPage.vue`
- `ManageUsersView.vue`
- `ManageUsersTable.vue`

As mentioned in the previous section, be sure to use correct pluralization!
- `ManageUsersTable.vue`
is different to
- `ManageUserTable.vue`

### Why?

Imagine surfing through the `pages` folder in an app, and seeing `UsersPage.vue`.
- Can we delete users on this page?
- Is it only for displaying users?

It's too vague and for that reason, we *always add a **purpose** word* to add immediate context for others devs on our team!

### Single action pages

In some cases, we may want pages that only perform **one** CRUD operations. Here are some examples of how we'd name such pages:
- `RemoveUsersPage.vue` (we use the word `remove`, because furthur down the component tree, `delete` becomes a problematic word)
- `UpdateUsersPage.vue`
- `ViewUsersPage.vue`