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

import { mapValues } from '../runtime';
import type { AgentProxy } from './AgentProxy';
import {
    AgentProxyFromJSON,
    AgentProxyFromJSONTyped,
    AgentProxyToJSON,
} from './AgentProxy';

/**
 * 
 * @export
 * @interface SourceCreate
 */
export interface SourceCreate {
    /**
     * 
     * @type {string}
     * @memberof SourceCreate
     */
    name: string;
    /**
     * 
     * @type {string}
     * @memberof SourceCreate
     */
    sshPublicKey?: string | null;
    /**
     * 
     * @type {AgentProxy}
     * @memberof SourceCreate
     */
    proxy?: AgentProxy;
    /**
     * 
     * @type {string}
     * @memberof SourceCreate
     */
    certificateChain?: string | null;
}

/**
 * Check if a given object implements the SourceCreate interface.
 */
export function instanceOfSourceCreate(value: object): value is SourceCreate {
    if (!('name' in value) || value['name'] === undefined) return false;
    return true;
}

export function SourceCreateFromJSON(json: any): SourceCreate {
    return SourceCreateFromJSONTyped(json, false);
}

export function SourceCreateFromJSONTyped(json: any, ignoreDiscriminator: boolean): SourceCreate {
    if (json == null) {
        return json;
    }
    return {
        
        'name': json['name'],
        'sshPublicKey': json['sshPublicKey'] == null ? undefined : json['sshPublicKey'],
        'proxy': json['proxy'] == null ? undefined : AgentProxyFromJSON(json['proxy']),
        'certificateChain': json['certificateChain'] == null ? undefined : json['certificateChain'],
    };
}

export function SourceCreateToJSON(value?: SourceCreate | null): any {
    if (value == null) {
        return value;
    }
    return {
        
        'name': value['name'],
        'sshPublicKey': value['sshPublicKey'],
        'proxy': AgentProxyToJSON(value['proxy']),
        'certificateChain': value['certificateChain'],
    };
}

