# ImageApi

All URIs are relative to *https://raw.githubusercontent.com*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**getImageByToken**](ImageApi.md#getimagebytoken) | **GET** /api/v1/image/bytoken/{token}/{name} |  |
| [**headImageByToken**](ImageApi.md#headimagebytoken) | **HEAD** /api/v1/image/bytoken/{token}/{name} |  |



## getImageByToken

> Blob getImageByToken(token, name)



Get the OVA image via URL

### Example

```ts
import {
  Configuration,
  ImageApi,
} from '@migration-planner-ui/image-client';
import type { GetImageByTokenRequest } from '@migration-planner-ui/image-client';

async function example() {
  console.log("🚀 Testing @migration-planner-ui/image-client SDK...");
  const api = new ImageApi();

  const body = {
    // string | User token
    token: token_example,
    // string | Image name
    name: name_example,
  } satisfies GetImageByTokenRequest;

  try {
    const data = await api.getImageByToken(body);
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
| **token** | `string` | User token | [Defaults to `undefined`] |
| **name** | `string` | Image name | [Defaults to `undefined`] |

### Return type

**Blob**

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/ovf`, `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | An OVA image |  -  |
| **400** | Bad Request |  -  |
| **401** | Unauthorized |  -  |
| **404** | NotFound |  -  |
| **500** | Internal Server Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## headImageByToken

> headImageByToken(token, name)



Head the OVA image via URL

### Example

```ts
import {
  Configuration,
  ImageApi,
} from '@migration-planner-ui/image-client';
import type { HeadImageByTokenRequest } from '@migration-planner-ui/image-client';

async function example() {
  console.log("🚀 Testing @migration-planner-ui/image-client SDK...");
  const api = new ImageApi();

  const body = {
    // string | User token
    token: token_example,
    // string | Image name
    name: name_example,
  } satisfies HeadImageByTokenRequest;

  try {
    const data = await api.headImageByToken(body);
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
| **token** | `string` | User token | [Defaults to `undefined`] |
| **name** | `string` | Image name | [Defaults to `undefined`] |

### Return type

`void` (Empty response body)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | An OVA image |  -  |
| **400** | Bad Request |  -  |
| **401** | Unauthorized |  -  |
| **404** | NotFound |  -  |
| **500** | Internal Server Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

