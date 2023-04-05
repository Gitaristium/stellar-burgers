import {
  Button,
  EmailInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { getIsMobile } from "../../services/mobile/selectors";
import { useAppDispatch, useAppSelector } from "../../services/store/hooks";
import { useForm } from "../../utils/hooks";
import { Link, Navigate } from "react-router-dom";
import styles from "./auth.module.css";
import {
  getUserResetIsLoading,
  getUserResetHasError,
  getUserResetRequestSuccess,
  getIsAuthChecked,
} from "../../services/auth/selectors";
import { USER_RESET } from "../../services/auth/actions";

export default function ResetPass() {
  const isMobile: boolean = useAppSelector(getIsMobile);
  const dispatch = useAppDispatch();
  const userResetIsLoading = useAppSelector(getUserResetIsLoading);
  const userResetHasError = useAppSelector(getUserResetHasError);
  const userResetRequestSuccess = useAppSelector(getUserResetRequestSuccess);
  const userIsAuthChecked = useAppSelector(getIsAuthChecked);

  const { formRef, formState, handleChange } = useForm();

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const sendData = {
      email: formState.email,
    };
    dispatch(USER_RESET(sendData));
  };

  return (
    <>
      {userResetHasError && (
        <h3 className="text text_type_main-default text_color_inactive mb-4">
          Email не найден в базе пользователей
        </h3>
      )}
      <form className={styles.form} ref={formRef} onSubmit={handleSubmit}>
        <EmailInput
          onChange={handleChange}
          value={formState.email}
          name={"email"}
          placeholder="Укажите e-mail"
          isIcon={false}
          size={`${isMobile ? "small" : "default"}`}
          extraClass={`mb-6 ${isMobile ? "input__mobile" : ""}`}
        />
        <Button
          htmlType="submit"
          type="primary"
          size={`${!isMobile ? "medium" : "small"}`}
          extraClass={`${!isMobile ? "mb-20" : "mb-10"} ${
            userResetIsLoading ? "button-locked" : ""
          } ${formState.email ? "" : "button-locked"}`}
        >
          {userResetIsLoading ? "Загрузка" : "Восстановить"}
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

      {userResetRequestSuccess && !userIsAuthChecked && (
        <Navigate to={"/reset-password"} />
      )}
    </>
  );
}
