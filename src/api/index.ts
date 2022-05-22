import axios from "axios";

export const API = axios.create({ baseURL: process.env.REACT_APP_API_BASE_URL });

API.interceptors.request.use((request) => {
    if (localStorage.getItem("user") && request.headers)
        request.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem("user") || "")?.token?.access_token}`;

    return request;
});
