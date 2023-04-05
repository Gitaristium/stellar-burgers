import {
  Button,
  EmailInput,
  Input,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { getIsMobile } from "../../services/mobile/selectors";
import { useAppSelector } from "../../services/store/hooks";
import { useForm } from "../../utils/hooks";
import styles from "./profile-edit.module.css";

export default function ProfileEdit() {
  const isMobile: boolean = useAppSelector(getIsMobile);

  const {
    formRef,
    formState,
    handleChange,
    refNameInput,
    isDisabledNameInput,
    unlockNameInput,
    lockNameInput,
  } = useForm();

  return (
    <form className={isMobile ? styles.form__mobile : ""} ref={formRef}>
      <Input
        type={"text"}
        placeholder={"Имя"}
        onChange={handleChange}
        value={formState.name}
        name={"name"}
        error={false}
        errorText={"Ошибка"}
        size={`${isMobile ? "small" : "default"}`}
        icon={"EditIcon"}
        disabled={isDisabledNameInput}
        ref={refNameInput}
        onIconClick={unlockNameInput}
        onBlur={lockNameInput}
        extraClass={`mb-6 ${isMobile ? "input__mobile" : ""}`}
      />
      <EmailInput
        onChange={handleChange}
        value={formState.email}
        name={"email"}
        isIcon={true}
        size={`${isMobile ? "small" : "default"}`}
        extraClass={`mb-6 ${isMobile ? "input__mobile" : ""}`}
        width="100%"
      />
      <PasswordInput
        onChange={handleChange}
        value={formState.password}
        name={"password"}
        size={`${isMobile ? "small" : "default"}`}
        icon={"EditIcon"}
        extraClass={`mb-6 ${isMobile ? "input__mobile" : ""}`}
      />
      <span
        className={
          !isMobile ? styles.buttons__box : styles.buttons__box__mobile
        }
      >
        <Button
          htmlType="button"
          type="secondary"
          size={`${!isMobile ? "medium" : "small"}`}
          extraClass="mb-2"
        >
          Отмена
        </Button>
        <Button
          htmlType="submit"
          type="primary"
          size={`${!isMobile ? "medium" : "small"}`}
          extraClass="mb-2"
          // extraClass={`mb-2 ${userLoginIsLoading ? "button-locked" : ""} ${
          //   formState.email && formState.password ? "" : "button-locked"
          // }`}
        >
          {/* {userLoginIsLoading ? "Загрузка" : "Войти"} */}
          Сохранить
        </Button>
      </span>
    </form>
  );
}
