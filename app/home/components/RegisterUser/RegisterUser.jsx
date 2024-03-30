"use client";
// hooks
import { useEffect } from "react";
import useUser from "@/hooks/apis/useUser";

const RegisterUser = () => {
  const { registerUser, error } = useUser();

  const handleSubmit = async () => {
    const payload = {};
    const response = await registerUser(payload, () => {});
  };

  useEffect(() => {
    handleSubmit();
  });

  return <></>;
};

export default RegisterUser;
