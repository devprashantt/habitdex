"use client";
// hooks
import { useState } from "react";
// icon and colors
import { habitFormIcons, themeColors } from "@/constants";
// modules
import axios from "axios";

const useCreateHabit = (setEvent) => {
  const randIcon =
    habitFormIcons[Math.floor(Math.random() * habitFormIcons.length)].name;
  const randColor =
    themeColors[Math.floor(Math.random() * themeColors.length)].name;
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    icon: randIcon,
    completion: 1,
    color: randColor,
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
    const randIcon =
      habitFormIcons[Math.floor(Math.random() * habitFormIcons.length)].name;
    const randColor =
      themeColors[Math.floor(Math.random() * themeColors.length)].name;
    formData.name = "";
    formData.description = "";
    formData.icon = randIcon;
    formData.completion = 1;
    formData.color = randColor;

    const response = await axios.post("/api/v1/habit/create-habit", payload);
    setEvent((prev) => prev + 1);
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
