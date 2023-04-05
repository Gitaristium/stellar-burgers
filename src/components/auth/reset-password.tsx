import {
  Button,
  Input,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { getIsMobile } from "../../services/mobile/selectors";
import { useAppDispatch, useAppSelector } from "../../services/store/hooks";
import { useForm } from "../../utils/hooks";
import { Link, Navigate } from "react-router-dom";
import styles from "./auth.module.css";
import {
  getUserResetConfirmIsLoading,
  getUserResetConfirmHasError,
  getUserResetConfirmRequestSuccess,
  getIsAuthChecked,
} from "../../services/auth/selectors";
import { USER_RESET_CONFIRM } from "../../services/auth/actions";

export default function ResetPassword() {
  const isMobile: boolean = useAppSelector(getIsMobile);
  const dispatch = useAppDispatch();
  const userResetConfirmIsLoading = useAppSelector(
    getUserResetConfirmIsLoading
  );
  const userResetConfirmHasError = useAppSelector(getUserResetConfirmHasError);
  const userResetConfirmRequestSuccess = useAppSelector(
    getUserResetConfirmRequestSuccess
  );
  const userIsAuthChecked = useAppSelector(getIsAuthChecked);

  const { formRef, formState, handleChange } = useForm();

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const sendData = {
      password: formState.password,
      token: formState.code,
    };
    dispatch(USER_RESET_CONFIRM(sendData));
  };

  return (
    <>
      {userIsAuthChecked && <Navigate to={"/forgot-password"} />}

      {userResetConfirmHasError && (
        <h3 className="text text_type_main-default text_color_inactive mb-4">
          Указан неверный код
        </h3>
      )}
      {!userIsAuthChecked && (
        <form className={styles.form} ref={formRef} onSubmit={handleSubmit}>
          <PasswordInput
            onChange={handleChange}
            value={formState.password}
            name={"password"}
            placeholder={"Введите новый пароль"}
            size={`${isMobile ? "small" : "default"}`}
            extraClass={`mb-6 ${isMobile ? "input__mobile" : ""}`}
          />
          <Input
            type={"text"}
            placeholder={"Введите код из письма"}
            onChange={handleChange}
            value={formState.code}
            name={"code"}
            error={false}
            errorText={"Ошибка"}
            size={`${isMobile ? "small" : "default"}`}
            extraClass={`mb-6 ${isMobile ? "input__mobile" : ""}`}
          />
          <Button
            htmlType="submit"
            type="primary"
            size={`${!isMobile ? "medium" : "small"}`}
            extraClass={`${!isMobile ? "mb-20" : "mb-10"} ${
              userResetConfirmIsLoading ? "button-locked" : ""
            } ${formState.password && formState.code ? "" : "button-locked"}`}
          >
            {userResetConfirmIsLoading ? "Загрузка" : "Сохранить"}
          </Button>
          <span className="align-center mb-4">
            <span
              className={`text text_type_main-default text_color_inactive ${
                !isMobile ? "mr-2" : "section-auth__span-mobile"
              }`}
            >
              Вспомнили пароль?
            </span>
            <Link to={"/login"} className="text_type_main-default ">
              Войти
            </Link>
          </span>
        </form>
      )}

      {userResetConfirmRequestSuccess && userIsAuthChecked && (
        <Navigate to={"/login"} replace={true} />
      )}
    </>
  );
}
