import axios, { AxiosInstance, AxiosResponse } from 'axios'

const api: AxiosInstance = axios.create({
    // baseURL: process.env.CURRENCY_URL,
    baseURL: 'https://economia.awesomeapi.com.br/json'
});

export default {
    all(): Promise<AxiosResponse> {
        return api.get('/all')
    },

    listen(codes = []): Promise<AxiosResponse> {
        return api.get(`/all/${codes.join()}`)
    }
}


