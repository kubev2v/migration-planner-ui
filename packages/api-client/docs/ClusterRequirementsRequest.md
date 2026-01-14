
# ClusterRequirementsRequest

Request payload for calculating cluster requirements

## Properties

Name | Type
------------ | -------------
`clusterId` | string
`overCommitRatio` | string
`workerNodeCPU` | number
`workerNodeMemory` | number
`controlPlaneSchedulable` | boolean

## Example

```typescript
import type { ClusterRequirementsRequest } from '@migration-planner-ui/api-client'

// TODO: Update the object below with actual values
const example = {
  "clusterId": null,
  "overCommitRatio": null,
  "workerNodeCPU": null,
  "workerNodeMemory": null,
  "controlPlaneSchedulable": null,
} satisfies ClusterRequirementsRequest

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as ClusterRequirementsRequest
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


