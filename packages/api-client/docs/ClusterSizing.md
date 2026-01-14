
# ClusterSizing

Overall cluster sizing summary

## Properties

Name | Type
------------ | -------------
`totalNodes` | number
`workerNodes` | number
`controlPlaneNodes` | number
`totalCPU` | number
`totalMemory` | number

## Example

```typescript
import type { ClusterSizing } from '@migration-planner-ui/api-client'

// TODO: Update the object below with actual values
const example = {
  "totalNodes": null,
  "workerNodes": null,
  "controlPlaneNodes": null,
  "totalCPU": null,
  "totalMemory": null,
} satisfies ClusterSizing

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as ClusterSizing
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


