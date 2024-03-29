// react-icons
import { HiMiniPlus } from "react-icons/hi2";

// icons
import { habitFormIconsJson, themeColorJson } from "@/constants";

// styles
import styles from "./HabitCard.module.scss";
import useHabit from "@/hooks/apis/useHabit";

const HabitCard = (props) => {
  const color = themeColorJson[props.color];

  const { addTodaysContribution } = useHabit();

  const handleSubmit = () => {
    let payload = {
      habitId: props._id,
      name: props.name,
    };

    addTodaysContribution(payload, () => {});
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
          <HiMiniPlus />
        </p>
      </div>
    </div>
  );
};

export default HabitCard;
