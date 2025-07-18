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
/**
 * 
 * @export
 * @interface AgentProxy
 */
export interface AgentProxy {
    /**
     * 
     * @type {string}
     * @memberof AgentProxy
     */
    httpUrl?: string | null;
    /**
     * 
     * @type {string}
     * @memberof AgentProxy
     */
    httpsUrl?: string | null;
    /**
     * 
     * @type {string}
     * @memberof AgentProxy
     */
    noProxy?: string | null;
}

/**
 * Check if a given object implements the AgentProxy interface.
 */
export function instanceOfAgentProxy(value: object): value is AgentProxy {
    return true;
}

export function AgentProxyFromJSON(json: any): AgentProxy {
    return AgentProxyFromJSONTyped(json, false);
}

export function AgentProxyFromJSONTyped(json: any, ignoreDiscriminator: boolean): AgentProxy {
    if (json == null) {
        return json;
    }
    return {
        
        'httpUrl': json['httpUrl'] == null ? undefined : json['httpUrl'],
        'httpsUrl': json['httpsUrl'] == null ? undefined : json['httpsUrl'],
        'noProxy': json['noProxy'] == null ? undefined : json['noProxy'],
    };
}

export function AgentProxyToJSON(value?: AgentProxy | null): any {
    if (value == null) {
        return value;
    }
    return {
        
        'httpUrl': value['httpUrl'],
        'httpsUrl': value['httpsUrl'],
        'noProxy': value['noProxy'],
    };
}

