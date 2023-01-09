# Styling

## Quasar's utility classes
Lean HEAVILY on Quasar's utility classes. They allow us to add margins, paddings, colors, typography etc in a standardized way. Most importantly, spend a good chunk of time deeply understanding
- the [grid system](https://quasar.dev/layout/grid/introduction-to-flexbox)
  - Also be sure to test your knowledge as you learn with [the playground](https://quasar.dev/layout/grid/flex-playground)
- relative vs absolute positioning (A frustrating quirk of CSS we all have to learn)
  - Note, Quasar has `absolute`, `position-relative` and [many other variants](https://quasar.dev/style/positioning#introduction) such as `absolute-top`

> !!!IMPORTANT!!! never ever put a `col` on a leaf component. Why? Because it makes the component inflexible. A component with `col` and only exist in one context, and we want **flexible styling** that allows our components to work in any context.

## The Rules...
- Leaf components CANNOT have any of the following styling on the **root** component (mostly "position" related styling)
  - width/height (however min/max width/height are okay!)
    - Why? Because leaf components must be flexible. The **parent** should be in charge of the width/height.
  - margins
  - padding
  - colors (unless supplied as a prop)
  - `col` classes (rows and columns are okay, though probably rarely needed). Again, this is the parents job. Most "position related styling" should happen on the parent and is not a builders responsibility.

Please read the above rules again and remember, we're only talking about the **root** component. All of the above rules are allowed **within** leaf components:

❌ Never hardcode a width, it makes the component inflexible
```vue
<template>
  <q-card style="width: 400px">
    content
  </q-card>
</template>
```

❌ Never hardcode a `col`, they make the component inflexible
```vue
<template>
  <q-card class="col-4">
    content
  </q-card>
</template>
```

❌ Never hardcode a margin, they make the component inflexible
```vue
<template>
  <q-card class="q-ma-md">
    content
  </q-card>
</template>
```

✅ Usually, the root won't need any styling at all. The component below is flexible, and its styling can be handled by the parent 👍.
```vue
<template>
  <q-card>
    Content
  </q-card>
</template>
```