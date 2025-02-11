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
import type { Inventory } from './Inventory';
import {
    InventoryFromJSON,
    InventoryFromJSONTyped,
    InventoryToJSON,
} from './Inventory';

/**
 * 
 * @export
 * @interface SourceUpdateOnPrem
 */
export interface SourceUpdateOnPrem {
    /**
     * 
     * @type {string}
     * @memberof SourceUpdateOnPrem
     */
    agentId: string;
    /**
     * 
     * @type {Inventory}
     * @memberof SourceUpdateOnPrem
     */
    inventory: Inventory;
}

/**
 * Check if a given object implements the SourceUpdateOnPrem interface.
 */
export function instanceOfSourceUpdateOnPrem(value: object): value is SourceUpdateOnPrem {
    if (!('agentId' in value) || value['agentId'] === undefined) return false;
    if (!('inventory' in value) || value['inventory'] === undefined) return false;
    return true;
}

export function SourceUpdateOnPremFromJSON(json: any): SourceUpdateOnPrem {
    return SourceUpdateOnPremFromJSONTyped(json, false);
}

export function SourceUpdateOnPremFromJSONTyped(json: any, ignoreDiscriminator: boolean): SourceUpdateOnPrem {
    if (json == null) {
        return json;
    }
    return {
        
        'agentId': json['agent_id'],
        'inventory': InventoryFromJSON(json['inventory']),
    };
}

export function SourceUpdateOnPremToJSON(value?: SourceUpdateOnPrem | null): any {
    if (value == null) {
        return value;
    }
    return {
        
        'agent_id': value['agentId'],
        'inventory': InventoryToJSON(value['inventory']),
    };
}

