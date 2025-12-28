# HealthApi

All URIs are relative to **

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**health**](HealthApi.md#health) | **GET** /health |  |



## health

> health()



health check

### Example

```ts
import {
  Configuration,
  HealthApi,
} from '@migration-planner-ui/api-client';
import type { HealthRequest } from '@migration-planner-ui/api-client';

async function example() {
  console.log("🚀 Testing @migration-planner-ui/api-client SDK...");
  const api = new HealthApi();

  try {
    const data = await api.health();
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
| **200** | OK |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

