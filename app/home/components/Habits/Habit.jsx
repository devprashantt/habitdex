import { habitFormIconsJson, themeColorJson } from "@/constants";
import styles from "@/app/home/home.module.scss";
import axios from "axios";

const Habit = (props) => {
  const color = themeColorJson[props.color];
  const handleSubmit = async () => {
    const response = await axios.post(
      "/api/v1/contribution/addContributionToday",
      { name: props.name },
    );
  };
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
          +
        </p>
      </div>
      <div></div>
    </div>
  );
};

export default Habit;
