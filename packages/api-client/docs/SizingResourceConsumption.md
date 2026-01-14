
# SizingResourceConsumption

Resource consumption across the cluster

## Properties

Name | Type
------------ | -------------
`cpu` | number
`memory` | number
`limits` | [SizingResourceLimits](SizingResourceLimits.md)
`overCommitRatio` | [SizingOverCommitRatio](SizingOverCommitRatio.md)

## Example

```typescript
import type { SizingResourceConsumption } from '@migration-planner-ui/api-client'

// TODO: Update the object below with actual values
const example = {
  "cpu": null,
  "memory": null,
  "limits": null,
  "overCommitRatio": null,
} satisfies SizingResourceConsumption

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as SizingResourceConsumption
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


