# InfoApi

All URIs are relative to *https://github.com*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**getInfo**](InfoApi.md#getinfo) | **GET** /api/v1/info |  |



## getInfo

> Info getInfo()



Get migration planner information

### Example

```ts
import {
  Configuration,
  InfoApi,
} from '@migration-planner-ui/api-client';
import type { GetInfoRequest } from '@migration-planner-ui/api-client';

async function example() {
  console.log("🚀 Testing @migration-planner-ui/api-client SDK...");
  const api = new InfoApi();

  try {
    const data = await api.getInfo();
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

[**Info**](Info.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | OK |  -  |
| **500** | Internal error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

