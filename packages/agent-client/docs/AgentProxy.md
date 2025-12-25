
# AgentProxy


## Properties

Name | Type
------------ | -------------
`httpUrl` | string
`httpsUrl` | string
`noProxy` | string

## Example

```typescript
import type { AgentProxy } from '@migration-planner-ui/agent-client'

// TODO: Update the object below with actual values
const example = {
  "httpUrl": null,
  "httpsUrl": null,
  "noProxy": null,
} satisfies AgentProxy

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as AgentProxy
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


