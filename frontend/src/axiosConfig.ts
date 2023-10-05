import axios from "axios";

interface IBaseQueryObj {
  [key: string]: string;
};

const baseQueryObj: IBaseQueryObj = {
  production: "https://sightseeshare-api.onrender.com/",
  development: "http://localhost:3000/"
};

const nodeENV = process.env.NODE_ENV || "development";
export const baseQuery = baseQueryObj[nodeENV];

const axiosInstance = axios.create({
  baseURL: baseQuery,
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
