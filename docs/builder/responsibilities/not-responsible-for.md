# Not Responsible For
One of the most exciting things about this architecture, is the narrow focus of responsibilities you have as a builder. This is a good thing! It means you're less likely to get overwhelmed, have the chance to get highly adept at building components (because you're not distracted by other concepts), and will be able to contribute to a **real, live codebase** far sooner than if you had to understand the entire system!

## Backend Requests
Builders only create leaf components, and leaf components NEVER make backend requests

❌ No backend requests
```vue
<script lang="ts" setup>
const commentsFetcher = useFetchResources(Comment)
</script>

Sweet! That's one less thing you have to worry about until you're ready to become a stitcher 🪡
```

## No Global State
You don't have to worry about global state, it's handled by stitchers. The components a builder builds, simply accept props, and emit events.

❌ No global state
```vue
<script lang="ts" setup>
const commentsRepo = useRepo(Comment)
</script>
```

## No Routing
Yep, that's right. You don't have to think about routing until you become a stitcher!

❌ No knowledge of the current route
```vue
<script lang="ts" setup>
const route = useRoute()
</script>
```

## A Pages Layout
organizing our components on a page can get surprisingly complicated and finicky. Builders don't have to worry about layout, they only create the "building blocks" of an app.

## Summary
It's worth repeating that as a **builder**, you never ever make backend requests, deal with global state, or pollute your components with knowledge of the route:

❌ No backend requests
```vue
<script lang="ts" setup>
const commentsFetcher = useFetchResources(Comment)
</script>
```

❌ No global state
```vue
<script lang="ts" setup>
const commentsRepo = useRepo(Comment)
</script>
```

❌ No knowledge of the current route
```vue
<script lang="ts" setup>
const route = useRoute()
</script>
```

If any of this doesn't make sense, please clarify with a stitcher, artisan or architect! Following those three rules is fundamental to being an effective builder!