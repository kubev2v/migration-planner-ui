
# Infra


## Properties

Name | Type
------------ | -------------
`totalHosts` | number
`totalDatacenters` | number
`totalClusters` | number
`clustersPerDatacenter` | Array&lt;number&gt;
`cpuOverCommitment` | number
`memoryOverCommitment` | number
`hosts` | [Array&lt;Host&gt;](Host.md)
`hostsPerCluster` | Array&lt;number&gt;
`vmsPerCluster` | Array&lt;number&gt;
`hostPowerStates` | { [key: string]: number; }
`networks` | [Array&lt;Network&gt;](Network.md)
`datastores` | [Array&lt;Datastore&gt;](Datastore.md)

## Example

```typescript
import type { Infra } from '@migration-planner-ui/agent-client'

// TODO: Update the object below with actual values
const example = {
  "totalHosts": null,
  "totalDatacenters": null,
  "totalClusters": null,
  "clustersPerDatacenter": null,
  "cpuOverCommitment": null,
  "memoryOverCommitment": null,
  "hosts": null,
  "hostsPerCluster": null,
  "vmsPerCluster": null,
  "hostPowerStates": null,
  "networks": null,
  "datastores": null,
} satisfies Infra

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as Infra
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


