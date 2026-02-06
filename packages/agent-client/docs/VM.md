
# VM


## Properties

Name | Type
------------ | -------------
`name` | string
`id` | string
`vCenterState` | string
`cluster` | string
`diskSize` | number
`memory` | number
`issueCount` | number
`inspection` | [VmInspectionStatus](VmInspectionStatus.md)

## Example

```typescript
import type { VM } from '@migration-planner-ui/agent-client'

// TODO: Update the object below with actual values
const example = {
  "name": null,
  "id": null,
  "vCenterState": null,
  "cluster": null,
  "diskSize": null,
  "memory": null,
  "issueCount": null,
  "inspection": null,
} satisfies VM

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as VM
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


