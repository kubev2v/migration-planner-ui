# JobApi

All URIs are relative to **

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**cancelJob**](JobApi.md#canceljob) | **DELETE** /api/v1/assessments/jobs/{id} |  |
| [**createRVToolsAssessment**](JobApi.md#creatervtoolsassessment) | **POST** /api/v1/assessments/rvtools |  |
| [**getJob**](JobApi.md#getjob) | **GET** /api/v1/assessments/jobs/{id} |  |



## cancelJob

> Job cancelJob(id)



Cancel a job

### Example

```ts
import {
  Configuration,
  JobApi,
} from '@migration-planner-ui/api-client';
import type { CancelJobRequest } from '@migration-planner-ui/api-client';

async function example() {
  console.log("🚀 Testing @migration-planner-ui/api-client SDK...");
  const api = new JobApi();

  const body = {
    // number | ID of the job
    id: 789,
  } satisfies CancelJobRequest;

  try {
    const data = await api.cancelJob(body);
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
| **id** | `number` | ID of the job | [Defaults to `undefined`] |

### Return type

[**Job**](Job.md)

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
| **409** | Conflict |  -  |
| **500** | Internal error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## createRVToolsAssessment

> Job createRVToolsAssessment(name, file)



Create an assessment from RVTools file asynchronously

### Example

```ts
import {
  Configuration,
  JobApi,
} from '@migration-planner-ui/api-client';
import type { CreateRVToolsAssessmentRequest } from '@migration-planner-ui/api-client';

async function example() {
  console.log("🚀 Testing @migration-planner-ui/api-client SDK...");
  const api = new JobApi();

  const body = {
    // string | Name of the assessment
    name: name_example,
    // Blob | File upload for assessment data
    file: BINARY_DATA_HERE,
  } satisfies CreateRVToolsAssessmentRequest;

  try {
    const data = await api.createRVToolsAssessment(body);
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
| **name** | `string` | Name of the assessment | [Defaults to `undefined`] |
| **file** | `Blob` | File upload for assessment data | [Defaults to `undefined`] |

### Return type

[**Job**](Job.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: `multipart/form-data`
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **202** | Accepted - Job created |  -  |
| **400** | Bad Request |  -  |
| **401** | Unauthorized |  -  |
| **500** | Internal error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## getJob

> Job getJob(id)



Get job status

### Example

```ts
import {
  Configuration,
  JobApi,
} from '@migration-planner-ui/api-client';
import type { GetJobRequest } from '@migration-planner-ui/api-client';

async function example() {
  console.log("🚀 Testing @migration-planner-ui/api-client SDK...");
  const api = new JobApi();

  const body = {
    // number | ID of the job
    id: 789,
  } satisfies GetJobRequest;

  try {
    const data = await api.getJob(body);
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
| **id** | `number` | ID of the job | [Defaults to `undefined`] |

### Return type

[**Job**](Job.md)

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

