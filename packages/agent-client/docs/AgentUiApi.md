# AgentUiApi

All URIs are relative to *http://localhost*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**getAgentStatus**](AgentUiApi.md#getagentstatus) | **GET** /api/v1/status |  |
| [**getAgentVersion**](AgentUiApi.md#getagentversion) | **GET** /api/v1/version |  |
| [**getInventory**](AgentUiApi.md#getinventory) | **GET** /api/v1/inventory |  |
| [**getPlannerUrl**](AgentUiApi.md#getplannerurl) | **GET** /api/v1/url |  |
| [**submitCredentials**](AgentUiApi.md#submitcredentials) | **PUT** /api/v1/credentials |  |



## getAgentStatus

> StatusReply getAgentStatus()



Get the current status of the agent

### Example

```ts
import {
  Configuration,
  AgentUiApi,
} from '@migration-planner-ui/agent-client';
import type { GetAgentStatusRequest } from '@migration-planner-ui/agent-client';

async function example() {
  console.log("🚀 Testing @migration-planner-ui/agent-client SDK...");
  const api = new AgentUiApi();

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

[**StatusReply**](StatusReply.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | OK |  -  |
| **500** | Internal Server Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## getAgentVersion

> VersionReply getAgentVersion()



Get the version of the agent

### Example

```ts
import {
  Configuration,
  AgentUiApi,
} from '@migration-planner-ui/agent-client';
import type { GetAgentVersionRequest } from '@migration-planner-ui/agent-client';

async function example() {
  console.log("🚀 Testing @migration-planner-ui/agent-client SDK...");
  const api = new AgentUiApi();

  try {
    const data = await api.getAgentVersion();
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

[**VersionReply**](VersionReply.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | OK |  -  |
| **500** | Internal Server Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## getInventory

> InventoryReply getInventory()



Download the collected inventory data

### Example

```ts
import {
  Configuration,
  AgentUiApi,
} from '@migration-planner-ui/agent-client';
import type { GetInventoryRequest } from '@migration-planner-ui/agent-client';

async function example() {
  console.log("🚀 Testing @migration-planner-ui/agent-client SDK...");
  const api = new AgentUiApi();

  try {
    const data = await api.getInventory();
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

[**InventoryReply**](InventoryReply.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | OK |  * Content-Disposition -  <br>  |
| **404** | Not Found - Inventory not yet collected |  -  |
| **500** | Internal Server Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## getPlannerUrl

> ServiceUIReply getPlannerUrl()



Get the planner service UI URL

### Example

```ts
import {
  Configuration,
  AgentUiApi,
} from '@migration-planner-ui/agent-client';
import type { GetPlannerUrlRequest } from '@migration-planner-ui/agent-client';

async function example() {
  console.log("🚀 Testing @migration-planner-ui/agent-client SDK...");
  const api = new AgentUiApi();

  try {
    const data = await api.getPlannerUrl();
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

[**ServiceUIReply**](ServiceUIReply.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | OK |  -  |
| **500** | Internal Server Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## submitCredentials

> submitCredentials(credentials)



Submit VMware credentials for the discovery process

### Example

```ts
import {
  Configuration,
  AgentUiApi,
} from '@migration-planner-ui/agent-client';
import type { SubmitCredentialsRequest } from '@migration-planner-ui/agent-client';

async function example() {
  console.log("🚀 Testing @migration-planner-ui/agent-client SDK...");
  const api = new AgentUiApi();

  const body = {
    // Credentials
    credentials: ...,
  } satisfies SubmitCredentialsRequest;

  try {
    const data = await api.submitCredentials(body);
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
| **credentials** | [Credentials](Credentials.md) |  | |

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
| **204** | Credentials accepted and saved successfully |  -  |
| **400** | Bad Request - Invalid request body or missing required fields |  -  |
| **401** | Unauthorized - Invalid credentials |  -  |
| **422** | Unprocessable Entity - Invalid URL format |  -  |
| **500** | Internal Server Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

