
# AgentStatus


## Properties

Name | Type
------------ | -------------
`mode` | string
`consoleConnection` | string
`error` | string

## Example

```typescript
import type { AgentStatus } from '@migration-planner-ui/agent-client'

// TODO: Update the object below with actual values
const example = {
  "mode": null,
  "consoleConnection": null,
  "error": null,
} satisfies AgentStatus

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as AgentStatus
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


