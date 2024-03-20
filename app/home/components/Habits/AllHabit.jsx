"use client";
import { Suspense, useEffect, useState } from "react";
import Habit from "./Habit";
import axios from "axios";
import { resultPerPage } from "@/constants";
import styles from "@/app/home/home.module.scss";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

const AllHabit = (props) => {
  // const currentPage = 1;
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [habits, setHabit] = useState([]);
  const FetchData = async () => {
    setIsLoading(true);
    const response = await axios.post("/api/v1/habit/get-habits", {
      skip: currentPage,
    });
    const data = await response.data;
    setHabit(data);
    setIsLoading(false);
    // console.log(data);
  };
  useEffect(() => {
    FetchData();
  }, [currentPage]);
  useEffect(() => {
    if (habits.length === resultPerPage) {
    } else {
      FetchData();
    }
  }, [props.event]);

  return (
    <div>
      <div className={styles.habit__container}>
        {!isLoading
          ? habits.map((habit, index) => {
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
              );
            })
          : habits.map((habit, index) => {
              return (
                // color contributions_per_day description icon name _id contributions
                <Habit
                  key={index}
                  name="Loading..."
                  description="Loading..."
                  icon="pulse"
                  color="red-varient-1"
                  contributions_per_day="Loading..."
                  count={index + (currentPage - 1) * resultPerPage}
                />
              );
            })}
      </div>

      <footer className={styles.footer}>
        <div className={styles.page__container}>
          <button
            disabled={currentPage === 1}
            onClick={(e) => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          >
            <IoIosArrowBack />
          </button>
          <p>{currentPage}</p>
          <button
            disabled={habits.length < resultPerPage}
            onClick={(e) => setCurrentPage((prev) => prev + 1)}
          >
            <IoIosArrowForward />
          </button>
        </div>
      </footer>
    </div>
  );
};

export default AllHabit;
