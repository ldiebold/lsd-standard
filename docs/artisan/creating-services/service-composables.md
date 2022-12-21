# Creating Robust Service Composables

## MaybeComputedRef

## Callbacks
on request (e.g. `onFetch` and `onSearch`)
on authenticated
on error
When script loaded (most likely not required)
**What if callbacks are async?**

## Config
```js
const {
	valueDark = 'dark',
	valueLight = '',
	window = defaultWindow,
} = options
```
- Use provide/inject to allow more than one config (including a default)
```js
export default config {
	defaultProvider: 'default',
	
	providers: {
		default: {
			"appKey": "SOME_KEY",
		},
		sansar: {
			"appKey": "SOME_KEY",
		}
	}
}
```
- use provide/inject to supply config/credentials via a plugin
```javascript
const VuePlugin = {
  install: (app, options) => {
    app.provide('youtube.config.default', options.providers[options.defaultProvider])
    const providers = Object.keys(options.providers)
    providers.forEach(providerKey => {
      provideFeatures(options.providers[providerKey], providerKey, app)
    })
  }
}
```
allow default credentials to easily be overwritten with option passed to composable
use deepmerge to merge config
use deepmerge for things like request params
provide an "immediate" option
```js
const youTubeService = useYouTube('playlist', {
  immediate: true
})
```

## Function Params
params might recieve MaybeComputedRef
either first or second param should be an options object

## Error handling
### Notifications
- If using "Notify", decouple notify by using provide/inject to supply a notifier
- Make is possible to disable notifications with an option
```js
const apiService = useSomeApi({
	notifyOnError: false,
	notifyOnSuccess: true
})
```

### standardised error handling
Here is how we store errors. The structure of the data itself will depend on the backend:
- standardErrors: read only ref
- validationErrors: read only
- hasStandardErrors: computed bool
- hasValidationErrors: computed bool
- hasErrors: computed bool


## Create
## Find
## Index
### Related data
- Will almost always include the following
	- `with | populate | expose | include...` (use the apis naming (e.g. `populate` with Strapi and `expose` with dataverse))
	- `filters`
	- `orderBy | sortBy`
	- 
## Remove
We use the word "remove" because "delete" can be problematic (because it exists in the global scope)
- props
	- `removing`: **this is an id, NOT a boolean**. This makes it much easier to handle loading spinners
	- `remove(id)`: If "id" is not provided, the ref `id` is used instead
	- `id` ref
	- 
## Update

## Persisting to the store
> **Note**
> :info: the store must be completely decoupled 

## Global State
We want to make it as simple as possible 
> [!warning]
> do NOT implement global state! The state machine must be swapable, as state is very likely to change

### configuration
Indicate 
### Allowing for more than one state machine
### specifying the data insertion strategy
There are 3 ways we can insert data
- insert
	- if the id exists, the data is replaced
	- if the data does NOT exists, it's created
- replace
	- all data is wiped
	- the new data is inserted
- withRelated (true by default)
	- insert related data as well
- 
## Default filters (WIP)
Can we have a filter that's always added to the request? Maybe having a way to get the filter from the model?