/* tslint:disable */
/* eslint-disable */
/**
 * Migration Planner API
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: undefined
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


import * as runtime from '../runtime';
import type {
  Source,
  Status,
} from '../models/index';
import {
    SourceFromJSON,
    SourceToJSON,
    StatusFromJSON,
    StatusToJSON,
} from '../models/index';

export interface DeleteSourceRequest {
    id: string;
}

export interface ReadSourceRequest {
    id: string;
}

/**
 * SourceApi - interface
 * 
 * @export
 * @interface SourceApiInterface
 */
export interface SourceApiInterface {
    /**
     * delete a source
     * @param {string} id ID of the source
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof SourceApiInterface
     */
    deleteSourceRaw(requestParameters: DeleteSourceRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<Source>>;

    /**
     * delete a source
     */
    deleteSource(requestParameters: DeleteSourceRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<Source>;

    /**
     * delete a collection of sources
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof SourceApiInterface
     */
    deleteSourcesRaw(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<Status>>;

    /**
     * delete a collection of sources
     */
    deleteSources(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<Status>;

    /**
     * list sources
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof SourceApiInterface
     */
    listSourcesRaw(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<Array<Source>>>;

    /**
     * list sources
     */
    listSources(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<Array<Source>>;

    /**
     * read the specified source
     * @param {string} id ID of the source
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof SourceApiInterface
     */
    readSourceRaw(requestParameters: ReadSourceRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<Source>>;

    /**
     * read the specified source
     */
    readSource(requestParameters: ReadSourceRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<Source>;

}

/**
 * 
 */
export class SourceApi extends runtime.BaseAPI implements SourceApiInterface {

    /**
     * delete a source
     */
    async deleteSourceRaw(requestParameters: DeleteSourceRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<Source>> {
        if (requestParameters['id'] == null) {
            throw new runtime.RequiredError(
                'id',
                'Required parameter "id" was null or undefined when calling deleteSource().'
            );
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/api/v1/sources/{id}`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters['id']))),
            method: 'DELETE',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => SourceFromJSON(jsonValue));
    }

    /**
     * delete a source
     */
    async deleteSource(requestParameters: DeleteSourceRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<Source> {
        const response = await this.deleteSourceRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * delete a collection of sources
     */
    async deleteSourcesRaw(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<Status>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/api/v1/sources`,
            method: 'DELETE',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => StatusFromJSON(jsonValue));
    }

    /**
     * delete a collection of sources
     */
    async deleteSources(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<Status> {
        const response = await this.deleteSourcesRaw(initOverrides);
        return await response.value();
    }

    /**
     * list sources
     */
    async listSourcesRaw(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<Array<Source>>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/api/v1/sources`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => jsonValue.map(SourceFromJSON));
    }

    /**
     * list sources
     */
    async listSources(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<Array<Source>> {
        const response = await this.listSourcesRaw(initOverrides);
        return await response.value();
    }

    /**
     * read the specified source
     */
    async readSourceRaw(requestParameters: ReadSourceRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<Source>> {
        if (requestParameters['id'] == null) {
            throw new runtime.RequiredError(
                'id',
                'Required parameter "id" was null or undefined when calling readSource().'
            );
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/api/v1/sources/{id}`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters['id']))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => SourceFromJSON(jsonValue));
    }

    /**
     * read the specified source
     */
    async readSource(requestParameters: ReadSourceRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<Source> {
        const response = await this.readSourceRaw(requestParameters, initOverrides);
        return await response.value();
    }

}
