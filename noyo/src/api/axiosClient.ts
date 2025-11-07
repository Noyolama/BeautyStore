import { env } from "@/config/env";
import axios, { type InternalAxiosRequestConfig } from "axios";

const baseURL = `${env.API_URL}/api` //move url to env

const api = axios.create({
  baseURL,
  withCredentials: true,
});

api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => config,
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      return Promise.reject({
        ...error,
        message: error?.response?.data?.message || error?.message
      })
    } else if (error.response?.status === 403) {
      window.location.href = '/403'
      return Promise.reject({
        ...error,
        message: error?.response?.data?.message || error?.message
      })
    }
    return Promise.reject(error);
  }
);
export default api;
