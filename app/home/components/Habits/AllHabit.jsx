"use client"
import { Suspense, useEffect, useState } from "react";
import Habit from "./Habit";
import axios from "axios";
import { resultPerPage } from "@/constants";

const AllHabit = () => {

  // const currentPage = 1;
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [habits, setHabit] = useState([])
  const FetchData = async () => {
    setIsLoading(true);
    const response = await axios.post("/api/v1/habit/get-habits", { skip: currentPage });
    const data = await response.data;
    setHabit(data)
    setIsLoading(false);
    console.log(data);
  }
  useEffect(() => {
    FetchData();
  }, [currentPage])

  return (
    <div>
      <button disabled={habits.length < resultPerPage} onClick={(e) => setCurrentPage(prev => prev + 1)}>Page +</button>
      <button onClick={(e) => setCurrentPage(prev => Math.max(prev - 1, 1))}>Page -</button>
      <p>Page {currentPage}</p>
      {
        (!isLoading) ? habits.map((habit, index) => {

          return (
            // color contributions_per_day description icon name _id contributions
            <Habit
              key={index}
              name={habit.name}
              description={habit.description}
              icon={habit.icon}
              color={habit.color}
              contributions_per_day={habit.contributions_per_day}
              contributions={habit.contributions}
              _id={habit._id}
              count={index + (currentPage - 1) * resultPerPage}
            />
          )
        }) : <p>Loading...</p>
      }
    </div>
  );
};

export default AllHabit;
