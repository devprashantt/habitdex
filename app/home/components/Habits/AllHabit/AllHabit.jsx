"use client";

// components and icons
import Habit from "../Habit/Habit";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

// misc
import { resultPerPage } from "@/constants";
import styles from "./AllHabit.module.scss";
import useAllHabits from "@/hooks/apis/useAllHabits";

const AllHabit = (props) => {
  const [isLoading, currentPage, habits, setCurrentPage] = useAllHabits(
    props.event,
  );
  return (
    <div>
      <div className={styles.habit__container}>
        {!isLoading
          ? habits.map((habit, index) => {
              return (
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
