import {
  Button,
  EmailInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { getIsMobile } from "../../services/mobile/selectors";
import { useAppSelector } from "../../services/store/hooks";
import { useForm } from "../../utils/hooks";
import { Link } from "react-router-dom";

export default function ResetPass() {
  const isMobile: boolean = useAppSelector(getIsMobile);

  const { form, handleChange } = useForm();

  return (
    <>
      <EmailInput
        onChange={handleChange}
        value={form.email}
        name={"email"}
        placeholder="Укажите e-mail"
        isIcon={false}
        size={`${isMobile ? "small" : "default"}`}
        extraClass={`mb-6 ${isMobile ? "input__mobile" : ""}`}
        width="100%"
      />
      <Button
        htmlType="button"
        type="primary"
        size={`${!isMobile ? "medium" : "small"}`}
        extraClass={`${!isMobile ? "mb-20" : "mb-10"}`}
      >
        Восстановить
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
