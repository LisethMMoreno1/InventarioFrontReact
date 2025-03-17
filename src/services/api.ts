import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3001/api", // Ensure this is correct
  timeout: 5000,
  headers: { "Content-Type": "application/json" },
});

console.log("Axios baseURL:", api.defaults.baseURL); // Log the base URL

// Interceptor for authentication
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${token}`,
      };
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
