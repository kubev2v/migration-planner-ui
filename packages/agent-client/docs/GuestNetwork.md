
# GuestNetwork


## Properties

Name | Type
------------ | -------------
`device` | string
`mac` | string
`ip` | string
`prefixLength` | number
`network` | string

## Example

```typescript
import type { GuestNetwork } from '@migration-planner-ui/agent-client'

// TODO: Update the object below with actual values
const example = {
  "device": null,
  "mac": null,
  "ip": null,
  "prefixLength": null,
  "network": null,
} satisfies GuestNetwork

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as GuestNetwork
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


