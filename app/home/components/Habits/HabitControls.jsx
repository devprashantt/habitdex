"use client";
import CreateHabit from "@/containers/Forms/CreateHabit";
import React, { Suspense, useState } from "react";
import AllHabit from "./AllHabit";

const HabitControls = () => {
  const [event, setEvent] = useState(0);
  return (
    <div>
      <CreateHabit event={event} setEvent={setEvent} />
      <p>All Habits</p>
      <Suspense fallback={<p>Loading feed...</p>}>
        <AllHabit event={event} />
      </Suspense>
    </div>
  );
};

export default HabitControls;
