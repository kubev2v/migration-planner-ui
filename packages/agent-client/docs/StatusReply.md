
# StatusReply


## Properties

Name | Type
------------ | -------------
`status` | string
`connected` | string
`statusInfo` | string
`agentStateUpdateSuccessful` | string
`agentStateUpdateErrMessage` | string
`inventoryUpdateSuccessful` | string
`inventoryUpdateErrMessage` | string

## Example

```typescript
import type { StatusReply } from '@migration-planner-ui/agent-client'

// TODO: Update the object below with actual values
const example = {
  "status": null,
  "connected": true,
  "statusInfo": null,
  "agentStateUpdateSuccessful": true,
  "agentStateUpdateErrMessage": null,
  "inventoryUpdateSuccessful": true,
  "inventoryUpdateErrMessage": null,
} satisfies StatusReply

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as StatusReply
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


