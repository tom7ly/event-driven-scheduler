import { AxiosError, AxiosInstance, AxiosResponse } from 'axios';
import { APIRes } from '../utils/APIutils';
import { ServiceList } from '../configs/defaults';
export type IRESTClient = {
    [K in ServiceList]: AxiosInstance;
};
export declare enum ClientType {
    API = "API",
    PROXY = "PROXY"
}
export declare abstract class RESTClient {
    private config;
    constructor(config: {
        type: ClientType;
    });
    protected handleResponse(response: AxiosResponse): AxiosResponse;
    protected handleAxiosError(error: AxiosError): APIRes;
    protected createAxiosClient(url: string): AxiosInstance;
    protected createAxiosClients(): IRESTClient;
}
export declare class RESTApiClient extends RESTClient {
    services: IRESTClient;
    constructor();
}
export declare class RESTProxyClient extends RESTClient {
    gw: IRESTClient;
    constructor();
}
