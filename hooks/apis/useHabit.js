import customToast from "@/lib/services/toast";
import axios from "axios";
import { useState } from "react";

const useHabit = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const getHabits = async (setAllHabits) => {
    try {
      setIsLoading(true);
      const apiResponse = await axios.get("/api/v1/habit/get-habits");
      const result = await apiResponse.data.data;
      // console.log(result);
      if (apiResponse.status === 200) {
        setIsLoading(false);
        setAllHabits(result);
        return result;
        // cb(apiResponse.data);
      } else {
        setIsLoading(false);
        setError(apiResponse.data.message);
        customToast({
          message: "Something went wrong",
          type: "error",
        });
      }
      setIsLoading(false);
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

  const addTodaysContribution = async (payload, cb) => {
    try {
      const apiResponse = await axios.post(
        `/api/v1/contribution/add-todays-contribution`,
        payload,
      );

      if (apiResponse.status === 200) {
        customToast({
          message: "Contribution added successfully",
          type: "success",
        });
        cb();
      } else {
        customToast({
          message: "Something went wrong",
          type: "error",
        });
        setError(apiResponse.data.message);
      }
    } catch (error) {
      customToast({
        message: "Something went wrong",
        type: "error",
      });
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const getTodaysContribution = async (cb) => {
    try {
      const apiResponse = await axios.get(
        `/api/v1/contribution/get-todays-contribution`,
      );

      if (apiResponse.status === 200) {
        cb(apiResponse.data);
      } else {
        customToast({
          message: "Something went wrong",
          type: "error",
        });
        setError(apiResponse.data.message);
      }
      setIsLoading(false);
    } catch (error) {
      customToast({
        message: "Something went wrong",
        type: "error",
      });
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    addTodaysContribution,
    getTodaysContribution,
    getHabits,
    error,
    isLoading,
  };
};

export default useHabit;
