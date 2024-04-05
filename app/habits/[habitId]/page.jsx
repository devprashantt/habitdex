"use client";

import axios from "axios";
import styles from "./page.module.scss";
import { useEffect } from "react";
import useHabit from "@/hooks/apis/useHabit";

const page = ({ params }) => {
  const { getHabit } = useHabit();
  const fetchData = async () => {
    const data = await getHabit(params.habitId);
    console.log(data);
  };
  useEffect(() => {
    fetchData();
  });

  return (
    <div className={styles.main__container}>
      Habit for habitId = {params.habitId}
    </div>
  );
};

export default page;
