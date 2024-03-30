// react-icons
import { HiMiniPlus } from "react-icons/hi2";

// icons
import { habitFormIconsJson, themeColorJson } from "@/constants";

// styles
import styles from "./HabitCard.module.scss";
import "react-calendar-heatmap/dist/styles.css";
import useHabit from "@/hooks/apis/useHabit";
import CalendarHeatmap from "react-calendar-heatmap";
import axios from "axios";
import { useEffect, useState } from "react";

const HabitCard = (props) => {
  const color = themeColorJson[props.color];
  const [dailyContributionData, setDailyContributionData] = useState([]);
  const [addContributionEvent, setAddContributionEvent] = useState(0);
  const date = new Date();
  const dateString = date.toISOString().split("T")[0];
  date.setFullYear(date.getFullYear() - 1);
  const oldDateString = date.toISOString().split("T")[0];
  const { addTodaysContribution } = useHabit();

  const fetchContribs = async () => {
    let payload = {
      _id: props.id,
    };
    const response = await axios.post(
      "/api/v1/contribution/get-contributions",
      payload,
    );
    const data = await response.data;
    const contributions = data.data["0"].contributions;
    const filteredContributions = new Array();
    for (let i = 0; i < contributions.length; i++) {
      const tmp = {
        date: contributions[i].date.split("T")[0],
        count: contributions[i].count,
      };
      filteredContributions.push(tmp);
    }
    setDailyContributionData(filteredContributions);
  };

  const handleSubmit = () => {
    setAddContributionEvent((prev) => prev + 1);

    let payload = {
      habitId: props.id,
      name: props.name,
    };
    addTodaysContribution(payload, () => {});
  };
  useEffect(() => {
    fetchContribs();
  }, [addContributionEvent]);
  return (
    <div
      className={styles.main__container__wrapper}
      style={{
        backgroundColor: color,
      }}
    >
      <div className={styles.main__container}>
        <div className={styles.main__container__child1}>
          <div className={styles.icon__container}>
            {habitFormIconsJson[props.icon]}
          </div>
          <div>
            <p>{props.name}</p>
            <p className={styles.description}>{props.description}</p>
          </div>
        </div>
        <p onClick={handleSubmit} className={styles.addContribution}>
          <HiMiniPlus />
        </p>
      </div>
      <div>
        <CalendarHeatmap
          startDate={oldDateString}
          endDate={dateString}
          // values={[
          //   { date: '2024-01-01', count: 1 },
          //   { date: '2024-01-22', count: 2 },
          //   { date: '2024-01-30', count: 3 },
          //   { date: '2024-03-21', count: 3 }

          //   // ...and so on
          // ]}
          values={dailyContributionData}
          classForValue={(value) => {
            if (!value) {
              return "color-empty";
            }
            return `color-github-${value.count}`;
          }}
        />
      </div>
    </div>
  );
};

export default HabitCard;
