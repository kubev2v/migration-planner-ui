
# Datastore


## Properties

Name | Type
------------ | -------------
`type` | string
`totalCapacityGB` | number
`freeCapacityGB` | number
`vendor` | string
`diskId` | string
`hardwareAcceleratedMove` | boolean
`protocolType` | string
`model` | string
`hostId` | string

## Example

```typescript
import type { Datastore } from '@migration-planner-ui/api-client'

// TODO: Update the object below with actual values
const example = {
  "type": null,
  "totalCapacityGB": null,
  "freeCapacityGB": null,
  "vendor": null,
  "diskId": null,
  "hardwareAcceleratedMove": null,
  "protocolType": null,
  "model": null,
  "hostId": null,
} satisfies Datastore

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as Datastore
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


