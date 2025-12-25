
# Inventory


## Properties

Name | Type
------------ | -------------
`vcenterId` | string
`clusters` | [{ [key: string]: InventoryData; }](InventoryData.md)
`vcenter` | [InventoryData](InventoryData.md)

## Example

```typescript
import type { Inventory } from '@migration-planner-ui/agent-client'

// TODO: Update the object below with actual values
const example = {
  "vcenterId": null,
  "clusters": null,
  "vcenter": null,
} satisfies Inventory

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as Inventory
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


