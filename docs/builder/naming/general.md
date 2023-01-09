# General

## Do NOT shorten things
There are a few exceptions to this rule

```ts
const eqt = [
  'Fork Lift',
  ''
]
```
Do you know what eqt stands for? In this case, it's "equipment".

## Wrong words are okay if they solve pluralization issues
There is nothing worse than a word you can't pluralize. For example, `equipment`.

Using `equipment` as an example, there are two ways we can solve this:
1. use `equipments` as the plural, and `equipment` as the singular
2. use `equipment` as the plural, and `equipmentItem` as the singular

It's hard to create a hard rule around this, because both these scenarios aren't ideal. *We will lean toward option 1* because it makes editing files easier (often you have a list of singular table names, and want to pluralize them by simply adding an "s")