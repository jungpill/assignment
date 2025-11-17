import axios, { AxiosError, AxiosHeaders  } from "axios";

const BASE_URL = (import.meta.env.VITE_API_BASE_URL ?? "").replace(/\/$/, "");

export const http = axios.create({
    baseURL: BASE_URL,
    timeout: 30_000,
});

http.interceptors.request.use((config) => {

    const headers = AxiosHeaders.from(config.headers);

    const isFormData =
        typeof FormData !== "undefined" && config.data instanceof FormData;
    if (!isFormData && !headers.has("Content-Type")) {
        headers.set("Content-Type", "application/json");
    }

    config.headers = headers; 
        return config;
});