import {
    Button,
    EmailInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { getIsMobile } from "../../services/mobile/selectors";
import { useAppDispatch, useAppSelector } from "../../services/store/hooks";
import { useForm } from "../../utils/hooks";
import { Link, Navigate } from "react-router-dom";
import styles from "./auth.module.scss";
import {
    getUserResetIsLoading,
    getUserResetHasError,
    getUserResetRequestSuccess,
} from "../../services/auth/selectors";
import { USER_RESET } from "../../services/auth/actions";
import Notice from "../modals/notice/notice";
import { LOGIN_PATH, RESET_PASS_PATH } from "../../utils/vars";

export default function ResetPass() {
    const isMobile: boolean = useAppSelector(getIsMobile);
    const dispatch = useAppDispatch();
    const isLoading = useAppSelector(getUserResetIsLoading);
    const hasError = useAppSelector(getUserResetHasError);
    const requestSuccess = useAppSelector(getUserResetRequestSuccess);

    // работаем с формой
    const { formRef, formState, handleChange } = useForm();
    const handleSubmit = (e: { preventDefault: () => void }) => {
        e.preventDefault();
        if (formState.email) {
            const sendData = {
                email: formState.email,
            };
            dispatch(USER_RESET(sendData));
        }
    };

    return (
        <>
            <form className={styles.form} ref={formRef} onSubmit={handleSubmit}>
                <EmailInput
                    onChange={handleChange}
                    value={formState.email}
                    name={"email"}
                    placeholder="Укажите e-mail"
                    isIcon={false}
                    size={`${isMobile ? "small" : "default"}`}
                    extraClass={`mb-6 ${isMobile ? "input__mobile" : ""}`}
                    autoComplete="on"
                />
                <Button
                    htmlType="submit"
                    type="primary"
                    size={`${!isMobile ? "medium" : "small"}`}
                    extraClass={`${!isMobile ? "mb-20" : "mb-10"} ${
                        isLoading ? "button-locked" : ""
                    } ${formState.email ? "" : "button-locked"}`}
                >
                    {isLoading ? "Загрузка" : "Восстановить"}
                </Button>
                <span className="align-center mb-4">
                    <span
                        className={`text text_type_main-default text_color_inactive ${
                            !isMobile ? "mr-2" : "section-auth__span-mobile"
                        }`}
                    >
                        Вспомнили пароль?
                    </span>
                    <Link to={LOGIN_PATH} className="text_type_main-default ">
                        Войти
                    </Link>
                </span>
            </form>

            {hasError && (
                <Notice
                    text="Email не найден в базе пользователей"
                    type="error"
                />
            )}

            {requestSuccess && <Navigate to={RESET_PASS_PATH} />}
        </>
    );
}
