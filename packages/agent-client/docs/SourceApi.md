# SourceApi

All URIs are relative to **

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**updateSourceInventory**](SourceApi.md#updatesourceinventory) | **PUT** /api/v1/sources/{id}/status |  |



## updateSourceInventory

> Source updateSourceInventory(id, sourceStatusUpdate)



Updates the inventory of a source

### Example

```ts
import {
  Configuration,
  SourceApi,
} from '@migration-planner-ui/agent-client';
import type { UpdateSourceInventoryRequest } from '@migration-planner-ui/agent-client';

async function example() {
  console.log("🚀 Testing @migration-planner-ui/agent-client SDK...");
  const api = new SourceApi();

  const body = {
    // string | ID of the source
    id: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
    // SourceStatusUpdate
    sourceStatusUpdate: ...,
  } satisfies UpdateSourceInventoryRequest;

  try {
    const data = await api.updateSourceInventory(body);
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
| **id** | `string` | ID of the source | [Defaults to `undefined`] |
| **sourceStatusUpdate** | [SourceStatusUpdate](SourceStatusUpdate.md) |  | |

### Return type

[**Source**](Source.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | OK |  -  |
| **400** | Bad Request |  -  |
| **401** | Unauthorized |  -  |
| **403** | Forbidden |  -  |
| **404** | NotFound |  -  |
| **500** | Internal Server Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

