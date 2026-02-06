
# VMListResponse


## Properties

Name | Type
------------ | -------------
`vms` | [Array&lt;VM&gt;](VM.md)
`total` | number
`page` | number
`pageCount` | number

## Example

```typescript
import type { VMListResponse } from '@migration-planner-ui/agent-client'

// TODO: Update the object below with actual values
const example = {
  "vms": null,
  "total": null,
  "page": null,
  "pageCount": null,
} satisfies VMListResponse

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as VMListResponse
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


