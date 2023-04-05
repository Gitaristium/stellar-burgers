import { Outlet } from "react-router-dom";
import ProfileNav from "../components/profile-nav/profile-nav";
import styles from "./profile-layout.module.css";
import { getIsMobile } from "../services/mobile/selectors";
import { useAppSelector } from "../services/store/hooks";

export default function ProfileLayoutPage() {
  const isMobile: boolean = useAppSelector(getIsMobile);
  return (
    <section
      className={`${styles.section} ${
        !isMobile ? "pt-20" : styles.section__mobile
      }`}
    >
      {!isMobile && <ProfileNav />}
      <Outlet />
    </section>
  );
}
