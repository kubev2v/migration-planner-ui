
# SourceCreate


## Properties

Name | Type
------------ | -------------
`name` | string
`sshPublicKey` | string
`proxy` | [AgentProxy](AgentProxy.md)
`certificateChain` | string
`network` | [VmNetwork](VmNetwork.md)
`labels` | [Array&lt;Label&gt;](Label.md)

## Example

```typescript
import type { SourceCreate } from '@migration-planner-ui/api-client'

// TODO: Update the object below with actual values
const example = {
  "name": null,
  "sshPublicKey": null,
  "proxy": null,
  "certificateChain": null,
  "network": null,
  "labels": null,
} satisfies SourceCreate

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as SourceCreate
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


