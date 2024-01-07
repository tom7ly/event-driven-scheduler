import axios, { AxiosError, AxiosInstance, AxiosResponse } from 'axios';
import { APIErr, APIRes, APIStatus } from '../utils/APIutils';
import { SERVICES as SERVICES, IService, ServiceList } from '../configs/defaults';
export type IRESTClient = {
  [K in ServiceList]: AxiosInstance;
};

export enum ClientType {
  API = 'API',
  PROXY = 'PROXY'
}

export abstract class RESTClient {


  constructor(private config: { type: ClientType }) { }

  protected handleResponse(response: AxiosResponse): AxiosResponse {
    return response;
  }

  protected handleAxiosError(error: AxiosError): APIRes {
    console.error('Axios error:', error?.response?.data || error.response);
    if (axios.isAxiosError(error) && error.response) {
      const { status, data } = error.response;
      throw new APIErr(status, undefined, data || error.response);
    } else {
      throw new APIErr(APIStatus.INTERNAL_SERVER_ERROR, error.message);
    }
  }

  protected createAxiosClient(url: string): AxiosInstance {
    const client = axios.create({
      baseURL: url,
      headers: {
        'Content-Type': 'application/json',
      },
    });
    client.interceptors.response.use(this.handleResponse, this.handleAxiosError);
    return client;
  }

  protected createAxiosClients(): IRESTClient {
    const clients: IRESTClient = {} as IRESTClient;
    Object.keys(ServiceList).forEach((key) => {
      let service: IService = SERVICES[key];
      const url = this.config.type === ClientType.API ? service.apiUrl : service.proxyUrl;
      clients[key] = this.createAxiosClient(url);
    })
    return clients;
  }
}

export class RESTApiClient extends RESTClient {
  services: IRESTClient = {} as IRESTClient;
  constructor() {
    super({ type: ClientType.API });
    this.services = this.createAxiosClients();
  }
}

export class RESTProxyClient extends RESTClient {
  gw: IRESTClient = {} as IRESTClient;
  constructor() {
    super({ type: ClientType.PROXY });
    this.gw = this.createAxiosClients();
  }
}

