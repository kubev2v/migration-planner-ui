
# SourceInfra


## Properties

Name | Type
------------ | -------------
`proxy` | [AgentProxy](AgentProxy.md)
`sshPublicKey` | string
`vmNetwork` | [VmNetwork](VmNetwork.md)

## Example

```typescript
import type { SourceInfra } from '@migration-planner-ui/api-client'

// TODO: Update the object below with actual values
const example = {
  "proxy": null,
  "sshPublicKey": null,
  "vmNetwork": null,
} satisfies SourceInfra

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as SourceInfra
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


