
# Source


## Properties

Name | Type
------------ | -------------
`id` | string
`name` | string
`inventory` | [Inventory](Inventory.md)
`createdAt` | Date
`updatedAt` | Date
`onPremises` | boolean
`agent` | [Agent](Agent.md)
`labels` | [Array&lt;Label&gt;](Label.md)
`infra` | [SourceInfra](SourceInfra.md)

## Example

```typescript
import type { Source } from '@migration-planner-ui/agent-client'

// TODO: Update the object below with actual values
const example = {
  "id": null,
  "name": null,
  "inventory": null,
  "createdAt": null,
  "updatedAt": null,
  "onPremises": null,
  "agent": null,
  "labels": null,
  "infra": null,
} satisfies Source

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as Source
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


