"use client";
// hooks
import useCreateHabit from "@/hooks/apis/useCreateHabit";
import useToggleState from "@/hooks/useToggleState";

// icons
import { MdDone } from "react-icons/md";
import { IoCloseSharp } from "react-icons/io5";

// constants
import { habitFormIcons, themeColors } from "@/constants";

import styles from "./CreateHabit.module.scss";

export default function CreateHabit(props) {
  const [visible, toggleVisible] = useToggleState(false);
  const {
    formData,
    updateName,
    updateDescription,
    updateIcon,
    increaseCompletion,
    decreaseCompletion,
    updateColor,
    loading,
    handleSubmit,
  } = useCreateHabit(props.setEvent);

  return (
    <div className={styles.main__container}>
      <div className={visible ? styles.visible__form : styles.hidden__form}>
        <form className={styles.form__container} onSubmit={handleSubmit}>
          <div className={styles.top__container}>
            <button className={styles.close__button} onClick={toggleVisible}>
              <IoCloseSharp />
            </button>
            <h2>New Habit</h2>

            <button
              className={styles.close__button}
              disabled={loading}
              type="submit"
            >
              <MdDone />
            </button>
          </div>
          <div className={styles.input__container}>
            <div>
              <label>Name</label>
              <br />
              <input
                name="name"
                className={styles.input__box}
                value={formData.name}
                onChange={(e) => updateName(e.target.value)}
                type="text"
              />
            </div>
            <div>
              <label>Description</label>
              <br />
              <input
                name="description"
                className={styles.input__box}
                value={formData.description}
                onChange={(e) => updateDescription(e.target.value)}
                type="text"
              />
            </div>
            <div>
              <label>Completion per day</label>
              <div className={styles.completion__div}>
                <input
                  name="completions"
                  className={styles.input__box}
                  type="text"
                  readOnly
                  value={formData.completion + " /Day"}
                />
                <div>
                  <div
                    onClick={(e) => {
                      decreaseCompletion();
                    }}
                  >
                    -
                  </div>
                  <div
                    onClick={(e) => {
                      increaseCompletion();
                    }}
                  >
                    +
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.selector__container}>
            <div>
              <label>Icon</label>
              <input
                type="text"
                name="icon"
                style={{
                  visibility: "hidden",
                }}
                readOnly
                value={
                  habitFormIcons?.find(
                    (iconDetail) => iconDetail?.name === formData.icon,
                  ).name
                }
              />
              <div className={styles.icon__container}>
                {habitFormIcons?.map((iconDetail, index) => {
                  return (
                    <div
                      className={styles.color__div}
                      key={index}
                      onClick={(e) => {
                        updateIcon(iconDetail.name);
                      }}
                    >
                      {iconDetail?.icon}
                    </div>
                  );
                })}
              </div>
            </div>
            <div>
              <label>Color</label>
              <input
                type="text"
                name="color"
                readOnly
                value={formData.color}
                style={{
                  visibility: "hidden",
                }}
              />
              <div className={styles.color__container}>
                {themeColors?.map((color, index) => {
                  return (
                    <div
                      key={index}
                      onClick={(e) => {
                        updateColor(color.name);
                      }}
                      style={{
                        backgroundColor: color.color,
                      }}
                    ></div>
                  );
                })}
              </div>
            </div>
          </div>
        </form>
      </div>
      <button className={visible ? styles.hidden__button : styles.visible__button}
              onClick={(e) => toggleVisible()}>
        Add new Habit
      </button>
    </div>
  );
}
