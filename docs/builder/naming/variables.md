# Variables

## Usually Camel Case
When in doubt, use camel case.

## snake_case for database fields
When you see snake_case variables, think "this is how the variable looks in the API".

Take this example of code that creates data on the backend:
```ts
const postCreator = useCreateResource(Post)
postCreator.form.value.title = 'The Art Of Vue'
postCreator.form.value.author_id = 7 // << snake_case for multiple words

postCreator.create()
```

Notice `author_id` uses snake_case. This is because **api and database fields are always in snake case**. This convention helps communicate when a field is "raw from the api".

Let's expand on this:
```ts
interface Props {
  user: User
}

const props = defineProps<Props>()

const fullName = computed(() => `${props.user.first_name} ${props.user.last_name}`)
```

notice that `fullName` is NOT using snake case. That's because `fullName` is **not a raw value from the api**.

There is one exception, and that's *calculated fields* from the backend.
```ts
interface Props {
  user: User
}

const props = defineProps<Props>()

console.log(props.user.fullName)
```
In the example above, the api has already calculated `fullName` for us. `fullName` is not in snake_case so **we know it's not a raw value and therefore, cannot be changed**

:x:
```ts
const userCreator = useCreateResource(User)
userCreator.form.value.fullName = 'Luke Diebold' // << We know fullName cannot be changed because it's NOT in snake_case
postCreator.create()
```

A calculated field is NOT a raw value, and therefore not in snake_case. Again, snake case means "this is a **raw** value from the api".

## Avoiding name clashes
Sometimes when variable names clash, it's hard to know how to maintain concise naming, while avoiding the clash. Here's how we'll handle these clashes.

> The general rule is "be **accurate**, be **specific**"

### Parameters
Here's a real world example of how name clashing can be difficult to avoid.

```ts
export default resourceFinder (id) {
  const id = ref(id)

  function find(id) {
    const id = 
  }

  return {
    find
  }
}
```

Obviously, the code above won't work. Id is defined twice, redefined with params... it's a nightmare! Let's clean it up and remember:

> The general rule is "be **accurate**, be **specific**"

```ts
export default resourceFinder (initialId) {
  const idRef = ref(id)

  function find(id) {
    const id = 
  }

  return {
    find
  }
}
```