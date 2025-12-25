
# Info

Migration planner information

## Properties

Name | Type
------------ | -------------
`gitCommit` | string
`versionName` | string

## Example

```typescript
import type { Info } from '@migration-planner-ui/api-client'

// TODO: Update the object below with actual values
const example = {
  "gitCommit": c5a1661465a25b17ceeeb77d1ec40deb57d8da44,
  "versionName": 0.1.4-40-gc5a1661,
} satisfies Info

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as Info
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


