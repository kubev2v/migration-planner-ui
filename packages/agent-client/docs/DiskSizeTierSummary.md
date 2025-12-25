
# DiskSizeTierSummary


## Properties

Name | Type
------------ | -------------
`totalSizeTB` | number
`vmCount` | number

## Example

```typescript
import type { DiskSizeTierSummary } from '@migration-planner-ui/agent-client'

// TODO: Update the object below with actual values
const example = {
  "totalSizeTB": null,
  "vmCount": null,
} satisfies DiskSizeTierSummary

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as DiskSizeTierSummary
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


