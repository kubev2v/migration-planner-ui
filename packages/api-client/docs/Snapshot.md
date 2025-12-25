
# Snapshot


## Properties

Name | Type
------------ | -------------
`inventory` | [Inventory](Inventory.md)
`createdAt` | Date

## Example

```typescript
import type { Snapshot } from '@migration-planner-ui/api-client'

// TODO: Update the object below with actual values
const example = {
  "inventory": null,
  "createdAt": null,
} satisfies Snapshot

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as Snapshot
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


