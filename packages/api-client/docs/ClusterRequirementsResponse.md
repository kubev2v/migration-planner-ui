
# ClusterRequirementsResponse

Cluster requirements calculation results

## Properties

Name | Type
------------ | -------------
`clusterSizing` | [ClusterSizing](ClusterSizing.md)
`resourceConsumption` | [SizingResourceConsumption](SizingResourceConsumption.md)
`inventoryTotals` | [InventoryTotals](InventoryTotals.md)

## Example

```typescript
import type { ClusterRequirementsResponse } from '@migration-planner-ui/api-client'

// TODO: Update the object below with actual values
const example = {
  "clusterSizing": null,
  "resourceConsumption": null,
  "inventoryTotals": null,
} satisfies ClusterRequirementsResponse

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as ClusterRequirementsResponse
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


