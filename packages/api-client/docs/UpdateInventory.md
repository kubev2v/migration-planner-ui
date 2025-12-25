
# UpdateInventory


## Properties

Name | Type
------------ | -------------
`agentId` | string
`inventory` | [Inventory](Inventory.md)

## Example

```typescript
import type { UpdateInventory } from '@migration-planner-ui/api-client'

// TODO: Update the object below with actual values
const example = {
  "agentId": null,
  "inventory": null,
} satisfies UpdateInventory

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as UpdateInventory
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


