
import * as runtime from '@migration-planner-ui/api-client/runtime';
import axios, { AxiosInstance } from 'axios';

import { AgentApi } from '@migration-planner-ui/api-client/apis';
import { authInterceptor } from '#/axiosClient';
import { Configuration, InitOverrideFunction } from '@migration-planner-ui/api-client/runtime';


export class CustomAgentApi extends AgentApi {
    private axiosInstance: AxiosInstance;

    constructor(configuration: Configuration) {
        super(configuration); 
        this.axiosInstance = authInterceptor(axios.create());
    }
  
    async request(context: runtime.RequestOpts,_initOverrides?: RequestInit | InitOverrideFunction | undefined): Promise<Response> {
        const url = `/api/v1${context.path}`; 
        const method = context.method;
        const data = context.body ? JSON.stringify(context.body) : undefined;
        const headers = { ...context.headers, 'Content-Type': 'application/json' };

        try {
            const response = await this.axiosInstance.request({
                url,
                method,
                data,
                headers,
                params: context.query,
            });
            return response.data;
        } catch (error) {
            console.error('API Error:', error);
            throw error;
        }
    }
}