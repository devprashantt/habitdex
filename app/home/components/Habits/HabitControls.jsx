"use client";
// hooks
import { Suspense, useState } from "react";

// components
import CreateHabit from "@/containers/Forms/CreateHabit";
import AllHabit from "./AllHabit/AllHabit";

// styles

const HabitControls = () => {
  const [event, setEvent] = useState(0);
  return (
    <div>
      <CreateHabit event={event} setEvent={setEvent} />
      <p>All Habits</p>
      <Suspense fallback={<p>Loading habits...</p>}>
        <AllHabit event={event} />
      </Suspense>
    </div>
  );
};

export default HabitControls;
