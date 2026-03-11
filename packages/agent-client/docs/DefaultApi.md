# DefaultApi

All URIs are relative to */api/v1*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**addVMsToInspection**](DefaultApi.md#addvmstoinspection) | **PATCH** /vms/inspector | Add more VMs to inspection queue |
| [**createGroup**](DefaultApi.md#creategroupoperation) | **POST** /vms/groups | Create a new group |
| [**deleteGroup**](DefaultApi.md#deletegroup) | **DELETE** /vms/groups/{id} | Delete group |
| [**getAgentStatus**](DefaultApi.md#getagentstatus) | **GET** /agent | Get agent status |
| [**getCollectorStatus**](DefaultApi.md#getcollectorstatus) | **GET** /collector | Get collector status |
| [**getGroup**](DefaultApi.md#getgroup) | **GET** /vms/groups/{id} | Get group by ID with its VMs |
| [**getInspectorStatus**](DefaultApi.md#getinspectorstatus) | **GET** /vms/inspector | Get inspector status |
| [**getInventory**](DefaultApi.md#getinventory) | **GET** /inventory | Get collected inventory |
| [**getVM**](DefaultApi.md#getvm) | **GET** /vms/{id} | Get details about a vm |
| [**getVMInspectionStatus**](DefaultApi.md#getvminspectionstatus) | **GET** /vms/{id}/inspector | Get inspection status for a specific VirtualMachine |
| [**getVMs**](DefaultApi.md#getvms) | **GET** /vms | Get list of VMs with filtering and pagination |
| [**getVersion**](DefaultApi.md#getversion) | **GET** /version | Get agent version information |
| [**listGroups**](DefaultApi.md#listgroups) | **GET** /vms/groups | List all groups |
| [**removeVMFromInspection**](DefaultApi.md#removevmfrominspection) | **DELETE** /vms/{id}/inspector | Remove VirtualMachine from inspection queue |
| [**setAgentMode**](DefaultApi.md#setagentmode) | **POST** /agent | Change agent mode |
| [**startCollector**](DefaultApi.md#startcollector) | **POST** /collector | Start inventory collection |
| [**startInspection**](DefaultApi.md#startinspection) | **POST** /vms/inspector | Start inspection for VMs |
| [**stopCollector**](DefaultApi.md#stopcollector) | **DELETE** /collector | Stop collection |
| [**stopInspection**](DefaultApi.md#stopinspection) | **DELETE** /vms/inspector | Stop inspector entirely |
| [**updateGroup**](DefaultApi.md#updategroupoperation) | **PATCH** /vms/groups/{id} | Update group |
| [**vddkPost**](DefaultApi.md#vddkpostoperation) | **POST** /vddk | Upload VDDK tarball |



## addVMsToInspection

> InspectorStatus addVMsToInspection(requestBody)

Add more VMs to inspection queue

### Example

```ts
import {
  Configuration,
  DefaultApi,
} from '@migration-planner-ui/agent-client';
import type { AddVMsToInspectionRequest } from '@migration-planner-ui/agent-client';

async function example() {
  console.log("🚀 Testing @migration-planner-ui/agent-client SDK...");
  const api = new DefaultApi();

  const body = {
    // Array<string>
    requestBody: ["vm-1236","vm-1237"],
  } satisfies AddVMsToInspectionRequest;

  try {
    const data = await api.addVMsToInspection(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters


| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **requestBody** | `Array<string>` |  | |

### Return type

[**InspectorStatus**](InspectorStatus.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **202** | VMs added to inspection queue |  -  |
| **400** | Invalid request |  -  |
| **404** | Inspector not running |  -  |
| **500** | Internal server error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## createGroup

> Group createGroup(createGroupRequest)

Create a new group

### Example

```ts
import {
  Configuration,
  DefaultApi,
} from '@migration-planner-ui/agent-client';
import type { CreateGroupOperationRequest } from '@migration-planner-ui/agent-client';

async function example() {
  console.log("🚀 Testing @migration-planner-ui/agent-client SDK...");
  const api = new DefaultApi();

  const body = {
    // CreateGroupRequest
    createGroupRequest: ...,
  } satisfies CreateGroupOperationRequest;

  try {
    const data = await api.createGroup(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters


| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **createGroupRequest** | [CreateGroupRequest](CreateGroupRequest.md) |  | |

### Return type

[**Group**](Group.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **201** | Group created |  -  |
| **400** | Invalid request (e.g., invalid filter syntax) |  -  |
| **500** | Internal server error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## deleteGroup

> deleteGroup(id)

Delete group

### Example

```ts
import {
  Configuration,
  DefaultApi,
} from '@migration-planner-ui/agent-client';
import type { DeleteGroupRequest } from '@migration-planner-ui/agent-client';

async function example() {
  console.log("🚀 Testing @migration-planner-ui/agent-client SDK...");
  const api = new DefaultApi();

  const body = {
    // string | Group ID
    id: id_example,
  } satisfies DeleteGroupRequest;

  try {
    const data = await api.deleteGroup(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters


| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **id** | `string` | Group ID | [Defaults to `undefined`] |

### Return type

`void` (Empty response body)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: Not defined


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **204** | Group deleted |  -  |
| **500** | Internal server error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## getAgentStatus

> AgentStatus getAgentStatus()

Get agent status

### Example

```ts
import {
  Configuration,
  DefaultApi,
} from '@migration-planner-ui/agent-client';
import type { GetAgentStatusRequest } from '@migration-planner-ui/agent-client';

async function example() {
  console.log("🚀 Testing @migration-planner-ui/agent-client SDK...");
  const api = new DefaultApi();

  try {
    const data = await api.getAgentStatus();
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters

This endpoint does not need any parameter.

### Return type

[**AgentStatus**](AgentStatus.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Agent status |  -  |
| **500** | Internal server error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## getCollectorStatus

> CollectorStatus getCollectorStatus()

Get collector status

### Example

```ts
import {
  Configuration,
  DefaultApi,
} from '@migration-planner-ui/agent-client';
import type { GetCollectorStatusRequest } from '@migration-planner-ui/agent-client';

async function example() {
  console.log("🚀 Testing @migration-planner-ui/agent-client SDK...");
  const api = new DefaultApi();

  try {
    const data = await api.getCollectorStatus();
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters

This endpoint does not need any parameter.

### Return type

[**CollectorStatus**](CollectorStatus.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Collector status |  -  |
| **500** | Internal server error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## getGroup

> GroupResponse getGroup(id, sort, page, pageSize)

Get group by ID with its VMs

### Example

```ts
import {
  Configuration,
  DefaultApi,
} from '@migration-planner-ui/agent-client';
import type { GetGroupRequest } from '@migration-planner-ui/agent-client';

async function example() {
  console.log("🚀 Testing @migration-planner-ui/agent-client SDK...");
  const api = new DefaultApi();

  const body = {
    // string | Group ID
    id: id_example,
    // Array<string> | Sort fields with direction (e.g., \"name:asc\" or \"cluster:desc,name:asc\"). Valid fields are name, vCenterState, cluster, diskSize, memory, issues. (optional)
    sort: ["cluster:asc","name:desc"],
    // number | Page number for pagination (optional)
    page: 56,
    // number | Number of items per page (optional)
    pageSize: 56,
  } satisfies GetGroupRequest;

  try {
    const data = await api.getGroup(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters


| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **id** | `string` | Group ID | [Defaults to `undefined`] |
| **sort** | `Array<string>` | Sort fields with direction (e.g., \&quot;name:asc\&quot; or \&quot;cluster:desc,name:asc\&quot;). Valid fields are name, vCenterState, cluster, diskSize, memory, issues. | [Optional] |
| **page** | `number` | Page number for pagination | [Optional] [Defaults to `1`] |
| **pageSize** | `number` | Number of items per page | [Optional] [Defaults to `undefined`] |

### Return type

[**GroupResponse**](GroupResponse.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Group details with VMs |  -  |
| **404** | Group not found |  -  |
| **500** | Internal server error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## getInspectorStatus

> InspectorStatus getInspectorStatus()

Get inspector status

### Example

```ts
import {
  Configuration,
  DefaultApi,
} from '@migration-planner-ui/agent-client';
import type { GetInspectorStatusRequest } from '@migration-planner-ui/agent-client';

async function example() {
  console.log("🚀 Testing @migration-planner-ui/agent-client SDK...");
  const api = new DefaultApi();

  try {
    const data = await api.getInspectorStatus();
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters

This endpoint does not need any parameter.

### Return type

[**InspectorStatus**](InspectorStatus.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Inspector status |  -  |
| **500** | Internal server error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## getInventory

> GetInventory200Response getInventory(withAgentId, groupId)

Get collected inventory

### Example

```ts
import {
  Configuration,
  DefaultApi,
} from '@migration-planner-ui/agent-client';
import type { GetInventoryRequest } from '@migration-planner-ui/agent-client';

async function example() {
  console.log("🚀 Testing @migration-planner-ui/agent-client SDK...");
  const api = new DefaultApi();

  const body = {
    // boolean | If true, include the agentId in the response (Compatible with manual inventory upload). (optional)
    withAgentId: true,
    // string | Filter inventory to VMs matching this group\'s filter expression (optional)
    groupId: groupId_example,
  } satisfies GetInventoryRequest;

  try {
    const data = await api.getInventory(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters


| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **withAgentId** | `boolean` | If true, include the agentId in the response (Compatible with manual inventory upload). | [Optional] [Defaults to `false`] |
| **groupId** | `string` | Filter inventory to VMs matching this group\&#39;s filter expression | [Optional] [Defaults to `undefined`] |

### Return type

[**GetInventory200Response**](GetInventory200Response.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Collected inventory |  -  |
| **404** | Inventory not available |  -  |
| **500** | Internal server error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## getVM

> VirtualMachineDetail getVM(id)

Get details about a vm

### Example

```ts
import {
  Configuration,
  DefaultApi,
} from '@migration-planner-ui/agent-client';
import type { GetVMRequest } from '@migration-planner-ui/agent-client';

async function example() {
  console.log("🚀 Testing @migration-planner-ui/agent-client SDK...");
  const api = new DefaultApi();

  const body = {
    // string | VirtualMachine id
    id: id_example,
  } satisfies GetVMRequest;

  try {
    const data = await api.getVM(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters


| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **id** | `string` | VirtualMachine id | [Defaults to `undefined`] |

### Return type

[**VirtualMachineDetail**](VirtualMachineDetail.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | VirtualMachine details |  -  |
| **404** | VirtualMachine not found |  -  |
| **500** | Internal server error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## getVMInspectionStatus

> VmInspectionStatus getVMInspectionStatus(id)

Get inspection status for a specific VirtualMachine

### Example

```ts
import {
  Configuration,
  DefaultApi,
} from '@migration-planner-ui/agent-client';
import type { GetVMInspectionStatusRequest } from '@migration-planner-ui/agent-client';

async function example() {
  console.log("🚀 Testing @migration-planner-ui/agent-client SDK...");
  const api = new DefaultApi();

  const body = {
    // string | VirtualMachine ID
    id: id_example,
  } satisfies GetVMInspectionStatusRequest;

  try {
    const data = await api.getVMInspectionStatus(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters


| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **id** | `string` | VirtualMachine ID | [Defaults to `undefined`] |

### Return type

[**VmInspectionStatus**](VmInspectionStatus.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | VirtualMachine inspection status |  -  |
| **404** | VirtualMachine not found |  -  |
| **500** | Internal server error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## getVMs

> VirtualMachineListResponse getVMs(byExpression, sort, page, pageSize)

Get list of VMs with filtering and pagination

### Example

```ts
import {
  Configuration,
  DefaultApi,
} from '@migration-planner-ui/agent-client';
import type { GetVMsRequest } from '@migration-planner-ui/agent-client';

async function example() {
  console.log("🚀 Testing @migration-planner-ui/agent-client SDK...");
  const api = new DefaultApi();

  const body = {
    // string | Filter by expression (matches VMs with the provided expression) (optional)
    byExpression: exp1,
    // Array<string> | Sort fields with direction (e.g., \"name:asc\" or \"cluster:desc,name:asc\"). Valid fields are name, vCenterState, cluster, diskSize, memory, issues. (optional)
    sort: ["cluster:asc","name:desc"],
    // number | Page number for pagination (optional)
    page: 56,
    // number | Number of items per page (optional)
    pageSize: 56,
  } satisfies GetVMsRequest;

  try {
    const data = await api.getVMs(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters


| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **byExpression** | `string` | Filter by expression (matches VMs with the provided expression) | [Optional] [Defaults to `undefined`] |
| **sort** | `Array<string>` | Sort fields with direction (e.g., \&quot;name:asc\&quot; or \&quot;cluster:desc,name:asc\&quot;). Valid fields are name, vCenterState, cluster, diskSize, memory, issues. | [Optional] |
| **page** | `number` | Page number for pagination | [Optional] [Defaults to `1`] |
| **pageSize** | `number` | Number of items per page | [Optional] [Defaults to `undefined`] |

### Return type

[**VirtualMachineListResponse**](VirtualMachineListResponse.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | List of VMs |  -  |
| **400** | Invalid request parameters |  -  |
| **500** | Internal server error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## getVersion

> VersionInfo getVersion()

Get agent version information

### Example

```ts
import {
  Configuration,
  DefaultApi,
} from '@migration-planner-ui/agent-client';
import type { GetVersionRequest } from '@migration-planner-ui/agent-client';

async function example() {
  console.log("🚀 Testing @migration-planner-ui/agent-client SDK...");
  const api = new DefaultApi();

  try {
    const data = await api.getVersion();
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters

This endpoint does not need any parameter.

### Return type

[**VersionInfo**](VersionInfo.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Version information |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## listGroups

> GroupListResponse listGroups(byName, page, pageSize)

List all groups

### Example

```ts
import {
  Configuration,
  DefaultApi,
} from '@migration-planner-ui/agent-client';
import type { ListGroupsRequest } from '@migration-planner-ui/agent-client';

async function example() {
  console.log("🚀 Testing @migration-planner-ui/agent-client SDK...");
  const api = new DefaultApi();

  const body = {
    // string | Filter groups by name (case-insensitive substring match) (optional)
    byName: byName_example,
    // number | Page number (1-indexed) (optional)
    page: 56,
    // number | Number of groups per page (optional)
    pageSize: 56,
  } satisfies ListGroupsRequest;

  try {
    const data = await api.listGroups(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters


| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **byName** | `string` | Filter groups by name (case-insensitive substring match) | [Optional] [Defaults to `undefined`] |
| **page** | `number` | Page number (1-indexed) | [Optional] [Defaults to `1`] |
| **pageSize** | `number` | Number of groups per page | [Optional] [Defaults to `20`] |

### Return type

[**GroupListResponse**](GroupListResponse.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | List of groups |  -  |
| **400** | Invalid filter expression |  -  |
| **500** | Internal server error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## removeVMFromInspection

> VmInspectionStatus removeVMFromInspection(id)

Remove VirtualMachine from inspection queue

### Example

```ts
import {
  Configuration,
  DefaultApi,
} from '@migration-planner-ui/agent-client';
import type { RemoveVMFromInspectionRequest } from '@migration-planner-ui/agent-client';

async function example() {
  console.log("🚀 Testing @migration-planner-ui/agent-client SDK...");
  const api = new DefaultApi();

  const body = {
    // string
    id: id_example,
  } satisfies RemoveVMFromInspectionRequest;

  try {
    const data = await api.removeVMFromInspection(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters


| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **id** | `string` |  | [Defaults to `undefined`] |

### Return type

[**VmInspectionStatus**](VmInspectionStatus.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | VMs removed from queue |  -  |
| **400** | Invalid request |  -  |
| **404** | Inspector not running |  -  |
| **500** | Internal server error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## setAgentMode

> AgentStatus setAgentMode(agentModeRequest)

Change agent mode

### Example

```ts
import {
  Configuration,
  DefaultApi,
} from '@migration-planner-ui/agent-client';
import type { SetAgentModeRequest } from '@migration-planner-ui/agent-client';

async function example() {
  console.log("🚀 Testing @migration-planner-ui/agent-client SDK...");
  const api = new DefaultApi();

  const body = {
    // AgentModeRequest
    agentModeRequest: ...,
  } satisfies SetAgentModeRequest;

  try {
    const data = await api.setAgentMode(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters


| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **agentModeRequest** | [AgentModeRequest](AgentModeRequest.md) |  | |

### Return type

[**AgentStatus**](AgentStatus.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Mode changed |  -  |
| **400** | Invalid request |  -  |
| **409** | Conflict |  -  |
| **500** | Internal server error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## startCollector

> CollectorStatus startCollector(collectorStartRequest)

Start inventory collection

### Example

```ts
import {
  Configuration,
  DefaultApi,
} from '@migration-planner-ui/agent-client';
import type { StartCollectorRequest } from '@migration-planner-ui/agent-client';

async function example() {
  console.log("🚀 Testing @migration-planner-ui/agent-client SDK...");
  const api = new DefaultApi();

  const body = {
    // CollectorStartRequest
    collectorStartRequest: ...,
  } satisfies StartCollectorRequest;

  try {
    const data = await api.startCollector(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters


| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **collectorStartRequest** | [CollectorStartRequest](CollectorStartRequest.md) |  | |

### Return type

[**CollectorStatus**](CollectorStatus.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **202** | Collection started |  -  |
| **400** | Invalid request |  -  |
| **409** | Collection already in progress |  -  |
| **500** | Internal server error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## startInspection

> InspectorStatus startInspection(inspectorStartRequest)

Start inspection for VMs

### Example

```ts
import {
  Configuration,
  DefaultApi,
} from '@migration-planner-ui/agent-client';
import type { StartInspectionRequest } from '@migration-planner-ui/agent-client';

async function example() {
  console.log("🚀 Testing @migration-planner-ui/agent-client SDK...");
  const api = new DefaultApi();

  const body = {
    // InspectorStartRequest
    inspectorStartRequest: ...,
  } satisfies StartInspectionRequest;

  try {
    const data = await api.startInspection(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters


| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **inspectorStartRequest** | [InspectorStartRequest](InspectorStartRequest.md) |  | |

### Return type

[**InspectorStatus**](InspectorStatus.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **202** | Inspection started |  -  |
| **400** | Invalid request |  -  |
| **409** | Inspector already running |  -  |
| **500** | Internal server error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## stopCollector

> stopCollector()

Stop collection

### Example

```ts
import {
  Configuration,
  DefaultApi,
} from '@migration-planner-ui/agent-client';
import type { StopCollectorRequest } from '@migration-planner-ui/agent-client';

async function example() {
  console.log("🚀 Testing @migration-planner-ui/agent-client SDK...");
  const api = new DefaultApi();

  try {
    const data = await api.stopCollector();
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters

This endpoint does not need any parameter.

### Return type

`void` (Empty response body)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: Not defined


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **204** | Collection stopped |  -  |
| **500** | Internal server error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## stopInspection

> InspectorStatus stopInspection()

Stop inspector entirely

### Example

```ts
import {
  Configuration,
  DefaultApi,
} from '@migration-planner-ui/agent-client';
import type { StopInspectionRequest } from '@migration-planner-ui/agent-client';

async function example() {
  console.log("🚀 Testing @migration-planner-ui/agent-client SDK...");
  const api = new DefaultApi();

  try {
    const data = await api.stopInspection();
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters

This endpoint does not need any parameter.

### Return type

[**InspectorStatus**](InspectorStatus.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | VMs removed from queue |  -  |
| **400** | Already in canceling state |  -  |
| **404** | Inspector not running |  -  |
| **500** | Internal server error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## updateGroup

> Group updateGroup(id, updateGroupRequest)

Update group

### Example

```ts
import {
  Configuration,
  DefaultApi,
} from '@migration-planner-ui/agent-client';
import type { UpdateGroupOperationRequest } from '@migration-planner-ui/agent-client';

async function example() {
  console.log("🚀 Testing @migration-planner-ui/agent-client SDK...");
  const api = new DefaultApi();

  const body = {
    // string | Group ID
    id: id_example,
    // UpdateGroupRequest
    updateGroupRequest: ...,
  } satisfies UpdateGroupOperationRequest;

  try {
    const data = await api.updateGroup(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters


| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **id** | `string` | Group ID | [Defaults to `undefined`] |
| **updateGroupRequest** | [UpdateGroupRequest](UpdateGroupRequest.md) |  | |

### Return type

[**Group**](Group.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Group updated |  -  |
| **400** | Invalid request (e.g., invalid filter syntax) |  -  |
| **404** | Group not found |  -  |
| **500** | Internal server error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## vddkPost

> VddkPost200Response vddkPost(vddkPostRequest)

Upload VDDK tarball

### Example

```ts
import {
  Configuration,
  DefaultApi,
} from '@migration-planner-ui/agent-client';
import type { VddkPostOperationRequest } from '@migration-planner-ui/agent-client';

async function example() {
  console.log("🚀 Testing @migration-planner-ui/agent-client SDK...");
  const api = new DefaultApi();

  const body = {
    // VddkPostRequest
    vddkPostRequest: ...,
  } satisfies VddkPostOperationRequest;

  try {
    const data = await api.vddkPost(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters


| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **vddkPostRequest** | [VddkPostRequest](VddkPostRequest.md) |  | |

### Return type

[**VddkPost200Response**](VddkPost200Response.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: `multiple/form-data`
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Upload successfull |  -  |
| **413** | File exceeds 64MB limit |  -  |
| **400** | Bad request |  -  |
| **500** | Internal server error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

