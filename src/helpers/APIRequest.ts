import axios from 'axios';

export const getRequestInstance = (baseURL: string, config: any) => axios.create({
    baseURL,
    ...config
});
