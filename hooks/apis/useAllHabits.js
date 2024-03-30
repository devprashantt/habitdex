"use client";

import { useEffect, useState } from "react";
import { resultPerPage } from "@/constants";
import axios from "axios";

const useAllHabits = (event) => {
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [habits, setHabit] = useState([]);
  const FetchData = async () => {
    setIsLoading(true);
    const response = await axios.post("/api/v1/habit/get-habits", {
      skip: currentPage,
    });
    const data = await response.data.data;
    setHabit(data);
    setIsLoading(false);
  };
  useEffect(() => {
    FetchData();
  }, [currentPage]);
  useEffect(() => {
    if (habits.length === resultPerPage) {
    } else {
      FetchData();
    }
  }, [event]);
  return [isLoading, currentPage, habits, setCurrentPage];
};

export default useAllHabits;
