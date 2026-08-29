// Target location: frontend/src/lib/axios.ts
// Delete the old axios.js once this is in place.
/// <reference types="vite/client" />
import axios, { type AxiosInstance } from "axios";

export const axiosInstance: AxiosInstance = axios.create({
  baseURL:
    import.meta.env.MODE === "development"
      ? "http://localhost:5000/api"
      : "/api",
  withCredentials: true,
});