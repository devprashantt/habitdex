"use client";

import customToast from "@/lib/services/toast";
import axios from "axios";
import { useState } from "react";

const useUser = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const registerUser = async (cb) => {
    try {
      const apiResponse = await axios.get(`/api/v1/user/get-user`);

      if (apiResponse.status === 200) {
        customToast({
          message: "User registered successfully",
          type: "success",
        });
        cb(apiResponse.data);
      } else {
        setError(apiResponse.data.message);
        customToast({
          message: "Something went wrong",
          type: "error",
        });
      }
    } catch (error) {
      setError(error.message);
      customToast({
        message: "Something went wrong",
        type: "error",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return {
    registerUser,
    error,
    isLoading,
  };
};

export default useUser;
