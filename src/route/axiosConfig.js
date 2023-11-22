import axios from "axios";
import { CURRENT_API_URL } from "../config";

export const api = axios.create({ CURRENT_API_URL });

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = "Bearer " + token;
    }
    config.headers['Content-Type'] = 'application/json';
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401 && originalRequest.url === "") {
      // Todo direct to login screen
        // router.push("/login");
      return Promise.reject(error);
    }

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      //   const refreshToken = localStorageService.getRefreshToken();
      //   return axios
      //     .post("/auth/token", {
      //       refresh_token: refreshToken,
      //     })
      //     .then((res) => {
      //       if (res.status === 201) {
      //         localStorageService.setToken(res.data);
      //         axios.defaults.headers.common["Authorization"] =
      //           "Bearer " + localStorageService.getAccessToken();
      //         return axios(originalRequest);
      //       }
      //     });
    }
    return Promise.reject(error);
  }
);
