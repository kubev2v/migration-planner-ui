
# MigrationIssue


## Properties

Name | Type
------------ | -------------
`id` | string
`label` | string
`assessment` | string
`count` | number

## Example

```typescript
import type { MigrationIssue } from '@migration-planner-ui/agent-client'

// TODO: Update the object below with actual values
const example = {
  "id": null,
  "label": null,
  "assessment": null,
  "count": null,
} satisfies MigrationIssue

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as MigrationIssue
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


