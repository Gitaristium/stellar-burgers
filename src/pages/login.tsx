import { Login } from "../components/auth";
import { getIsMobile } from "../services/mobile/selectors";
import { useAppSelector } from "../services/store/hooks";

export default function LoginPage() {
  const isMobile: boolean = useAppSelector(getIsMobile);

  return (
    <section className={`section-auth ${!isMobile ? "mt-10" : ""}`}>
      <h3 className="text text_type_main-large mb-6 align-center">Вход</h3>
      <Login />
    </section>
  );
}
