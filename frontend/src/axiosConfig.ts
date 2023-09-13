import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3000/",
  timeout: 30000,
});

axiosInstance.interceptors.request.use(async (config) => {
  const authToken = sessionStorage.getItem("authToken");

  if (authToken) {
    config.headers.Authorization = `Bearer ${authToken}`;
  }

  return config;
});

export default axiosInstance;
