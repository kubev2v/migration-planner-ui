
# Network


## Properties

Name | Type
------------ | -------------
`type` | string
`name` | string
`vlanId` | string
`dvswitch` | string
`vmsCount` | number

## Example

```typescript
import type { Network } from '@migration-planner-ui/api-client'

// TODO: Update the object below with actual values
const example = {
  "type": null,
  "name": null,
  "vlanId": null,
  "dvswitch": null,
  "vmsCount": null,
} satisfies Network

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as Network
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


