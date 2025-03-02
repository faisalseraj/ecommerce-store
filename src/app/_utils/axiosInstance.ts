"use client";

import axios from "axios";
import { toaster } from "@/components/ui/toaster";

// Create an Axios instance
const axiosInstance = axios.create({
  baseURL: "/api", // Set your base URL here
});

// Add a response interceptor
axiosInstance.interceptors.response.use(
  (response) => response, // Return the response directly if successful
  (error) => {
    // Handle errors globally
    if (error.response) {
      console.log("error is here");
      toaster.create({
        description: error.response.data.error || "An error occurred!",
        type: "error",
      });
    }
    return Promise.reject(error); // Reject the promise with the error
  }
);

export default axiosInstance;
