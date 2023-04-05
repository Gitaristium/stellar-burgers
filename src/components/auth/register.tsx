import {
  Button,
  EmailInput,
  Input,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { getIsMobile } from "../../services/mobile/selectors";
import { useAppDispatch, useAppSelector } from "../../services/store/hooks";
import { useForm } from "../../utils/hooks";
import { Link, Navigate } from "react-router-dom";
import styles from "./auth.module.css";
import { USER_REGISTER } from "../../services/auth/actions";
import {
  getUserRegisterIsLoading,
  getUserRegisterHasError,
  getUserRegisterRequestSuccess,
} from "../../services/auth/selectors";

export default function Register() {
  const isMobile: boolean = useAppSelector(getIsMobile);
  const dispatch = useAppDispatch();
  const userRegisterIsLoading = useAppSelector(getUserRegisterIsLoading);
  const userRegisterHasError = useAppSelector(getUserRegisterHasError);
  const userRegisterRequestSuccess = useAppSelector(
    getUserRegisterRequestSuccess
  );

  const { formRef, formState, handleChange } = useForm();

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const sendData = {
      email: formState.email,
      password: formState.password,
      name: formState.name,
    };
    dispatch(USER_REGISTER(sendData));
  };

  return (
    <>
      {userRegisterHasError && (
        <h3 className="text text_type_main-default text_color_inactive mb-4">
          Такой пользователь уже зарегестрирован
        </h3>
      )}

      <form className={styles.form} ref={formRef} onSubmit={handleSubmit}>
        <Input
          type={"text"}
          placeholder={"Имя"}
          onChange={handleChange}
          value={formState.name}
          name={"name"}
          error={false}
          errorText={"Ошибка"}
          size={`${isMobile ? "small" : "default"}`}
          extraClass={`mb-6 ${isMobile ? "input__mobile" : ""}`}
        />
        <EmailInput
          onChange={handleChange}
          value={formState.email}
          name={"email"}
          isIcon={false}
          size={`${isMobile ? "small" : "default"}`}
          extraClass={`mb-6 ${isMobile ? "input__mobile" : ""}`}
          width="100%"
        />
        <PasswordInput
          onChange={handleChange}
          value={formState.password}
          name={"password"}
          size={`${isMobile ? "small" : "default"}`}
          extraClass={`mb-6 ${isMobile ? "input__mobile" : ""}`}
        />
        <Button
          htmlType="submit"
          type="primary"
          size={`${!isMobile ? "medium" : "small"}`}
          extraClass={`${!isMobile ? "mb-20" : "mb-10"} ${
            userRegisterIsLoading ? "button-locked" : ""
          } ${
            formState.name && formState.email && formState.password
              ? ""
              : "button-locked"
          }`}
        >
          {userRegisterIsLoading ? "Загрузка" : "Зарегистрироваться"}
        </Button>

        <span className={`align-center mb-4`}>
          <span
            className={`text text_type_main-default text_color_inactive ${
              !isMobile ? "mr-2" : "section-auth__span-mobile"
            }`}
          >
            Уже зарегистрированы?
          </span>
          <Link to={"/login"} className="text_type_main-default ">
            Войти
          </Link>
        </span>
      </form>

      {userRegisterRequestSuccess && <Navigate to={"/"} replace={true} />}
    </>
  );
}
