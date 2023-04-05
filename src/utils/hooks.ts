import { ChangeEvent, useEffect, useRef, useState } from "react";
import { useAppSelector } from "../services/store/hooks";
import { getUserEmail, getUserName } from "../services/auth/selectors";

export const useForm = () => {
  const formRef = useRef<HTMLFormElement>(null);

  const initialSate = {
    name: "",
    email: "",
    password: "",
    code: "",
  };
  const [formState, setFormState] = useState(initialSate);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  // заполняем ланные в профиле, если пользователь авторизован
  const userName = useAppSelector(getUserName);
  const userEmail = useAppSelector(getUserEmail);
  useEffect(() => {
    if (userName && userEmail) {
      setFormState({
        ...formState,
        name: userName,
        email: userEmail,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userEmail, userName]);

  // копипастим логику блокировки инпукта из UI кита Яндекс из EmailInput и PasswordInput
  // ибо почему-то в обычный input ее не предусмотрели
  const refNameInput = useRef<HTMLInputElement>(null);
  const [isDisabledNameInput, setDisabledNameInput] = useState(true);
  const unlockNameInput = () => {
    setTimeout(() => refNameInput.current?.focus(), 0);
    setDisabledNameInput(false);
  };
  const lockNameInput = () => {
    setDisabledNameInput(true);
  };

  return {
    formRef,
    formState,
    handleChange,
    refNameInput,
    isDisabledNameInput,
    unlockNameInput,
    lockNameInput,
  };
};
