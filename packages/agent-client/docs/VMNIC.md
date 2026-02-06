
# VMNIC


## Properties

Name | Type
------------ | -------------
`mac` | string
`network` | string
`index` | number

## Example

```typescript
import type { VMNIC } from '@migration-planner-ui/agent-client'

// TODO: Update the object below with actual values
const example = {
  "mac": null,
  "network": null,
  "index": null,
} satisfies VMNIC

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as VMNIC
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


