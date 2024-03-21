import axios from "axios";

const useHabit = (name, _id) => {
  const handleSubmit = async () => {
    const response = await axios.post(
      "/api/v1/contribution/add-todays-contribution",
      { name: name, habitId: _id },
    );
  };
  return [handleSubmit];
};

export default useHabit;
