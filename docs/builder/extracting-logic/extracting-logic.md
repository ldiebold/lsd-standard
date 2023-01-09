# Extracting Logic
This is the most important concept we'll cover. If we don't know how to extract logic, we don't know how to create maintainable code.

> The key to maintainable code is knowing HOW and WHERE to extract logic.

We'll cover:
- the how and where of extracting **components** (SFCs)
- the how and where of extracting **logic** (usually composables, sometimes helpers)
- managing complexity (how extracting relates to the `page > views > components` architecture)

## Single Context Vs Multi Context Components
Usually when extracting components, we want to use the generator:
```sh
hygen new component
```
However, sometimes we want to extract a component that would **never be used somewhere else**. We call these **single context components**.

**Single context components** are created in the same folder they're used, and **never used anywhere else**. That's why they're called **single context components**, because they're only used in a **one** context.

Here's an example of a single context components (UsersTableRow.vue is the single context component):
```yaml
📁 modules
    📁 User
      📁 components
        📁 UsersTable
          - UsersTable.vue
          - UsersTableRow.vue
```
In the example above, we could have given `UsersTableRow.vue` its own folder, but there's no point. Why is there no point? Because `UsersTableRow.vue` would **only be used by `UsersTable.vue`**. In other words, `UsersTableRow.vue` would only be used in one context. In other words, `UsersTableRow.vue` is a **single context component**. Starting to make sense?

Again.
> Single context components are only ever used in **one context**

If our table rows also started to feel like they were getting out of hand, you could also start making components for cells. **This is totally fine!** You'll probably find that as you get good at extracting logic, it's very difficult to go "too far". Small files are *usually* an indicator of a flexible website that's easy for other developers to understand.

It's also worth noting, you're welcome to create more folders to help organize our components (In the example below, "cells" gets its own folder so that the cell components don't flood our `UsersTable` folder):
```
📁 modules
    📁 User
      📁 components
        📁 UsersTable
          - UsersTable.vue
          - UsersTableRow.vue
          📁 cells
            - NameCell.vue
            - EmailCell.vue
            - IdCell.vue
            - FriendsCell.vue
            - DateCreatedCell.vue
```
We have many single context components in the example above! All those cells, and the `UsersTableRow.vue` file are **single context components**. The only component that would end up being used in a view, is `UsersTable.vue`.

That's actually an important thing to note! A component folder (in this case, `UsersTable/`) **only ever has one component that gets used, and it always has the same name as the folder.** The only reason we nest these components in folders, is to have a sensible place to extract logic. By the way...

Ever worked on a project where nobody ever extracted logic, and some files ended up being thousands of lines long? **component folders is part of the solution to enormous, difficult to maintain files.**