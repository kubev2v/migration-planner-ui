
# Agent


## Properties

Name | Type
------------ | -------------
`id` | string
`status` | string
`statusInfo` | string
`credentialUrl` | string
`createdAt` | Date
`updatedAt` | Date
`version` | string

## Example

```typescript
import type { Agent } from '@migration-planner-ui/agent-client'

// TODO: Update the object below with actual values
const example = {
  "id": null,
  "status": null,
  "statusInfo": null,
  "credentialUrl": null,
  "createdAt": null,
  "updatedAt": null,
  "version": null,
} satisfies Agent

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as Agent
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


