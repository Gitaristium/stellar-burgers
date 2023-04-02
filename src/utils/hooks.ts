import { ChangeEvent, useState } from "react";

export const useForm = () => {
  const initialSate = {
    name: "",
    email: "",
    password: "",
    code: "",
  };
  const [form, setForm] = useState(initialSate);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return { form, handleChange };
};
