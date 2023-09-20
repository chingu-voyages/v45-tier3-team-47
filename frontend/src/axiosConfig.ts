import axios from "axios";
import baseQuery from "./App";

const axiosInstance = axios.create({
  baseURL: `${baseQuery}/`,
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
