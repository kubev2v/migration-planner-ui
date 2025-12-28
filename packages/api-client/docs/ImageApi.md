# ImageApi

All URIs are relative to **

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**getSourceDownloadURL**](ImageApi.md#getsourcedownloadurl) | **GET** /api/v1/sources/{id}/image-url |  |
| [**headImage**](ImageApi.md#headimage) | **HEAD** /api/v1/sources/{id}/image |  |



## getSourceDownloadURL

> PresignedUrl getSourceDownloadURL(id)



Get the OVA image via URL

### Example

```ts
import {
  Configuration,
  ImageApi,
} from '@migration-planner-ui/api-client';
import type { GetSourceDownloadURLRequest } from '@migration-planner-ui/api-client';

async function example() {
  console.log("🚀 Testing @migration-planner-ui/api-client SDK...");
  const api = new ImageApi();

  const body = {
    // string | Source id
    id: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
  } satisfies GetSourceDownloadURLRequest;

  try {
    const data = await api.getSourceDownloadURL(body);
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
| **id** | `string` | Source id | [Defaults to `undefined`] |

### Return type

[**PresignedUrl**](PresignedUrl.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | URL to download OVA image |  -  |
| **400** | Bad Request |  -  |
| **401** | Unauthorized |  -  |
| **404** | NotFound |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## headImage

> headImage(id)



Head the OVA image

### Example

```ts
import {
  Configuration,
  ImageApi,
} from '@migration-planner-ui/api-client';
import type { HeadImageRequest } from '@migration-planner-ui/api-client';

async function example() {
  console.log("🚀 Testing @migration-planner-ui/api-client SDK...");
  const api = new ImageApi();

  const body = {
    // string | Id of the source
    id: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
  } satisfies HeadImageRequest;

  try {
    const data = await api.headImage(body);
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
| **id** | `string` | Id of the source | [Defaults to `undefined`] |

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
| **400** | Bad Request |  -  |
| **401** | Unauthorized |  -  |
| **403** | Forbidden |  -  |
| **404** | NotFound |  -  |
| **500** | Internal Server Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

