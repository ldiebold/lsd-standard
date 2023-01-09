# Views in Views
Sometimes, one view may not be enough and that's okay! Feel free to use views within views.

Keep in mind, views usually make backend requests. This is what makes them isolated! For that reason, we don't want to go too far nesting views in views, otherwise one page load can end up making too many requests.

Here are some examples where Views in views may make sense.

## Panels
Often panels end up containing an entire view. Often panels are kind of like "mini pages" so it makes sense that they'd have a view in them. Here's a real world example (simplified), of panels with views:

`VideoResourcesView.vue`
```vue
<script lang="ts" setup>
interface Props {
  videoId: string
}

const props = defineProps<Props>()

const tab = ref('comments')
</script>

<template>
  <q-tabs v-model="tab">
    <q-tab name="comments" />
    <q-tab name="notes" />
    <q-tab name="documents" />
  </q-tabs>

  <q-panels v-model="tab">
    <q-panel name="comments">
      <CommentsView :video-id="videoId" />
    </q-panel>

    <q-panel name="notes">
      <ManageNotesView :video-id="videoId" />
    </q-panel>

    <q-panel name="documents">
      <DocumentsView :video-id="videoId" />
    </q-panel>
  </q-panels>
</template>
```

> Note: in the example above, we would consider refactoring by creating a `VideoResourcesTabs.vue` and `VideoResourcesPanels.vue` component.
> Note: we use the word "Manage" with the notes view, because it implies the user can CRUD a note. A user cannot CRUD a document or comment in this example, that's why they aren't prefixed with "Manage".

By the way, that `ManageNotesView.vue` component would likely have a view in it too! For example, a dialog containing a `ManageNoteView.vue` (notice "Note" is singular). So we might end up with a view in a view in a view. Try to picture the following in your head:

`VideoResourcesView -> NotesView -> ManageNoteDialog -> ManageNoteView`
## Dialogs
Imagine a page that displays details for a flight. That page might have a `FligthDetailsView` in it that fetches the flight data, and displays the components describing the flight.

`FligthDetailsPage.vue`
```vue
<script setup lang="ts">
interface Props {
  flightId: string
}

defineProps<Props>()
</script>

<template>
  <q-page padding>
    <FligthDetailsView :flight-id="flightId" />
  </q-page>
</template>
```

The cool thing about views is they're highly reuseable, so those flight details **could also display in a dialog**. For example, when selecting a flights in a `FlightsTable.vue`!

`FlightsTable.vue`
```vue
<script lang="ts" setup>
const selectedFlightId = ref<string>()
</script>

<template>
  <q-table>
    <template #bottom>
      <!-- This dialog contains the FligthDetailsView component -->
      <FlightDetailsDialog
        :model-value="!!selectedFlightId"
        :flight-id="selectedFlightId"
        @hide="selectedFlightId = undefined"
      />
    </template>

    <template #body="scope">
      <q-tr @click="selectedFlightId = scope.row.id">
        <!-- cells left our for brevity -->
      </q-tr>
    </template>
  </q-table>
</template>
```

In the above example, the **dialog contains a view**. The point we're trying to make here is that **leaf components can have views in them**. Views don't have to be in pages, they're more flexible than that. They can be anywhere in the component tree. In the example above, it would be `ManageFlightsPage -> ManageFlightsView -> ManageFlightsTable -> FlightDetailsDialog -> FlightDetailsView`.

> `FlightDetailsView.vue` is within `ManageFlightsPage.vue` (hence, "view in a view")

Again, this is one of the wonderful things about views! They're **highly agnostic**(have very little knowledge of their context) and therefore, highly reuseable!