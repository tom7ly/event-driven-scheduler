import axios from 'axios';
import { APIErr, APIStatus } from '../utils/APIutils';
import { SERVICES as SERVICES, ServiceList } from '../configs/defaults';
export var ClientType;
(function (ClientType) {
    ClientType["API"] = "API";
    ClientType["PROXY"] = "PROXY";
})(ClientType || (ClientType = {}));
export class RESTClient {
    constructor(config) {
        this.config = config;
    }
    handleResponse(response) {
        return response;
    }
    handleAxiosError(error) {
        console.error('Axios error:', error?.response?.data || error.response);
        if (axios.isAxiosError(error) && error.response) {
            const { status, data } = error.response;
            throw new APIErr(status, undefined, data || error.response);
        }
        else {
            throw new APIErr(APIStatus.INTERNAL_SERVER_ERROR, error.message);
        }
    }
    createAxiosClient(url) {
        const client = axios.create({
            baseURL: url,
            headers: {
                'Content-Type': 'application/json',
            },
        });
        client.interceptors.response.use(this.handleResponse, this.handleAxiosError);
        return client;
    }
    createAxiosClients() {
        const clients = {};
        Object.keys(ServiceList).forEach((key) => {
            let service = SERVICES[key];
            const url = this.config.type === ClientType.API ? service.apiUrl : service.proxyUrl;
            clients[key] = this.createAxiosClient(url);
        });
        return clients;
    }
}
export class RESTApiClient extends RESTClient {
    constructor() {
        super({ type: ClientType.API });
        this.services = {};
        this.services = this.createAxiosClients();
    }
}
export class RESTProxyClient extends RESTClient {
    constructor() {
        super({ type: ClientType.PROXY });
        this.gw = {};
        this.gw = this.createAxiosClients();
    }
}
