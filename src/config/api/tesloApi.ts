import { STAGE, API_URL as PROD_URL, API_URL_IOS, API_URL_ANDORID } from "@env";
import axios from "axios";
import { Platform } from "react-native";
import { StorageAdapter } from "../adapters/storage-adapter";

export const API_URL = 
    ( STAGE === 'PROD')
    ? PROD_URL
    : Platform.OS === 'ios'
        ? API_URL_IOS
        : API_URL_ANDORID

const tesloApi = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    }
})

// TODO: Interceptos
tesloApi.interceptors.request.use(
    async (config) => {

        const token = await StorageAdapter.getItem('token');
        if ( StorageAdapter ) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }

        return config;
    }
)

export {
    tesloApi,
}