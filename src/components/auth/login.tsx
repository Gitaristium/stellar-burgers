import {
  Button,
  EmailInput,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { getIsMobile } from "../../services/mobile/selectors";
import { useAppSelector } from "../../services/store/hooks";
import { useForm } from "../../utils/hooks";
import { Link } from "react-router-dom";

export default function Login() {
  const isMobile: boolean = useAppSelector(getIsMobile);

  const { form, handleChange } = useForm();

  return (
    <>
      <EmailInput
        onChange={handleChange}
        value={form.email}
        name={"email"}
        isIcon={false}
        size={`${isMobile ? "small" : "default"}`}
        extraClass={`mb-6 ${isMobile ? "input__mobile" : ""}`}
        width="100%"
      />
      <PasswordInput
        onChange={handleChange}
        value={form.password}
        name={"password"}
        size={`${isMobile ? "small" : "default"}`}
        extraClass={`mb-6 ${isMobile ? "input__mobile" : ""}`}
      />
      <Button
        htmlType="button"
        type="primary"
        size={`${!isMobile ? "medium" : "small"}`}
        extraClass={`${!isMobile ? "mb-20" : "mb-10"}`}
      >
        Войти
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
    </>
  );
}
