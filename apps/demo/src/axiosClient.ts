import type { AxiosInstance } from 'axios';
import axios, { InternalAxiosRequestConfig, RawAxiosRequestConfig } from 'axios';

const apiGatewayStage = 'http://localhost:3000';
const apiGatewayProd = 'https://api.openshift.com';


const getBaseUrl = (baseUrl: string | undefined, environment?: string):string => { 
    if (environment === 'prod') {
        return baseUrl || apiGatewayProd;
      }
    return baseUrl || apiGatewayStage;
};

export const authInterceptor = (client: AxiosInstance, environment?:string): AxiosInstance => {
  client.interceptors.request.use(async (cfg) => {
    const BASE_URL = getBaseUrl(cfg.baseURL,environment);
    const updatedCfg: RawAxiosRequestConfig = {
      ...cfg,
     // url: `${BASE_URL}${cfg.url}`,
    };
    return updatedCfg as InternalAxiosRequestConfig;
  });
  return client;
};

export const apiRequest = authInterceptor(axios.create());


