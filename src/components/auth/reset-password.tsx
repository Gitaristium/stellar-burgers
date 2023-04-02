import {
  Button,
  Input,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { getIsMobile } from "../../services/mobile/selectors";
import { useAppSelector } from "../../services/store/hooks";
import { useForm } from "../../utils/hooks";
import { Link } from "react-router-dom";

export default function ResetPassword() {
  const isMobile: boolean = useAppSelector(getIsMobile);

  const { form, handleChange } = useForm();

  return (
    <>
      <PasswordInput
        onChange={handleChange}
        value={form.password}
        name={"password"}
        placeholder={"Введите новый пароль"}
        size={`${isMobile ? "small" : "default"}`}
        extraClass={`mb-6 ${isMobile ? "input__mobile" : ""}`}
      />
      <Input
        type={"text"}
        placeholder={"Введите код из письма"}
        onChange={handleChange}
        value={form.name}
        name={"code"}
        error={false}
        errorText={"Ошибка"}
        size={`${isMobile ? "small" : "default"}`}
        extraClass={`mb-6 ${isMobile ? "input__mobile" : ""}`}
      />
      <Button
        htmlType="button"
        type="primary"
        size={`${!isMobile ? "medium" : "small"}`}
        extraClass={`${!isMobile ? "mb-20" : "mb-10"}`}
      >
        Сохранить
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
    </>
  );
}
