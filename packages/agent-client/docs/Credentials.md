
# Credentials

VMware credentials for the discovery process

## Properties

Name | Type
------------ | -------------
`url` | string
`username` | string
`password` | string
`isDataSharingAllowed` | boolean

## Example

```typescript
import type { Credentials } from '@migration-planner-ui/agent-client'

// TODO: Update the object below with actual values
const example = {
  "url": https://vcenter.example.com,
  "username": user@example.com,
  "password": null,
  "isDataSharingAllowed": null,
} satisfies Credentials

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as Credentials
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


