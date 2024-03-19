import { habitFormIconsJson, themeColorJson } from "@/constants";
import styles from "@/app/home/home.module.scss"

const Habit = (props) => {
  const color = themeColorJson[props.color];

  return (
    <div className={styles.main__container__wrapper}
      style={{
        backgroundColor: color,
      }}
    >
      <div className={styles.main__container}>
        <div className={styles.main__container__child1}>
          {habitFormIconsJson[props.icon]}
          <p>{props.name}</p>
        </div>
        <p>{props.contributions_per_day}</p>
      </div>
    </div>
  )

  return <div>Habit {props.count}</div>;
};

export default Habit;
