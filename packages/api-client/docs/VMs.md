
# VMs


## Properties

Name | Type
------------ | -------------
`total` | number
`totalMigratable` | number
`totalMigratableWithWarnings` | number
`totalWithSharedDisks` | number
`cpuCores` | [VMResourceBreakdown](VMResourceBreakdown.md)
`diskSizeTier` | [{ [key: string]: DiskSizeTierSummary; }](DiskSizeTierSummary.md)
`diskTypes` | [{ [key: string]: DiskTypeSummary; }](DiskTypeSummary.md)
`distributionByCpuTier` | { [key: string]: number; }
`distributionByMemoryTier` | { [key: string]: number; }
`distributionByNicCount` | { [key: string]: number; }
`ramGB` | [VMResourceBreakdown](VMResourceBreakdown.md)
`diskGB` | [VMResourceBreakdown](VMResourceBreakdown.md)
`diskCount` | [VMResourceBreakdown](VMResourceBreakdown.md)
`nicCount` | [VMResourceBreakdown](VMResourceBreakdown.md)
`powerStates` | { [key: string]: number; }
`os` | { [key: string]: number; }
`osInfo` | [{ [key: string]: OsInfo; }](OsInfo.md)
`notMigratableReasons` | [Array&lt;MigrationIssue&gt;](MigrationIssue.md)
`migrationWarnings` | [Array&lt;MigrationIssue&gt;](MigrationIssue.md)

## Example

```typescript
import type { VMs } from '@migration-planner-ui/api-client'

// TODO: Update the object below with actual values
const example = {
  "total": null,
  "totalMigratable": null,
  "totalMigratableWithWarnings": null,
  "totalWithSharedDisks": null,
  "cpuCores": null,
  "diskSizeTier": null,
  "diskTypes": null,
  "distributionByCpuTier": null,
  "distributionByMemoryTier": null,
  "distributionByNicCount": null,
  "ramGB": null,
  "diskGB": null,
  "diskCount": null,
  "nicCount": null,
  "powerStates": null,
  "os": null,
  "osInfo": null,
  "notMigratableReasons": null,
  "migrationWarnings": null,
} satisfies VMs

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as VMs
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


