"use client";
import axios from "axios";
import { useState } from "react";

const useCreateHabit = (defaultIcon, defaultColor) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    icon: defaultIcon,
    completion: 1,
    color: defaultColor,
  });

  const updateName = (newName) => {
    setFormData({ ...formData, name: newName });
  };
  const updateDescription = (newDescription) => {
    setFormData({ ...formData, description: newDescription });
  };
  const updateIcon = (newIcon) => {
    setFormData({ ...formData, icon: newIcon });
  };
  const increaseCompletion = () => {
    if (formData.completion < 9) {
      setFormData({ ...formData, completion: formData.completion + 1 });
    }
  };
  const decreaseCompletion = () => {
    if (formData.completion > 1) {
      setFormData({ ...formData, completion: formData.completion - 1 });
    }
  };
  const updateColor = (newColor) => {
    setFormData({ ...formData, color: newColor });
  };

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    const payload = {
      name: formData.name,
      description: formData.description,
      icon: formData.icon,
      contributions_per_day: formData.completion,
      color: formData.color,
      contributions: [],
    };

    const response = await axios.post("/api/v1/habit/create-habit", payload);
    setLoading(false);
  };
  return {
    formData,
    updateName,
    updateDescription,
    updateIcon,
    increaseCompletion,
    decreaseCompletion,
    updateColor,
    loading,
    handleSubmit,
  };
};

export default useCreateHabit;
