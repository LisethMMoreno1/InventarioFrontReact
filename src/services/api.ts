import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3001/api", // Ajusta con la URL de tu backend
  timeout: 5000,
  headers: { "Content-Type": "application/json" },
});

// Interceptor para manejar autenticación (opcional)
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
