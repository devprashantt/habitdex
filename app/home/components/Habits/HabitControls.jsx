"use client";
// hooks
import { Suspense, useState } from "react";

// components
import CreateHabit from "@/containers/Forms/CreateHabit";
import AllHabit from "./AllHabit/AllHabit";

// styles
import styles from "@/app/home/components/Habits/Habit/Habit.module.scss"

const HabitControls = () => {
  const [event, setEvent] = useState(0);
  return (
    <div>
        <div className={styles.add__button}>
            <CreateHabit  event={event} setEvent={setEvent} />
        </div>
      <p>All Habits</p>
      <Suspense fallback={<p>Loading feed...</p>}>
        <AllHabit event={event} />
      </Suspense>
    </div>
  );
};

export default HabitControls;
