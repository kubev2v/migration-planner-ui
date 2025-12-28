# AgentApi

All URIs are relative to **

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**updateAgentStatus**](AgentApi.md#updateagentstatus) | **PUT** /api/v1/agents/{id}/status |  |



## updateAgentStatus

> updateAgentStatus(id, agentStatusUpdate)



Update status of the agent

### Example

```ts
import {
  Configuration,
  AgentApi,
} from '@migration-planner-ui/agent-client';
import type { UpdateAgentStatusRequest } from '@migration-planner-ui/agent-client';

async function example() {
  console.log("🚀 Testing @migration-planner-ui/agent-client SDK...");
  const api = new AgentApi();

  const body = {
    // string | ID the agent
    id: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
    // AgentStatusUpdate (optional)
    agentStatusUpdate: ...,
  } satisfies UpdateAgentStatusRequest;

  try {
    const data = await api.updateAgentStatus(body);
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
| **id** | `string` | ID the agent | [Defaults to `undefined`] |
| **agentStatusUpdate** | [AgentStatusUpdate](AgentStatusUpdate.md) |  | [Optional] |

### Return type

`void` (Empty response body)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | OK |  -  |
| **201** | OK |  -  |
| **400** | Bad Request |  -  |
| **401** | Unauthorized |  -  |
| **403** | Forbidden |  -  |
| **404** | Not found |  -  |
| **500** | Internal Server Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

