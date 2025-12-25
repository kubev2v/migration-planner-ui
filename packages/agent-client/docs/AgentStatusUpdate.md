
# AgentStatusUpdate


## Properties

Name | Type
------------ | -------------
`status` | string
`statusInfo` | string
`credentialUrl` | string
`version` | string
`sourceId` | string

## Example

```typescript
import type { AgentStatusUpdate } from '@migration-planner-ui/agent-client'

// TODO: Update the object below with actual values
const example = {
  "status": null,
  "statusInfo": null,
  "credentialUrl": null,
  "version": null,
  "sourceId": null,
} satisfies AgentStatusUpdate

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as AgentStatusUpdate
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


