
# Status

Status is a return value for calls that don\'t return other objects.

## Properties

Name | Type
------------ | -------------
`message` | string
`reason` | string
`status` | string

## Example

```typescript
import type { Status } from '@migration-planner-ui/api-client'

// TODO: Update the object below with actual values
const example = {
  "message": null,
  "reason": null,
  "status": null,
} satisfies Status

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as Status
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


