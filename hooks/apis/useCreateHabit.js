"use client";
// hooks
import { useState } from "react";
// icon and colors
import { habitFormIcons, themeColors } from "@/constants";
// modules
import axios from "axios";

const useCreateHabit = (setEvent, formData, setFormData) => {
  const randIcon =
    habitFormIcons[Math.floor(Math.random() * habitFormIcons.length)].name;
  const randColor =
    themeColors[Math.floor(Math.random() * themeColors.length)].name;

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
    loading,
    handleSubmit,
  };
};

export default useCreateHabit;
