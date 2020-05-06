import { getRequestInstance } from '../helpers/APIRequest';

interface HTTPHeader {
    [key: string]: any;
}

export default class APIBase {
    private headers: HTTPHeader;
    private key: string;
    private secret: string;
    private baseURL: string;

    constructor(key:string, secret:string) {
        this.headers = {
            "Content-Type": "application/json",
            "User-Agent": "binance-connector-node"
        }

        this.key = key;
        this.secret = secret;
        this.baseURL = 'https://api.binance.com';
    }

    public send_request(): any {
        return getRequestInstance(this.baseURL, '');
    }
}
