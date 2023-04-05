import {
  Button,
  EmailInput,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { getIsMobile } from "../../services/mobile/selectors";
import { useAppDispatch, useAppSelector } from "../../services/store/hooks";
import { useForm } from "../../utils/hooks";
import { Link, Navigate } from "react-router-dom";
import styles from "./auth.module.css";
import { USER_LOGIN } from "../../services/auth/actions";
import {
  getIsAuthChecked,
  getUserLoginHasError,
  getUserLoginIsLoading,
  getUserLoginRequestSuccess,
} from "../../services/auth/selectors";

export default function Login() {
  const isMobile: boolean = useAppSelector(getIsMobile);
  const dispatch = useAppDispatch();
  const userLoginIsLoading = useAppSelector(getUserLoginIsLoading);
  const userLoginHasError = useAppSelector(getUserLoginHasError);
  const userLoginRequestSuccess = useAppSelector(getUserLoginRequestSuccess);
  const userIsAuthChecked = useAppSelector(getIsAuthChecked);

  const { formRef, formState, handleChange } = useForm();

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const sendData = {
      email: formState.email,
      password: formState.password,
    };
    dispatch(USER_LOGIN(sendData));
  };

  return (
    <>
      {userIsAuthChecked && userLoginRequestSuccess && <Navigate to={"/"} />}

      {userLoginHasError && (
        <h3 className="text text_type_main-default text_color_inactive mb-4">
          Неверный логин или пароль
        </h3>
      )}
      <form className={styles.form} ref={formRef} onSubmit={handleSubmit}>
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
            userLoginIsLoading ? "button-locked" : ""
          } ${formState.email && formState.password ? "" : "button-locked"}`}
        >
          {userLoginIsLoading ? "Загрузка" : "Войти"}
        </Button>
        <span className="align-center mb-4">
          <span
            className={`text text_type_main-default text_color_inactive ${
              !isMobile ? "mr-2" : "section-auth__span-mobile"
            }`}
          >
            Вы — новый пользователь?
          </span>
          <Link to={"/register"} className="text_type_main-default ">
            Зарегистрироваться
          </Link>
        </span>
        <span className="align-center mb-4">
          <span
            className={`text text_type_main-default text_color_inactive ${
              !isMobile ? "mr-2" : "section-auth__span-mobile"
            }`}
          >
            Забыли пароль?
          </span>
          <Link to={"/forgot-password"} className="text_type_main-default">
            Восстановить пароль
          </Link>
        </span>
      </form>

      {userLoginRequestSuccess && <Navigate to={"/"} replace={true} />}
    </>
  );
}
