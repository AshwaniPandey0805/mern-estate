import axios from "axios";

const api = axios.create({
    baseURL : "http://localhost:3000/api", // base url
    timeout : 10000,
    headers : {
        "Content-Type" : "application/json",
    },
});

// Request intercepter
api.interceptors.request.use(
    (config) => {
        // const token = localStorage.getItem("token")
        // if (token) config.header.Authorization = `Bearer ${token}`
        return config;
    },
    (error) => Promise.reject(error)
);

// Response intercepter
api.interceptors.response.use(
    (response) => response,
    (error) => Promise.reject(error)
);

export default api;