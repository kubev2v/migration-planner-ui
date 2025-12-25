
# Job

Background job for async assessment creation

## Properties

Name | Type
------------ | -------------
`id` | number
`status` | [JobStatus](JobStatus.md)
`error` | string
`assessmentId` | string

## Example

```typescript
import type { Job } from '@migration-planner-ui/api-client'

// TODO: Update the object below with actual values
const example = {
  "id": null,
  "status": null,
  "error": null,
  "assessmentId": null,
} satisfies Job

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as Job
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


