# AssessmentApi

All URIs are relative to **

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**createAssessment**](AssessmentApi.md#createassessment) | **POST** /api/v1/assessments |  |
| [**deleteAssessment**](AssessmentApi.md#deleteassessment) | **DELETE** /api/v1/assessments/{id} |  |
| [**getAssessment**](AssessmentApi.md#getassessment) | **GET** /api/v1/assessments/{id} |  |
| [**listAssessments**](AssessmentApi.md#listassessments) | **GET** /api/v1/assessments |  |
| [**updateAssessment**](AssessmentApi.md#updateassessment) | **PUT** /api/v1/assessments/{id} |  |



## createAssessment

> Assessment createAssessment(assessmentForm)



Create an assessment

### Example

```ts
import {
  Configuration,
  AssessmentApi,
} from '@migration-planner-ui/api-client';
import type { CreateAssessmentRequest } from '@migration-planner-ui/api-client';

async function example() {
  console.log("🚀 Testing @migration-planner-ui/api-client SDK...");
  const api = new AssessmentApi();

  const body = {
    // AssessmentForm
    assessmentForm: ...,
  } satisfies CreateAssessmentRequest;

  try {
    const data = await api.createAssessment(body);
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
| **assessmentForm** | [AssessmentForm](AssessmentForm.md) |  | |

### Return type

[**Assessment**](Assessment.md)

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


## deleteAssessment

> Assessment deleteAssessment(id)



Delete an assessment

### Example

```ts
import {
  Configuration,
  AssessmentApi,
} from '@migration-planner-ui/api-client';
import type { DeleteAssessmentRequest } from '@migration-planner-ui/api-client';

async function example() {
  console.log("🚀 Testing @migration-planner-ui/api-client SDK...");
  const api = new AssessmentApi();

  const body = {
    // string | ID of the assessment
    id: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
  } satisfies DeleteAssessmentRequest;

  try {
    const data = await api.deleteAssessment(body);
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
| **id** | `string` | ID of the assessment | [Defaults to `undefined`] |

### Return type

[**Assessment**](Assessment.md)

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


## getAssessment

> Assessment getAssessment(id)



Get the specified assessment

### Example

```ts
import {
  Configuration,
  AssessmentApi,
} from '@migration-planner-ui/api-client';
import type { GetAssessmentRequest } from '@migration-planner-ui/api-client';

async function example() {
  console.log("🚀 Testing @migration-planner-ui/api-client SDK...");
  const api = new AssessmentApi();

  const body = {
    // string | ID of the assessment
    id: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
  } satisfies GetAssessmentRequest;

  try {
    const data = await api.getAssessment(body);
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
| **id** | `string` | ID of the assessment | [Defaults to `undefined`] |

### Return type

[**Assessment**](Assessment.md)

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


## listAssessments

> Array&lt;Assessment&gt; listAssessments()



List assessments

### Example

```ts
import {
  Configuration,
  AssessmentApi,
} from '@migration-planner-ui/api-client';
import type { ListAssessmentsRequest } from '@migration-planner-ui/api-client';

async function example() {
  console.log("🚀 Testing @migration-planner-ui/api-client SDK...");
  const api = new AssessmentApi();

  try {
    const data = await api.listAssessments();
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

[**Array&lt;Assessment&gt;**](Assessment.md)

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


## updateAssessment

> Assessment updateAssessment(id, assessmentUpdate)



Update an assessment

### Example

```ts
import {
  Configuration,
  AssessmentApi,
} from '@migration-planner-ui/api-client';
import type { UpdateAssessmentRequest } from '@migration-planner-ui/api-client';

async function example() {
  console.log("🚀 Testing @migration-planner-ui/api-client SDK...");
  const api = new AssessmentApi();

  const body = {
    // string | ID of the assessment
    id: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
    // AssessmentUpdate
    assessmentUpdate: ...,
  } satisfies UpdateAssessmentRequest;

  try {
    const data = await api.updateAssessment(body);
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
| **id** | `string` | ID of the assessment | [Defaults to `undefined`] |
| **assessmentUpdate** | [AssessmentUpdate](AssessmentUpdate.md) |  | |

### Return type

[**Assessment**](Assessment.md)

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

