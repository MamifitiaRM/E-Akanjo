import axios from "axios";

const axiosInstance = axios.create({
  // baseURL: "http://localhost:3000/api",
  baseURL: `${import.meta.env.VITE_BACKEND_URL}/api`,
  withCredentials: true,
});

export default axiosInstance;
