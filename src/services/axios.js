import axios from "axios";
import router from "@/router";

const api = axios.create({
  baseURL: process.env.VUE_APP_API_BASE_URL,
  headersEmployees: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    if (!config.headers.Authorization) {
      const token = localStorage.getItem("@petclinic/access-token");

      if (token) {
        config.headers = {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
          "Accept-Language": "pt-br",
        };
      }
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for API calls
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    // Reject promise if usual error
    if (
      error.response.status !== 401 ||
      error.config.url.endsWith("authentication/login/")
    ) {
      throw await Promise.reject(error);
    }
    if (error.config.url.includes("authentication/login/refresh/")) {
      logout();
      throw await Promise.reject(error);
    }
    const response = await api.post("auth/token/refresh/", {
      refresh: localStorage.getItem("@petclinic/refresh-token"),
    });

    localStorage.setItem("@petclinic/access-token", response.data.access);
    error.response.config.headers["Authorization"] =
      "Bearer " + response.data.access;
    return await api(error.response.config);
  }
);
export const logout = () => {
  localStorage.removeItem("@petclinic/access-token");
  localStorage.removeItem("@petclinic/refresh-token");
  router.push("/login");
};

export default api;
