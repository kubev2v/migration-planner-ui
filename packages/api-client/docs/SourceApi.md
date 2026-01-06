# SourceApi

All URIs are relative to *http://localhost*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**createSource**](SourceApi.md#createsource) | **POST** /api/v1/sources |  |
| [**deleteSource**](SourceApi.md#deletesource) | **DELETE** /api/v1/sources/{id} |  |
| [**deleteSources**](SourceApi.md#deletesources) | **DELETE** /api/v1/sources |  |
| [**getSource**](SourceApi.md#getsource) | **GET** /api/v1/sources/{id} |  |
| [**listSources**](SourceApi.md#listsources) | **GET** /api/v1/sources |  |
| [**updateInventory**](SourceApi.md#updateinventory) | **PUT** /api/v1/sources/{id}/inventory |  |
| [**updateSource**](SourceApi.md#updatesource) | **PUT** /api/v1/sources/{id} |  |



## createSource

> Source createSource(sourceCreate)



Create a source

### Example

```ts
import {
  Configuration,
  SourceApi,
} from '@migration-planner-ui/api-client';
import type { CreateSourceRequest } from '@migration-planner-ui/api-client';

async function example() {
  console.log("🚀 Testing @migration-planner-ui/api-client SDK...");
  const api = new SourceApi();

  const body = {
    // SourceCreate
    sourceCreate: ...,
  } satisfies CreateSourceRequest;

  try {
    const data = await api.createSource(body);
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
| **sourceCreate** | [SourceCreate](SourceCreate.md) |  | |

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
| **201** | Created |  -  |
| **400** | Bad Request |  -  |
| **401** | Unauthorized |  -  |
| **500** | Internal error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## deleteSource

> Source deleteSource(id)



Delete a source

### Example

```ts
import {
  Configuration,
  SourceApi,
} from '@migration-planner-ui/api-client';
import type { DeleteSourceRequest } from '@migration-planner-ui/api-client';

async function example() {
  console.log("🚀 Testing @migration-planner-ui/api-client SDK...");
  const api = new SourceApi();

  const body = {
    // string | ID of the source
    id: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
  } satisfies DeleteSourceRequest;

  try {
    const data = await api.deleteSource(body);
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

### Return type

[**Source**](Source.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | OK |  -  |
| **400** | Bad Request |  -  |
| **401** | Unauthorized |  -  |
| **403** | Forbidden |  -  |
| **404** | NotFound |  -  |
| **500** | NotFound |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## deleteSources

> Status deleteSources()



delete a collection of sources

### Example

```ts
import {
  Configuration,
  SourceApi,
} from '@migration-planner-ui/api-client';
import type { DeleteSourcesRequest } from '@migration-planner-ui/api-client';

async function example() {
  console.log("🚀 Testing @migration-planner-ui/api-client SDK...");
  const api = new SourceApi();

  try {
    const data = await api.deleteSources();
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

[**Status**](Status.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | OK |  -  |
| **401** | Unauthorized |  -  |
| **500** | Internal error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## getSource

> Source getSource(id)



Get the specified source

### Example

```ts
import {
  Configuration,
  SourceApi,
} from '@migration-planner-ui/api-client';
import type { GetSourceRequest } from '@migration-planner-ui/api-client';

async function example() {
  console.log("🚀 Testing @migration-planner-ui/api-client SDK...");
  const api = new SourceApi();

  const body = {
    // string | ID of the source
    id: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
  } satisfies GetSourceRequest;

  try {
    const data = await api.getSource(body);
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

### Return type

[**Source**](Source.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | OK |  -  |
| **400** | Bad Request |  -  |
| **401** | Unauthorized |  -  |
| **403** | Forbidden |  -  |
| **404** | NotFound |  -  |
| **500** | Internal error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## listSources

> Array&lt;Source&gt; listSources()



List sources

### Example

```ts
import {
  Configuration,
  SourceApi,
} from '@migration-planner-ui/api-client';
import type { ListSourcesRequest } from '@migration-planner-ui/api-client';

async function example() {
  console.log("🚀 Testing @migration-planner-ui/api-client SDK...");
  const api = new SourceApi();

  try {
    const data = await api.listSources();
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

[**Array&lt;Source&gt;**](Source.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | OK |  -  |
| **401** | Unauthorized |  -  |
| **500** | Internal error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## updateInventory

> Source updateInventory(id, updateInventory)



Update inventory

### Example

```ts
import {
  Configuration,
  SourceApi,
} from '@migration-planner-ui/api-client';
import type { UpdateInventoryRequest } from '@migration-planner-ui/api-client';

async function example() {
  console.log("🚀 Testing @migration-planner-ui/api-client SDK...");
  const api = new SourceApi();

  const body = {
    // string | ID of the source
    id: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
    // UpdateInventory
    updateInventory: ...,
  } satisfies UpdateInventoryRequest;

  try {
    const data = await api.updateInventory(body);
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
| **updateInventory** | [UpdateInventory](UpdateInventory.md) |  | |

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
| **200** | Updated source inventory |  -  |
| **400** | Bad Request |  -  |
| **401** | Unauthorized |  -  |
| **403** | Forbidden |  -  |
| **404** | NotFound |  -  |
| **500** | Internal Server Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## updateSource

> Source updateSource(id, sourceUpdate)



Update source

### Example

```ts
import {
  Configuration,
  SourceApi,
} from '@migration-planner-ui/api-client';
import type { UpdateSourceRequest } from '@migration-planner-ui/api-client';

async function example() {
  console.log("🚀 Testing @migration-planner-ui/api-client SDK...");
  const api = new SourceApi();

  const body = {
    // string | ID of the source
    id: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
    // SourceUpdate
    sourceUpdate: ...,
  } satisfies UpdateSourceRequest;

  try {
    const data = await api.updateSource(body);
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
| **sourceUpdate** | [SourceUpdate](SourceUpdate.md) |  | |

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
| **200** | Updated source |  -  |
| **400** | Bad Request |  -  |
| **401** | Unauthorized |  -  |
| **403** | Forbidden |  -  |
| **404** | NotFound |  -  |
| **500** | Internal Server Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

