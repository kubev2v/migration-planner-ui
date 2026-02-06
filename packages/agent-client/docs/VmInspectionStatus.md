
# VmInspectionStatus


## Properties

Name | Type
------------ | -------------
`state` | string
`error` | string
`results` | object

## Example

```typescript
import type { VmInspectionStatus } from '@migration-planner-ui/agent-client'

// TODO: Update the object below with actual values
const example = {
  "state": null,
  "error": null,
  "results": null,
} satisfies VmInspectionStatus

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as VmInspectionStatus
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


